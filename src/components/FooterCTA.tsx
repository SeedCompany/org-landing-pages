import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { sanityClient as sanity } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';

interface Partner {
  logo?: any;
  name?: string;
}

interface Props {
  ctaLink: string;
  partners: Partner[];
}

const builder = imageUrlBuilder(sanity);

const FooterCTA: React.FC<Props> = ({ ctaLink, partners }) => {
  return (
    <section className="sus-accent-bg py-16 sus-primary-heading md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to make a lasting difference?
          </h2>
          <p className="mt-4 text-lg">
            Join our community of 1,000+ sustainers who are changing lives every day.
          </p>
          <a
            href={ctaLink}
            className="mt-8 px-6 py-2 flex justify-center items-center mx-auto w-[220px] bg-white sus-primary-heading hover:bg-gray-100"
          >
            Become a Sustainer
            <HeartIcon className="ml-2 h-4 w-4" />
          </a>
        </div>
        <div className="mt-16">
          <p className="mb-4 text-center font-medium">Trusted by:</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners && partners.length > 0 ? (
              partners.map((partner, index) => (
                <div key={index} className="flex flex-col items-center">
                  {partner.logo && (
                    <img
                      src={builder.image(partner.logo).url()}
                      alt={partner.name || 'Partner logo'}
                      className="h-16 w-auto rounded-lg shadow-md"
                    />
                  )}
                  <div className="rounded-lg bg-white/10 px-4 py-2 my-4">
                    {partner.name || 'Unknown Partner'}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No partners available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;