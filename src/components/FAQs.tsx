import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

enum FaqSection {
  GeneralQuestions = 'General Questions',
  GettingStarted = 'Getting Started',
  SecurityAndPrivacy = 'Security and Privacy',
  TroubleshootingAndSupport = 'Troubleshooting and Support',
}

interface FaqItem {
  answer: string;
  question: string;
  value: string;
}

type FaqContent = Record<FaqSection, FaqItem[]>;

const getFaqs = async (): Promise<FaqContent> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public/faqs`, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error('Failed to fetch FAQs');
  }
  return res.json();
};

const MarkdownAnswer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children, ...props }) => {
          // Use Next.js Link for internal links, <a> for external
          const isExternal = href && /^https?:\/\//i.test(href);
          return isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-link
                hover:text-primary hover:underline
              `}
              {...props}
            >
              {children}
            </a>
          ) : (
            <Link
              href={href ?? '#'}
              className={`
                text-link
                hover:text-primary hover:underline
              `}
              {...props}
            >
              {children}
            </Link>
          );
        },
        ol: ({ children }) => <ol className="mb-3 list-decimal pl-6">{children}</ol>,
        p: ({ children }) => <p className="mb-3">{children}</p>,
        ul: ({ children }) => <ul className="mb-3 list-disc pl-6">{children}</ul>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export const FAQs = async ({
  defaultHeadersOpen = [FaqSection.GeneralQuestions],
  defaultOpenQuestion,
}: {
  defaultHeadersOpen?: FaqSection[];
  defaultOpenQuestion?: string;
}) => {
  const faqs: FaqContent = await getFaqs();

  const sectionKeys = Object.keys(faqs).filter((key): key is FaqSection =>
    Object.values(FaqSection).includes(key as FaqSection),
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-2">
      <Accordion type="multiple" defaultValue={defaultHeadersOpen ?? sectionKeys} className="w-full">
        {sectionKeys.map((section) => (
          <AccordionItem key={section} value={section}>
            <AccordionTrigger className="text-3xl font-bold text-secondary">{section}</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" className="w-full" defaultValue={defaultOpenQuestion} collapsible>
                {faqs[section].map((q) => (
                  <AccordionItem key={q.value} id={q.value} value={q.value} className="border-b">
                    <AccordionTrigger className="text-xl font-semibold">{q.question}</AccordionTrigger>
                    <AccordionContent className="pb-4 pl-6 text-lg">
                      <MarkdownAnswer content={q.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
