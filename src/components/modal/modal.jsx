import React, { useEffect } from "react";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById('modals');

function Modal(props) {

  const { handleClose } = props;

  useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.removeEventListener("keydown", closeOnEscapeKey);
    }},
      [handleClose]
  );


  return createPortal (
      (
          <div className={styles.modal}>
            <div className={styles.container}>
              <div className={styles.header}>
                <p className={'text text_type_main-large'}>{props.header}</p>
                <button className={styles.close_button}>
                  <CloseIcon type="primary" onClick={handleClose}/>
                </button>
              </div>
              {props.children}
            </div>
            <ModalOverlay onClose={handleClose} />
          </div>
      ), modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}