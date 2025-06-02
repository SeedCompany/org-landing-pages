interface LinkItem {
  title: string;
  href: string;
}
export const NavLinkList = ({ ItemList, mobile }: { ItemList: LinkItem[]; mobile?: boolean }) => (
  <>
    {mobile ? (
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {ItemList.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="py-6">
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            >
              Give
            </a>
          </div>
        </div>
      </div>
    ) : (
      <div className="hidden lg:flex lg:gap-x-12">
        {ItemList.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="text-md font-semibold text-white hover:text-gray-300 transition duration-300"
          >
            {item.title}
          </a>
        ))}
      </div>
    )}
  </>
);
