import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGallerySection } from './ImageGallery.styled';

const ImageGallery = ({ fotoArray, modalOpen }) => {
  return (
    <ImageGallerySection>
      {fotoArray.map(item => (
        <ImageGalleryItem
          key={item.id}
          id={item.id}
          fotoCard={item.webformatURL}
          modalOpen={modalOpen}
        ></ImageGalleryItem>
      ))}
    </ImageGallerySection>
  );
};
ImageGallery.propTypes = {
  fotoArray: PropTypes.array.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
export default ImageGallery;
