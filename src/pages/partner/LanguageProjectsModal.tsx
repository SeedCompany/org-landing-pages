import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

export type Sensitivity = 'low' | 'medium' | 'high';

export interface LanguageProject {
  languageName: string;
  /** Omitted (null/undefined) for high-sensitivity projects. */
  country?: string | null;
  region: string;
  milestone: string;
  sensitivity: Sensitivity;
  amount: number;
}

export interface LanguageProjectsProps {
  heading?: string | null;
  linkText?: string | null;
  projects: LanguageProject[];
}

const DEFAULT_LINK_TEXT = 'Learn more about these specific projects';

export const LanguageProjectsModal = ({ heading, linkText, projects }: LanguageProjectsProps) => {
  const [open, setOpen] = useState(false);

  // No projects → no link at all.
  if (!projects?.length) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 inline-block pl-6 font-medium text-scTerracotta underline underline-offset-2 hover:text-scTerracottaHover"
      >
        {linkText || DEFAULT_LINK_TEXT}
      </button>

      {/* z-index must clear the mobile give CTA (z-100) so the modal sits above it */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-[110]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200"
        />
        <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200"
            >
              <DialogTitle className="gotham-bold mb-4 text-2xl text-scBlack">
                {heading || 'Language Projects'}
              </DialogTitle>

              <ul className="flex flex-col divide-y divide-gray-200">
                {projects.map((project, index) => (
                  <li key={index} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-lg font-semibold text-scBlack">{project.languageName}</h3>
                      <span className="whitespace-nowrap font-medium text-scTerracotta">
                        ${project.amount.toLocaleString('en-US')}
                      </span>
                    </div>
                    <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-sm text-gray-700">
                      {project.sensitivity === 'high' ? (
                        <>
                          <dt className="font-medium">Country / Region</dt>
                          <dd className="italic text-gray-500">Sensitive</dd>
                        </>
                      ) : (
                        project.country && (
                          <>
                            <dt className="font-medium">Country / Region</dt>
                            <dd>{project.country}</dd>
                          </>
                        )
                      )}
                      <dt className="font-medium">Region</dt>
                      <dd>{project.region}</dd>
                      <dt className="font-medium">Milestone</dt>
                      <dd>{project.milestone}</dd>
                    </dl>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 w-full rounded-md bg-scBlack px-3 py-2 text-sm font-semibold text-scNatural hover:bg-black"
              >
                Close
              </button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
