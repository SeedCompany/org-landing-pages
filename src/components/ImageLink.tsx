export const ImageLink = ({
  linkUrl,
  imageUrl,
  altText,
}: {
  linkUrl: string;
  imageUrl: string;
  altText: string;
}) => (
  <div className="flex lg:flex-1">
    <a href={linkUrl} className="-m-1.5 md:p-1.5 p-0">
      <span className="sr-only">{altText}</span>
      <img className="md:h-12 h-10 w-auto" src={imageUrl} alt={altText} />
    </a>
  </div>
);
