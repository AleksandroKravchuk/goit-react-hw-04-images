import { AppStyle } from './App.styled';
import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Oval } from 'react-loader-spinner';
import ApiService from 'API/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';

const apiData = new ApiService();
const App = () => {
  const [searcName, setSearchName] = useState('');
  const [totalHits, settotalHits] = useState(null);
  const [fotoModal, setfotoModal] = useState(null);
  const [loading, setloading] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [page, setpage] = useState(1);
  const [foto, setfoto] = useState([]);
  const [perPages, setperPages] = useState(true);

  useEffect(() => {
    if (searcName !== '') {
      apiData.query = searcName.trim();
      apiData.setAddNewPage(page);
      setloading(true);
      apiData
        .fetchImages()
        .then(({ hits, totalHits }) => {
          setfoto(prevState => [...prevState, ...hits]);
          settotalHits(totalHits);
          if (totalHits === 0) {
            Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
        })
        .catch(error => Notify.failure('Ooooops somthing went wrong'))
        .finally(() => setloading(false));
    }
  }, [page, searcName]);

  const onSubmitName = searchName => {
    setSearchName(searchName);
    setpage(1);
    setfoto([]);
    setperPages(true);
  };
  const onClickLoadMore = () => {
    setpage(prevState => prevState + 1);
    const allPages = Math.ceil(totalHits / apiData.getPer_page());
    if (page + 1 >= allPages) {
      setperPages(false);
    }
  };
  const toggleModal = evt => {
    setshowModal(!showModal);
    if (!showModal) {
      const itemId = evt.currentTarget.id;
      // eslint-disable-next-line array-callback-return
      foto.map(item => {
        if (item.id === Number(itemId)) {
          setfotoModal(item.largeImageURL);
        }
      });
    }
  };

  const perPage = apiData.getPer_page();
  return (
    <AppStyle>
      <Searchbar onSubmit={onSubmitName}></Searchbar>

      {foto && (
        <ImageGallery fotoArray={foto} modalOpen={toggleModal}>
          {' '}
        </ImageGallery>
      )}
      {loading && (
        <Oval color="#00BFFF" height={80} width={80} margin-left="auto" />
      )}
      {foto.length >= perPage && perPages && (
        <Button onClickLoadMore={onClickLoadMore}></Button>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={fotoModal} alt="foto" />
        </Modal>
      )}
    </AppStyle>
  );
};
export default App;
