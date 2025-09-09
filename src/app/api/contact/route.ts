import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  email: string;
  message: string;
  name: string;
}

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
      return;
    }
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      body: JSON.stringify({
        embeds: [embed],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  } catch (err: unknown) {
    const errorMessage = err as Error;
    console.log('Error sending discord notification');
    console.log(errorMessage.message);
  }
};

const createContactFormEmbed = (data: ContactFormData): Embed => ({
  color: 0xff9933,
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
    const data = (await request.json()) as ContactFormData;

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const embed = createContactFormEmbed(data);
    await sendDiscordNotification(embed);

    return NextResponse.json({ message: 'Contact form submitted successfully', success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Failed to process contact form submission' }, { status: 500 });
  }
}
