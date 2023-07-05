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

  const loadGallery = async () => {
    setIsLoading(true);

    const data = await galleryApi(search, page);

    setPage(page);
    setGallery(data.hits);
    setIsLoading(false);
    setAllImages(data.total);
  };

  const loadMoreImages = async () => {
    setIsLoading(true);

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

  useEffect(() => {
    if (search !== '') {
      loadGallery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (page !== 1) {
      loadMoreImages();
      setPage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const areImages = gallery.length > 0;

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
