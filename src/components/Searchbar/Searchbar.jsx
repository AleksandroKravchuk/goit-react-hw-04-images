import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import { BiSearch } from 'react-icons/bi';
import {
  SearchbarSection,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const onAddInfo = evt => {
    const { value } = evt.target;
    setSearch(value);
  };
  const hendelSubmit = evt => {
    evt.preventDefault();

    if (search.trim() === '') {
      return Notify.warning('Please enter name foto');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <SearchbarSection>
      <SearchForm onSubmit={hendelSubmit}>
        <SearchFormButton type="submit">
          <BiSearch />
        </SearchFormButton>
        <SearchFormInput
          value={search}
          onChange={onAddInfo}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        ></SearchFormInput>
      </SearchForm>
    </SearchbarSection>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
