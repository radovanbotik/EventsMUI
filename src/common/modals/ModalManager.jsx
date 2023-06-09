import { useSelector } from "react-redux";
import EventModal from "../../features/events/form/EventForm";
import AboutModal from "../../features/users/profile/AboutProfileForm";
import ImageUploader from "../photos/ImageUploader";
import ImageCropper from "../photos/ImageCropper";

const lookUp = {
  event: EventModal,
  about: AboutModal,
  photo: ImageUploader,
  cropper: ImageCropper,
};
const ModalManager = () => {
  const { open, modalType, modalProps } = useSelector((store) => store.modalReducer);
  if (open) {
    const ModalComponent = lookUp[modalType];
    return <ModalComponent {...modalProps} />;
  }
  return null;
};

export default ModalManager;
