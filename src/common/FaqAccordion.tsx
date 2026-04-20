import { portableText } from '~/sanity';
import { Accordion } from './ui';

type PortableText = Parameters<typeof portableText.toHTML>[0];

interface FaqItem {
  question: string | null;
  answer: PortableText;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  className?: string;
}

export const FaqAccordion = ({ faqs, className }: FaqAccordionProps) => (
  <Accordion.Root className={className}>
    {faqs.map((faq) => {
      if (!faq.question) {
        return null;
      }
      return (
        <Accordion.Item value={faq.question} key={faq.question}>
          <Accordion.ItemTrigger>
            {faq.question}
            <Accordion.ItemIndicator>
              <PlusMinusIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <div dangerouslySetInnerHTML={{ __html: portableText.toHTML(faq.answer) }} />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      );
    })}
  </Accordion.Root>
);

const PlusMinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" data-only-if-open />
  </svg>
);
