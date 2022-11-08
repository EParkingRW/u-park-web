import Image, { ImageProps } from 'next/image';
import React from 'react';

const CustomImage = (props: ImageProps) => {
  const { alt } = props;
  const errorImage = '/asserts/images/placeholder.png';
  const [src, setSrc] = React.useState<string>(props.src as string);

  React.useEffect(() => {
    setSrc(props.src as string);
  }, [props.src]);

  if (!src) {
    return null;
  }

  let image: string = src || '';
  image = image.startsWith('/uploads') ? image : `/uploads/${image}`;

  let imageUrl = image;

  if (
    imageUrl.slice(0, 1) !== '/' &&
    imageUrl.slice(0, 3) !== 'http'
  ) {
    imageUrl = `/${src}`;
  }

  return (
    <Image
      {...props}
      alt={alt}
      src={imageUrl}
      onError={() => {
        setSrc(errorImage);
      }}
      onLoadingComplete={result => {
        if (result.naturalWidth === 0) {
          setSrc(errorImage);
        }
      }}
    />
  );
};

export default CustomImage;
