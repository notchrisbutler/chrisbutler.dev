import { X } from 'lucide-react';

interface GameNotificationProps {
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

export function GameNotification({ message, buttonText, onButtonClick }: GameNotificationProps) {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-center z-50">
      <div className="bg-gray-800/95 text-white rounded-lg shadow-lg backdrop-blur-sm p-4 flex items-center gap-4 max-w-[90%] sm:max-w-md animate-slide-down">
        <p className="flex-1">{message}</p>
        <button
          onClick={onButtonClick}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors whitespace-nowrap"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
} 