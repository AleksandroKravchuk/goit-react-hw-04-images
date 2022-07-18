import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryIt, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ modalOpen, fotoCard, id }) => (
  <ImageGalleryIt>
    <Image id={id} src={fotoCard} alt="foto" onClick={modalOpen} />
  </ImageGalleryIt>
);
ImageGalleryItem.propTypes = {
  modalOpen: PropTypes.func.isRequired,
  fotoCard: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
export default ImageGalleryItem;
