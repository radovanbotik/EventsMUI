import { useSelector } from "react-redux";
import LoginModal from "../../features/auth/LoginForm";
import RegisterModal from "../../features/auth/RegisterForm";

const lookUp = { login: LoginModal, register: RegisterModal };
const ModalManager = () => {
  const { open, modalType, modalProps } = useSelector(store => store.modalReducer);
  //   let renderedModal;
  if (open) {
    const ModalComponent = lookUp[modalType];
    return <ModalComponent {...modalProps} />;
  }
  return null;
};

export default ModalManager;
