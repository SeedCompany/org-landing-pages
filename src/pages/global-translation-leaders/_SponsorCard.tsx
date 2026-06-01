import { ButtonLink } from '~/common/ui';
import { graphql } from '~/graphql';
import { calcGtlFunding } from './_funding';

export const SponsorCardFragment = graphql(`
  fragment sponsorCard on GlobalTranslationLeader {
    id
    shortCode
    name
    region
    gender
    focus
    biography
    image
    endDate
    funding {
      remaining(applyPledges: true)
    }
  }
`);

export interface SponsorCardData {
  id: string;
  shortCode: string;
  name: string;
  region: string;
  gender: string;
  focus: string;
  image: string;
  endDate: unknown;
  funding: { remaining: number };
  biographyHtml: string;
}

interface Props {
  sponsor: SponsorCardData;
  className?: string;
}

export function SponsorCard({ sponsor, className }: Props) {
  const {
    name,
    region,
    gender,
    shortCode: gtlId,
    focus,
    image: imageUrl,
    id: slug,
    biographyHtml,
  } = sponsor;
  const isSponsored = sponsor.funding.remaining === 0;
  const { monthlyNeed } = calcGtlFunding(sponsor.funding.remaining, sponsor.endDate as string);

  return (
    <article
      data-disabled={isSponsored || undefined}
      className={`group relative text-white flex flex-col${className ? ` ${className}` : ''}`}
    >
      <div
        className={`flex flex-col h-full border rounded-2xl p-4 gap-4${isSponsored ? ' grayscale opacity-40' : ''}`}
      >
        <div className="flex gap-4" id={slug}>
          <img src={imageUrl} alt="" className="rounded-xl w-1/3 object-cover" />
          <div className="flex-1 flex flex-col gap-4 gotham">
            <h3 className="text-2xl font-semibold">{name}</h3>
            <div className="text-sm flex flex-col gap-2">
              <p>
                <strong>Region:</strong> {region}
              </p>
              <hr className="opacity-50" />
              <div className="flex flex-col sm:flex-row gap-2">
                <p>
                  <strong>Gender:</strong> {gender}
                </p>
                <span className="hidden sm:block opacity-50">|</span>
                <p>{gtlId}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 gotham">
          <ButtonLink
            href={`/global-translation-leaders/${slug}`}
            variant={isSponsored ? 'outline' : 'solid'}
          >
            View Details
          </ButtonLink>
          {!isSponsored && <p className="gotham">${monthlyNeed.toLocaleString()} / mo remaining</p>}
        </div>
        <p className="text-lg font-bold gotham">Focus: {focus}</p>
        <div className="line-clamp-4 gotham">
          <p dangerouslySetInnerHTML={{ __html: biographyHtml }} />
        </div>
      </div>
      {isSponsored && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold bg-white/10 rounded-2xl px-8 py-4 leading-none">
            Sponsored
          </span>
        </div>
      )}
    </article>
  );
}
