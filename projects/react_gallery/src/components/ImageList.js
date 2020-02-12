import React from 'react';
import Image from './Image';
import NoResults from './NoResults';

const ImageList = (props) => {
  const results = props.images;
  let images;
  if (results.length > 0) {
      images = results.map(image =>
         <Image
            url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
            key={image.id} />
        );
  } else {
      images = <NoResults />;
  }

  return(
    <ul>
      {images}
    </ul>
  )
}

export default ImageList;
