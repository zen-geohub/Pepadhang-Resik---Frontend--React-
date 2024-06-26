function Modal({ children }) {
  return (
    <div className="w-screen h-screen bg-[#00000080] z-50 absolute flex items-center justify-center">{children}</div>
  );
}

export default Modal;
