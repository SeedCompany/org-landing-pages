import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import type { ReactNode } from 'react';

export const CampaignEndedModal = ({
  setOpen,
  campaignProgress,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  campaignProgress?: ReactNode;
}) => {
  return (
    <div>
      <Dialog open={true} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <div className="mx-auto flex items-center justify-center">
                  <img
                    src="https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/3c79f83596cb48bc6ded50d6b2ac7917f113b1e9-265x110.svg"
                    alt="Company Logo"
                    width="100"
                    height="100"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  {/*<DialogTitle*/}
                  {/*  as="h3"*/}
                  {/*  className="text-base font-semibold text-gray-900 gotham uppercase"*/}
                  {/*>*/}
                  {/*  Campaign has ended*/}
                  {/*</DialogTitle>*/}
                  <div className="mt-2 gotham">
                    <p className="text-left text-gray-900">
                      Thank you for investing in the men, women, and children who don’t yet have
                      Scripture in their heart language!
                    </p>
                    {campaignProgress ? (
                      <div className="my-6 text-left">{campaignProgress}</div>
                    ) : null}
                    <p className="text-left text-gray-900">
                      If you have questions, please contact the Seed Company team at{' '}
                      <a
                        className="text-blue-600 hover:text-blue-400 visited:text-purple-600"
                        href="tel:+1(817)557-2121"
                      >
                        (817) 557-2121
                      </a>{' '}
                      or{' '}
                      <a
                        className="text-blue-600 hover:text-blue-400 visited:text-purple-600"
                        href="mailto:info@tsco.org"
                      >
                        info@tsco.org
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="font-lato uppercase inline-flex w-full justify-center rounded-md bg-watermarkGreen px-3 py-2 text-sm font-semibold text-watermarkDarkBlue shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Back to site
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
