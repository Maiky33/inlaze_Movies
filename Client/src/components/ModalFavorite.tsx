interface ModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({ open,title, message, onConfirm, onCancel,}: ModalProps) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>

        <button onClick={onCancel}>Cancelar</button>
        <button onClick={onConfirm}>Eliminar</button>
      </div>
    </div>
  );
}