function ModalContainer({ children, isOpen, setIsOpen }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-black/20 backdrop-blur-xs z-50"
    >
      <div className="flex h-full items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className="min-w-10 min-h-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
