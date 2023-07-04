import React, { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { galleryApi } from './services/galleryApi';

class App extends Component {
  state = {
    page: 1,
    search: '',
    gallery: [],
    per_page: 12,
    isLoading: false,
    allImages: 0,
    isModalOpen: false,
    imageForModal: '',
    allPages: '',
  };

  loadGallery = async () => {
    this.setState({ isLoading: true });
    let { search, page } = this.state;

    const data = await galleryApi(search, page);

    this.setState({
      page,
      gallery: data.hits,
      isLoading: false,
      allImages: data.total,
      allPages: data.totalHits / 12,
    });
    //  console.log(this.allPages);
  };

  loadMoreImages = async () => {
    this.setState({ isLoading: true });
    const { search, page } = this.state;
    const data = await galleryApi(search, page);

    this.setState(prevState => ({
      gallery: [...prevState.gallery, ...data.hits],
      isLoading: false,
      allImages: data.total,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      await this.loadGallery();
    }

    if (
      this.state.page !== prevState.page &&
      prevState.search === this.state.search
    ) {
      this.loadMoreImages();
      this.setState({ page: this.state.page });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: 1 + prevState.page,
    }));
  };

  handleSearch = search => {
    if (search === '') {
      this.loadGallery();
    }
    this.setState({ search: search, page: 1, images: [], isLoading: true });
  };

  handleImageClick = imageLink => {
    this.setState({ imageForModal: imageLink });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));

    if (this.state.isModalOpen) {
      this.setState({
        imageForModal: '',
      });
    }
  };

  render() {
    const {
      gallery,
      search,
      isLoading,
      isModalOpen,
      imageForModal,
      allImages,
    } = this.state;

    const areImages = gallery.length > 0;
    console.log(this.state.page);

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
        <Searchbar onSubmit={this.handleSearch} onSearch={this.handleSearch} />
        {areImages && (
          <ImageGallery gallery={gallery} onClickImg={this.handleImageClick} />
        )}
        {allImages > gallery.length && (
          <Button
            value="Load more"
            onClick={this.handleLoadMore}
            onLoadMore={this.handleLoadMore}
          />
        )}
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal
            image={imageForModal}
            decription={search}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
