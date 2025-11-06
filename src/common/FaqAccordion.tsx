import type { JsxStyleProps } from 'styled-system/types';
import { portableText } from '~/sanity';
import { Accordion } from './ui';

// not importing directly because I think we will do something different with that type soon.
type PortableText = Parameters<typeof portableText.toHTML>[0];

interface FaqItem {
  question: string | null;
  answer: PortableText;
}

interface FaqAccordionProps extends JsxStyleProps {
  faqs: FaqItem[];
}

export const FaqAccordion = ({ faqs, css }: FaqAccordionProps) => (
  <Accordion.Root collapsible size="lg" indicator="plus" css={css}>
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
