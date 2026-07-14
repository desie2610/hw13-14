import "./ImageGalleryItem.css"

const ImageGalleryItem = ({ image, onOpenModal }) => {
  return (
    <li className="gallery-item">
      <img
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onOpenModal(image.largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;