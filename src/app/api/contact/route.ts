import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

interface Embed {
  color?: number;
  description?: string;
  fields?: {
    color?: number;
    inline?: boolean;
    name: string;
    value: string;
  }[];
  footer?: {
    icon_url?: string;
    text: string;
  };
  title: string;
}

const contactFormSchema = z.object({
  email: z
    .email({ message: 'Please provide a valid email address' })
    .max(254, { message: 'Email must be at most 254 characters long' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(2000, { message: 'Message must be at most 2000 characters long' }),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(100, { message: 'Name must be at most 100 characters long' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const getCurrentEasternTime = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    hour: '2-digit',
    hour12: true,
    minute: '2-digit',
    month: '2-digit',
    timeZone: 'America/New_York',
    year: '2-digit',
  };
  return new Intl.DateTimeFormat('en-US', options).format(now);
};

const sendDiscordNotification = async (embed: Embed): Promise<void> => {
  try {
    if (!process.env.DISCORD_WEBHOOK_URL) {
      console.warn('DISCORD_WEBHOOK_URL environment variable is not set');
      return;
    }

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      body: JSON.stringify({
        embeds: [embed],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed with status: ${response.status}`);
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error sending discord notification:', errorMessage);
    throw err; // Re-throw to handle in the main function
  }
};

const createContactFormEmbed = (data: ContactFormData): Embed => ({
  color: 0x003366,
  description: data.message,
  fields: [
    {
      inline: true,
      name: 'Name',
      value: data.name,
    },
    {
      inline: true,
      name: 'Email',
      value: data.email,
    },
  ],
  footer: {
    text: getCurrentEasternTime(),
  },
  title: 'Marketing Contact Form Message',
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      // Return all validation errors in a structured way
      return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });
    }

    const sanitizedData: ContactFormData = {
      email: parsed.data.email.trim().toLowerCase(),
      message: parsed.data.message.trim(),
      name: parsed.data.name.trim(),
    };

    const embed = createContactFormEmbed(sanitizedData);
    await sendDiscordNotification(embed);

    return NextResponse.json({ message: 'Contact form submitted successfully', success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);

    if (error instanceof Error && error.message.includes('Discord webhook')) {
      return NextResponse.json(
        {
          error: 'Message received but notification failed. We will still get back to you.',
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ error: 'Failed to process contact form submission' }, { status: 500 });
  }
}
