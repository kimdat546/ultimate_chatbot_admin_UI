import React from "react";
import ReactDOM from "react-dom";
const Modal = ({ isShowing, children }) =>
    isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className="modal-overlay" />
                  <div className="modal-wrapper">
                      {children}
                  </div>
              </React.Fragment>,
              document.body
          )
        : null;

export default Modal;
