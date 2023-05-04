import { useSelector } from "react-redux";
import TestModal from "./TestModal";
import FormModal from "./FormModal";

const lookUp = { test: TestModal, login: FormModal };
const ModalManager = () => {
  const { open, modalType, modalProps } = useSelector(store => store.modalReducer);
  //   let renderedModal;
  if (open) {
    //saving modal function into const, now it is function
    const ModalComponent = lookUp[modalType];
    //creating a component, now it is object
    // renderedModal = <ModalComponent {...modalProps} />;
    //rendering modal
    // return <>{renderedModal}</>;
    return <ModalComponent {...modalProps} />;
  }
  return null;
};

export default ModalManager;
