'use client';

import { useMemo, useState } from 'react';
import { APP_NAME, RESPONSIBLE_USE_URL, SUPPORT_EMAIL } from '../utils/constants';
import { CostExplanation } from './CostExplanation';
import { SearchInput } from './SearchInput';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordion';
import { A } from './ui/Typography';

/* eslint-disable sort/object-properties */
const faqContent: Record<string, { answer: React.ReactNode; question: string; value: string }[]> = {
  'General Questions': [
    {
      answer: (
        <>
          PCIT stands for parent-child interaction therapy. PCIT is an evidence-based gold standard treatment for
          children between the ages of 2 and 7 who experience significant behavioral problems. <br />
          <br /> PCIT works by using a coaching model to help caregivers improve their use of positive parenting
          strategies to build their relationships with their child as well as utilize effective discipline strategies.{' '}
          <br />
          <br /> For more information on PCIT, visit{' '}
          <A href="https://www.pcit.org" target="_blank" rel="noopener noreferrer">
            PCIT.org
          </A>
          .
        </>
      ),
      question: 'What is PCIT?',
      value: 'what-is-pcit',
    },
    {
      answer: (
        <>
          PCIT Tracker is a web-based tool designed to help PCIT therapists easily track and analyze session data
          throughout the intervention. <br />
          <br /> Our goal is to simplify administrative tasks, reduce prep time, and make data-driven decisions more
          accessible to support families effectively.
        </>
      ),
      question: 'What is PCIT Tracker? What is it used for?',
      value: 'what-is-pcit-tracker',
    },
    {
      answer: (
        <>
          PCIT Tracker is designed for all therapists implementing PCIT, whether you&apos;re just learning and using the
          manual, currently in training, or fully certified.
        </>
      ),
      question: 'Is PCIT Tracker only for certified PCIT therapists?',
      value: 'who-can-use',
    },
    {
      answer: (
        <>
          PCIT Tracker automates the tracking process, reducing the need for paperwork and manual calculations. It
          provides visual graphs, real-time session data summaries, and progress tracking tools to help therapists
          quickly assess child and caregiver improvement and adjust treatment accordingly.
        </>
      ),
      question: 'How can PCIT Tracker help me as a PCIT therapist?',
      value: 'how-it-helps',
    },
    {
      answer: (
        <>
          Unlike spreadsheets or paper-based tracking, PCIT Tracker streamlines data entry, visualization, and analysis
          into an easy-to-use, secure online platform. <br />
          <br /> It&apos;s built specifically with PCIT in mind, making it more tailored than generic data-tracking
          tools. It also allows you to enter data right into the tool, eliminating the need for transfer of values into
          a separate spreadsheet.
        </>
      ),
      question: 'How is PCIT Tracker different from other tracking tools or methods?',
      value: 'how-different',
    },
    {
      question: 'Does PCIT Tracker support PCIT-OC?',
      answer: (
        <>
          Yes! PCIT Tracker supports PCIT-OC, which is a version of PCIT that is tailored for older children.
          <br />
          <br />
          The toggle for PCIT-OC can be enabled per family. When enabled, the forms for this family will support
          PCIT-OC, which includes the ability to track frequencies of self-descriptions, rate non-verbal praise on DPICS
          and CDI forms, and use adjusted CDI goal criteria.
          <br />
          <br />
          For more information on PCIT-OC, visit{' '}
          <A href="https://pcitforolderchildren.com/" target="_blank" rel="noopener noreferrer">
            [website]
          </A>
        </>
      ),
      value: 'pcit-oc',
    },
    {
      question: "Why can't I fully access PCIT Tracker for free?",
      answer: <CostExplanation />,
      value: 'free-tier-limit',
    },
  ],
  'Getting Started': [
    {
      answer: (
        <>
          You can create an account by visiting{' '}
          <A href={`${process.env.NEXT_PUBLIC_APP_URL}/signup`} target="_blank" rel="noopener noreferrer">
            {process.env.NEXT_PUBLIC_APP_URL}/signup
          </A>
          .
        </>
      ),
      question: 'How do I create an account?',
      value: 'create-account',
    },
    {
      answer: (
        <>
          Go to{' '}
          <A href={`${process.env.NEXT_PUBLIC_APP_URL}/signin`} target="_blank" rel="noopener noreferrer">
            {process.env.NEXT_PUBLIC_APP_URL}/signin
          </A>{' '}
          and enter your credentials. <br />
          <br /> If you have trouble logging in, try resetting your password or reaching out for support.
        </>
      ),
      question: 'How do I log in to PCIT Tracker?',
      value: 'how-to-login',
    },
    {
      answer: (
        <>
          Click the{' '}
          <A href={`${process.env.NEXT_PUBLIC_APP_URL}/password-reset`} target="_blank" rel="noopener noreferrer">
            Forgot Password
          </A>{' '}
          link on the login page and enter your email. If you&apos;re still having trouble, contact our support team.
        </>
      ),
      question: 'What should I do if I forget my password?',
      value: 'forgot-password',
    },
    {
      answer: (
        <>
          Yes! <br />
          <br />
          PCIT Tracker is mobile-friendly, so you can access it from any device with an internet connection.
        </>
      ),
      question: 'Can I use PCIT Tracker on my phone or tablet?',
      value: 'mobile-friendly',
    },
  ],
  'Security and Privacy': [
    {
      answer: (
        <>
          While PCIT Tracker is designed with security and compliance in mind, we are still in the testing phase and ask
          that you only enter de-identified client information. Full HIPAA, SOC 2 and other compliance certifications
          are part of our long-term goals.
        </>
      ),
      question: 'Is PCIT Tracker HIPAA-compliant?',
      value: 'hipaa',
    },
    {
      answer: (
        <>
          We use encrypted storage and secure API protocols to ensure that your data remains private. We do not access
          your data or re-distribute your data to any third parties. However, in accordance with our{' '}
          <A href={RESPONSIBLE_USE_URL} target="_blank" rel="noopener noreferrer">
            Responsible Use Policy
          </A>
          , please do not enter any personally identifiable client information.
        </>
      ),
      question: 'How is client data protected?',
      value: 'data-protection',
    },
    {
      answer: (
        <>
          Yes! Please only enter de-identified information, such as using an ID number (Client 1) instead of any names.
          Also, please refer to caregivers as &quot;Mom&quot; or &quot;Dad&quot; instead of their using names. Careful
          consideration should be made when adding notes to the comment boxes for sessions.
        </>
      ),
      question: 'Do I need to use only de-identified client information?',
      value: 'de-identified-info',
    },
    {
      answer: (
        <>
          Only <b>you</b> have access to the data you enter, unless you choose to share it with a colleague for
          supervision purposes. <br />
          <br />
          In the future, we may develop enterprise accounts where supervisors within agencies can see data summaries.
          For now, though, you are the only one who has access to the data you enter.
        </>
      ),
      question: 'Who has access to the data I enter?',
      value: 'data-access',
    },
    {
      answer: (
        <>
          You can delete your account by going to the{' '}
          <A href={`${process.env.NEXT_PUBLIC_APP_URL}/settings/account`} target="_blank" rel="noopener noreferrer">
            Account Settings
          </A>{' '}
          page and clicking the &quot;Delete Account&quot; button. <br />
          All of your data will be removed immediately.
        </>
      ),
      question: 'How do I delete my account?',
      value: 'delete-account',
    },
  ],
  'Data Export': [
    {
      answer: (
        <>
          To export your data, click the export button in the top right of the page for a session or family. <br />
          <br />
          Your data will be downloaded as a CSV file containing all information for the selected session or family.
        </>
      ),
      question: 'How do I export my data?',
      value: 'export-data',
    },
    {
      answer: (
        <>
          {APP_NAME} has a built-in export/import feature for families.
          <br />
          <br />
          To export a family, click the &quot;Export family&quot; button on the family details page and select the
          &quot;Export as JSON&quot; option.
          <br />
          This will download a JSON file containing all information for the selected family.
          <br />
          <br />
          To import a family, click the &quot;Import family&quot; button in the &quot;Add Family&quot; dialog and then
          upload the JSON file.
        </>
      ),
      question: 'How to hand off a family to a new therapist?',
      value: 'hand-off-family',
    },
  ],
  'Troubleshooting and Support': [
    {
      answer: (
        <>
          First, check that you&apos;re using the correct email. If you still can&apos;t log in, try resetting your
          password. If you continue to experience issues, contact our support team. <br />
          <br />
          <A href={`mailto:${SUPPORT_EMAIL}`} target="_blank" rel="noopener noreferrer">
            {SUPPORT_EMAIL}
          </A>
        </>
      ),
      question: "I'm having trouble logging in - what should I do?",
      value: 'login-trouble',
    },
    {
      answer: (
        <>
          You can reach out to{' '}
          <A href={`mailto:${SUPPORT_EMAIL}`} target="_blank" rel="noopener noreferrer">
            {SUPPORT_EMAIL}
          </A>{' '}
          for any issues or questions or submit a contact form through our website at{' '}
          <A href={`${process.env.NEXT_PUBLIC_APP_URL}/help/contact`} target="_blank" rel="noopener noreferrer">
            {process.env.NEXT_PUBLIC_APP_URL}/help/contact
          </A>
          .
        </>
      ),
      question: 'Who do I contact for technical support?',
      value: 'tech-support',
    },
    {
      answer: (
        <>
          Absolutely! <br />
          <br />
          We welcome and would love to hear your feedback. Submit feature requests, report bugs, or share any other
          suggestions or concerns by emailing us at{' '}
          <A href={`mailto:${SUPPORT_EMAIL}`} target="_blank" rel="noopener noreferrer">
            {SUPPORT_EMAIL}
          </A>{' '}
          or by completing a contact form at{' '}
          <A href={`${process.env.NEXT_PUBLIC_APP_URL}/help/contact`} target="_blank" rel="noopener noreferrer">
            {process.env.NEXT_PUBLIC_APP_URL}/help/contact
          </A>
          .
        </>
      ),
      question: 'Can I request a new feature or report a bug?',
      value: 'feature-request',
    },
  ],
};
/* eslint-enable sort/object-properties */

export const FAQs = ({
  defaultHeadersOpen,
  defaultOpenQuestion,
}: {
  defaultHeadersOpen?: string[];
  defaultOpenQuestion?: string;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqContent = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqContent;
    }

    const query = searchQuery.toLowerCase();
    const filtered: typeof faqContent = {};

    Object.entries(faqContent).forEach(([section, questions]) => {
      const filteredQuestions = questions.filter(({ question, answer }) => {
        const questionString = question.toLowerCase();
        const answerString = answer?.toString().toLowerCase();
        return questionString.includes(query) || answerString?.includes(query);
      });

      if (filteredQuestions.length > 0) {
        filtered[section] = filteredQuestions;
      }
    });

    return filtered;
  }, [searchQuery]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-2">
      <div>
        <SearchInput
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {Object.keys(filteredFaqContent).length > 0 ? (
        <Accordion
          type="multiple"
          defaultValue={defaultHeadersOpen || Object.keys(filteredFaqContent)}
          className="w-full"
        >
          {Object.entries(filteredFaqContent).map(([section, questions]) => (
            <AccordionItem key={section} value={section}>
              <AccordionTrigger className="text-3xl font-bold text-secondary">{section}</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" className="w-full" defaultValue={defaultOpenQuestion} collapsible>
                  {questions.map(({ question, answer, value }) => (
                    <AccordionItem key={value} id={value} value={value} className="border-b">
                      <AccordionTrigger className="text-xl font-semibold">{question}</AccordionTrigger>
                      <AccordionContent className="pb-4 pl-6 text-lg">{answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="py-8 text-center">
          <p className="text-lg text-muted-foreground">No FAQs found matching your search.</p>
        </div>
      )}
    </div>
  );
};
