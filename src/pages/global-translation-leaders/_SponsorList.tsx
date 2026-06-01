import { useEffect, useState } from 'react';
import { SponsorCard, type SponsorCardData } from './_SponsorCard';

interface LoadMoreResponse {
  items: SponsorCardData[];
  cursor: unknown;
  hasNextPage: boolean;
}

interface Props {
  initialItems: SponsorCardData[];
  initialCursor: unknown;
  initialHasNextPage: boolean;
}

export function SponsorList({ initialItems, initialCursor, initialHasNextPage }: Props) {
  const [items, setItems] = useState<SponsorCardData[]>(initialItems);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ block: 'center' });
    }
  }, []);

  async function loadMore() {
    if (!cursor) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ after: cursor as string });
      const res = await fetch(`/global-translation-leaders/more?${params}`);
      if (res.ok) {
        const {
          items: newItems,
          cursor: newCursor,
          hasNextPage: newHasNextPage,
        } = (await res.json()) as unknown as LoadMoreResponse;
        setItems((prev) => {
          const existingIds = new Set(prev.map((i) => i.id));
          const deduped = newItems.filter((i) => !existingIds.has(i.id));
          return [...prev, ...deduped];
        });
        setCursor(newCursor);
        setHasNextPage(newHasNextPage);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {items.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              void loadMore();
            }}
            disabled={loading}
            className="px-8 py-3 rounded-xl border border-white text-white font-semibold gotham hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
