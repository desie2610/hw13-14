import { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

import { fetchImages } from "./services/api";

class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    loading: false,
    showModal: false,
    largeImageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.loadImages();
    }
  }

  loadImages = async () => {
    const { query, page } = this.state;

    if (!query) return;

    this.setState({ loading: true });

    try {
      const data = await fetchImages(query, page);

      this.setState((prevState) => ({
        images: [...prevState.images, ...data.hits],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (query) => {
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (largeImageURL) => {
    this.setState({
      showModal: true,
      largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: "",
    });
  };

  render() {
    const {
      images,
      loading,
      showModal,
      largeImageURL,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />

        <ImageGallery
          images={images}
          onOpenModal={this.openModal}
        />

        {loading && <Loader />}

        {images.length > 0 && !loading && (
          <Button onClick={this.loadMore} />
        )}

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;