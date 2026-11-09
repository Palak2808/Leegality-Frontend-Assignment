import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
      <AlertCircle size={38} className="mb-3 text-red-500" />

      <h2 className="text-lg font-semibold text-gray-800">
        Something went wrong
      </h2>

      <p className="mt-2 max-w-sm text-sm text-gray-500">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-md bg-blue-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;