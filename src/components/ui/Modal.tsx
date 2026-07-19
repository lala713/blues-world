import { ReactNode, useEffect, useRef } from "react";
import { PixelButton } from "./PixelButton";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ title, open, onClose, children }: ModalProps) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-panel__header">
          <h2 id="modal-title">{title}</h2>
          <PixelButton ref={closeRef} icon="close" variant="quiet" aria-label="Close dialog" onClick={onClose} />
        </div>
        <div className="modal-panel__body">{children}</div>
      </section>
    </div>
  );
};
