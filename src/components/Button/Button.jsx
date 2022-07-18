import React from 'react';
import { ButtonLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClickLoadMore }) => (
  <ButtonLoadMore type="button " onClick={onClickLoadMore}>
    Load more
  </ButtonLoadMore>
);
Button.propTypes = {
  onClickLoadMore: PropTypes.func.isRequired,
};
export default Button;
