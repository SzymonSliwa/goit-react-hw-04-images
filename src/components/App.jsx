import React, { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { galleryApi } from './services/galleryApi';

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allImages, setAllImages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageForModal, setImageForModal] = useState('');

  // const per_page = 12;

  // const allPages = '';

  const loadGallery = async () => {
    setIsLoading(true);
    //  let { search, page } = this.state;

    const data = await galleryApi(search, page);

    //   this.setState({
    setPage(page);
    setGallery(data.hits);
    setIsLoading(false);
    setAllImages(data.total);
    //    allPages: data.totalHits / 12,
    //   });
    //  console.log(this.allPages);
  };

  const loadMoreImages = async () => {
    setIsLoading(true);
    //  const { search, page } = this.state;
    const data = await galleryApi(search, page);

    setGallery(prevState => [...prevState, ...data.hits]);
    setIsLoading(false);
    setAllImages(data.total);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = search => {
    if (search === '') {
      loadGallery();
    }
    setSearch(search);
    setPage(1);
    setIsLoading(true);
    //    images: [], isLoading: true
  };

  const handleImageClick = imageLink => {
    setImageForModal(imageLink);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);

    if (isModalOpen) {
      setImageForModal('');
    }
  };

  //  componentDidUpdate

  //async (prevProps, prevState) {
  //  if (prevState.search !== this.state.search) {
  //    await loadGallery();
  //  }

  //  if (
  //    this.state.page !== prevState.page &&
  //    prevState.search === this.state.search
  //  ) {
  //    this.loadMoreImages();
  //    this.setState({ page: this.state.page });
  //  }
  // }

  useEffect(() => {
    if (search !== '') {
      loadGallery();
    }
  }, [search]);

  useEffect(() => {
    if (page !== 1) {
      loadMoreImages();
      setPage(page);
    }
  }, [page]);

  const areImages = gallery.length > 0;
  // render() {
  //   const {
  //     gallery,
  //     search,
  //     isLoading,
  //     isModalOpen,
  //    imageForModal,
  //    allImages,
  //  } = this.state;

  //   const areImages = gallery.length > 0;
  //   console.log(this.state.page);

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={handleSearch} onSearch={handleSearch} />
      {areImages && (
        <ImageGallery gallery={gallery} onClickImg={handleImageClick} />
      )}
      {allImages > gallery.length && (
        <Button
          value="Load more"
          onClick={handleLoadMore}
          onLoadMore={handleLoadMore}
        />
      )}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal
          image={imageForModal}
          decription={search}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default App;
