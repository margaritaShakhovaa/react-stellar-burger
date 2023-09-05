import React, { FC, ReactNode, useEffect } from "react";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modals") as HTMLElement;

type TModal = {
    handleClose: () => void;
    children?: ReactNode;
    header?: string;
};

const Modal: FC<TModal> = ({ handleClose, children, header }) => {

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    }},
      [handleClose]
  );

  return createPortal (
      (
          <div className={styles.modal}>
            <div className={styles.container}>
              <div className={styles.header}>
                <p className={'text text_type_main-large'}>{header}</p>
                <button className={styles.close_button}>
                  <CloseIcon type="primary" onClick={handleClose}/>
                </button>
              </div>
              {children}
            </div>
            <ModalOverlay onClose={handleClose} />
          </div>
      ), modalRoot
  );
};

export default Modal;