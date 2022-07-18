import { AppStyle } from './App.styled';
import React from 'react';
import { Component } from 'react';
import { Notify } from 'notiflix';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Oval } from 'react-loader-spinner';
import ApiService from 'API/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const apiData = new ApiService();
class App extends Component {
  state = {
    searchName: '',
    totalHits: null,
    fotoModal: null,
    loading: false,
    showModal: false,
    page: 1,
    foto: [],
    perPages: true,
  };

  componentDidUpdate(prevProps, prevState) {
    // const { totalHits, foto } = this.state;
    const prevPage = prevState.page;
    const prevFoto = prevState.searchName;
    const currentPage = this.state.page;
    const currentFoto = this.state.searchName;
    if (prevFoto !== currentFoto || prevPage !== currentPage) {
      apiData.query = currentFoto.trim();
      apiData.setAddNewPage(currentPage);

      this.setState({ loading: true });
      apiData
        .fetchImages()
        .then(({ hits, totalHits }) => {
          this.setState(prevState => ({
            foto: [...prevState.foto, ...hits],
            totalHits: totalHits,
          }));
          if (totalHits === 0) {
            Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
        })
        .catch(error => Notify.failure('Ooooops somthing went wrong'))
        .finally(() => this.setState({ loading: false }));
    }
    // if (foto.length >= totalHits && foto.length !== 0) {
    //   Notify.warning(
    //     "We're sorry, but you've reached the end of search results."
    //   );
    // }
  }

  onSubmitName = searchName => {
    this.setState({ searchName, page: 1, foto: [], perPages: true });
  };
  onClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    const allPages = Math.ceil(this.state.totalHits / apiData.getPer_page());
    if (this.state.page + 1 >= allPages) {
      this.setState({ perPages: false });
    }
  };
  toggleModal = evt => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (!this.state.showModal) {
      const itemId = evt.currentTarget.id;
      // eslint-disable-next-line array-callback-return
      this.state.foto.map(item => {
        if (item.id === Number(itemId)) {
          this.setState({ fotoModal: item.largeImageURL });
        }
      });
    }
  };
  render() {
    const { showModal, searchName, foto, loading, perPages, fotoModal } =
      this.state;
    const perPage = apiData.getPer_page();
    return (
      <AppStyle>
        <Searchbar onSubmit={this.onSubmitName}></Searchbar>

        {foto !== [] && (
          <ImageGallery
            fotoArray={foto}
            searchName={searchName}
            modalOpen={this.toggleModal}
          >
            {' '}
          </ImageGallery>
        )}
        {loading && (
          <Oval color="#00BFFF" height={80} width={80} margin-left="auto" />
        )}
        {foto.length >= perPage && perPages && (
          <Button onClickLoadMore={this.onClickLoadMore}></Button>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={fotoModal} alt="foto" />
          </Modal>
        )}
      </AppStyle>
    );
  }
}
export default App;
