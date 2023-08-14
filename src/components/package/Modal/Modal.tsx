import { PropModal } from "@packageTypes";
import { ModalPortal } from "@package";
import "./Modal.scss";
import React from "react";
import timesSolid from "./times-solid.svg";

export function Modal(props: PropModal) {
  const {
    size = "auto-screen",
    isOpen,
    style,
    children,
    overlay = "gray-light",
    closeModal,
    closable = false,
    keep = false,
    title,
  } = props;

  const handleOnClose = () => {
    if (closeModal) {
      closeModal();
    }
  };

  return (
    isOpen && (
      <div className={`c-bg-${overlay} modalAppOverlay`} style={style}>
        {
          <ModalPortal closeModal={closeModal}>
            {closable ? (
              <div
                className={
                  "c-m-2 containerCloseable" +
                  ` c-justify-${title ? "space" : "end"}`
                }
              >
                {title && <div>{title}</div>}
                <div
                  onClick={handleOnClose}
                  className={
                    "containerCloseable__closeableModal c-cursor-pointer"
                  }
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={timesSolid}
                  />
                </div>
              </div>
            ) : (
              <React.Fragment />
            )}
            <>{children}</>
          </ModalPortal>
        }
      </div>
    )
  );
}
