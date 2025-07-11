import React from 'react';
import {sanityClient as sanity} from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanity);

interface ImageItem {
  image?: string;
  altText?: string;
}
interface Props {
  images?: ImageItem[];
}

const DEFAULT_FOOTER_IMAGES = [
    {image: 'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/ba39018fed274bf6dd7d60dc544efb2835b32eb8-150x150.png', altText: 'EIG-Certified'},
    {image: 'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/2ce55eebe9c33530fcccc4c0312084dea94c9c26-150x150.png', altText: 'Candid Gold Transparency 2024'},
    {image: 'https://cdn.sanity.io/media-libraries/ml0ZDygBMJD9/images/26db7532e2720e74d581f3158025aa6ec8abd3f7-150x150.png', altText: 'ECFA Accredited'},
]

const FooterImageList: React.FC<Props> = ({ images = DEFAULT_FOOTER_IMAGES }) => {
  return (
    <div className="flex flex-row gap-x-8 w-full items-center min-h-[150px] justify-center">
      {images.map((imageItem, index) => (
        <div key={index}>
          {imageItem.image && (
            <img src={imageItem.image} alt={imageItem.altText} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FooterImageList;
