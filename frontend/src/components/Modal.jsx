import React from "react";

const Modal = ({ children }) => {
  return <div className="fixed inset-0  h-screen bg-black/60 z-100">{children}</div>;
};

export default Modal;
