import React from 'react';

interface ImageItem {
  image?: string;
  altText?: string;
}
interface Props {
  images?: ImageItem[];
}

const DEFAULT_FOOTER_IMAGES = [
  // {image: 'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/ba39018fed274bf6dd7d60dc544efb2835b32eb8-150x150.png', altText: 'EIG-Certified'},
  // {image: 'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/2ce55eebe9c33530fcccc4c0312084dea94c9c26-150x150.png', altText: 'Candid Gold Transparency 2024'},
  {
    image:
      'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/f77c1d6a02d8a7fdc8066a3e8bf5b73da6e15df9-450x375.png',
    altText: 'ECFA Accredited',
  },
];

const FooterImageList: React.FC<Props> = ({ images = DEFAULT_FOOTER_IMAGES }) => {
  return (
    <div className="flex flex-row gap-x-8 w-full items-center min-h-[150px] justify-end">
      {images.map((imageItem, index) => (
        <div className="flex md:justify-end" key={index}>
          {imageItem.image && (
            <img className="w-1/3" src={imageItem.image} alt={imageItem.altText} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FooterImageList;
