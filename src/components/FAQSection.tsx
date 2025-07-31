import React from 'react';
import { PortableText, type PortableTextBlock } from '@portabletext/react';

interface FAQ {
  question?: string;
  answer?: PortableTextBlock[];
}

interface Props {
  faqs: FAQ[];
}

const FAQSection: React.FC<Props> = ({ faqs }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl sus-primary-heading">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have questions about becoming a sustainer? Find answers below.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          {faqs && faqs.length > 0 ? (
            faqs.map((item, index) => (
              <details
                className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                key={index}
              >
                <summary className="cursor-pointer text-lg font-medium sus-primary-text">
                  {item.question || 'Question missing'}
                </summary>
                <div className="mt-2 sus-primary-text">
                  {item.answer ? (
                    <PortableText
                      value={item.answer}
                      // you can optionally add elements to render here
                      // components={{
                      //   types: {
                      //     block: ({ children }) => (
                      //       <p className="mb-2">{children}</p>
                      //     ),
                      //   },
                      // }}
                    />
                  ) : (
                    <p>No answer provided.</p>
                  )}
                </div>
              </details>
            ))
          ) : (
            <p className="text-center sus-primary-text">No FAQs available. Please check Sanity data.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
