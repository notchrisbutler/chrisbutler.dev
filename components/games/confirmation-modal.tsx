interface ConfirmationModalProps {
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100] p-4">
      <div className="bg-gray-800/95 text-white rounded-lg shadow-lg backdrop-blur-sm p-6 max-w-[90%] sm:max-w-md animate-slide-down">
        <p className="text-center mb-6">{message}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors min-w-[100px]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors min-w-[100px]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
} 