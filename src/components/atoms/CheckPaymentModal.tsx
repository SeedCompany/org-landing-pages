import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export const CheckPaymentModal = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <Dialog open={true} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                  <EnvelopeIcon aria-hidden="true" className="size-6 text-watermarkGreen" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900 gotham uppercase"
                  >
                    Give by check
                  </DialogTitle>
                  <div className="mt-2 gotham">
                    <p className="text-left text-gray-900">
                      Kindly make your check out to Seed Company and send to the following address:
                    </p>
                    <p className="text-sm text-left mt-2 mb-3 text-gray-900 ml-2">
                      Seed Company
                      <br />
                      ATTN: Finance
                      <br />
                      220 Westway Place
                      <br />
                      Suite 100
                      <br />
                      Arlington, TX 76018
                      <br />
                      <br />
                      Memo: Watermark - YOTW
                    </p>
                    <p className="text-left text-gray-900">
                      You may contact us at{' '}
                      <a
                        className="text-blue-600 hover:text-blue-400 visited:text-purple-600"
                        href="tel:+1(817)557-2121"
                      >
                        (817) 557-2121
                      </a>{' '}
                      for further information. Email:{' '}
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
