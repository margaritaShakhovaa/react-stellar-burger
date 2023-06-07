import React from "react";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById('modals');

function Modal(props) {

  React.useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? props.handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [props.handleClose]);

  if (!props.isOpen) return null;

  return ReactDOM.createPortal (
      (
          <div className={styles.modal}>
            <div className={styles.container}>
              <div className={styles.header}>
                <p className={'text text_type_main-large'}>{props.header}</p>
                <button className={styles.close_button}><CloseIcon type="primary" onClick={props.handleClose}/></button>
              </div>
              {props.children}
            </div>
            <ModalOverlay onClose={props.handleClose} />
          </div>
      ), modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.oneOfType([
      PropTypes.bool.isRequired,
      PropTypes.object.isRequired
  ]),
  handleClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}