import { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ image, setCroppedImage }) => {
  const preview = image[0].preview;
  const cropperRef = useRef(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.getCroppedCanvas().toBlob(blob => console.log(blob));
  };

  return (
    <Cropper
      src={preview}
      style={{ height: 300, width: "100%", flex: 1 }}
      // Cropper.js options
      initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
      viewMode={1}
      dragMode="move"
      responsive={true}
      preview={".img-cropped"}
      cropBoxMovable={true}
      cropBoxResizable={true}
    />
  );
};
export default ImageCropper;
