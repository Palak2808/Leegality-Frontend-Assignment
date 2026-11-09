const LoadingState = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />

        <p className="text-sm text-gray-500">
          Loading products...
        </p>
      </div>
    </div>
  );
};

export default LoadingState;