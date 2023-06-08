import { useSelector } from "react-redux";
import LoginModal from "../../features/auth/LoginForm";
import RegisterModal from "../../features/auth/RegisterForm";
import EventModal from "../../features/events/form/EventForm";
import AboutModal from "../../features/users/profile/AboutProfileForm";

const lookUp = { login: LoginModal, register: RegisterModal, event: EventModal, about: AboutModal };
const ModalManager = () => {
  const { open, modalType, modalProps } = useSelector((store) => store.modalReducer);
  //   let renderedModal;
  if (open) {
    const ModalComponent = lookUp[modalType];
    return <ModalComponent {...modalProps} />;
  }
  return null;
};

export default ModalManager;
