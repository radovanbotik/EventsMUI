import { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import ModalWrapper from "../modals/ModalWrapper";

const ImageCropper = ({ image, setCroppedImage }) => {
  const preview = image[0].preview;
  const cropperRef = useRef(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => setCroppedImage(blob));
  };

  return (
    // <ModalWrapper title="Crop Image">
    <Cropper
      src={preview}
      style={{ height: "200px", flex: 1, aspectRatio: 16 / 9, maxWidth: "400px" }}
      // Cropper.js options
      viewMode={1}
      // initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
      dragMode="move"
      responsive={true}
      preview={".img-cropped"}
      // cropBoxMovable={true}
      // cropBoxResizable={true}
    />
    // </ModalWrapper>
  );
};
export default ImageCropper;
