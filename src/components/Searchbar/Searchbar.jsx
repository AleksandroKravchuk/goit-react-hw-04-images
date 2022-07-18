import React from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import { BiSearch } from 'react-icons/bi';
import {
  SearchbarSection,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends React.Component {
  state = {
    search: '',
  };

  onAddInfo = evt => {
    const { value } = evt.target;
    this.setState({ search: value });
  };
  hendelSubmit = evt => {
    evt.preventDefault();
    const { search } = this.state;
    if (search.trim() === '') {
      return Notify.warning('Please enter name foto');
    }
    this.props.onSubmit(search);
    this.setState({ search: '' });
  };
  render() {
    const { search } = this.state;
    return (
      <SearchbarSection>
        <SearchForm onSubmit={this.hendelSubmit}>
          <SearchFormButton type="submit">
            <BiSearch />
          </SearchFormButton>
          <SearchFormInput
            value={search}
            onChange={this.onAddInfo}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></SearchFormInput>
        </SearchForm>
      </SearchbarSection>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
