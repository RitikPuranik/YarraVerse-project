export default function LoadingFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-amber-900 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-400 border-t-transparent mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold mb-2">Preparing Sacred Space</h2>
        <p className="text-orange-200">Loading 360° experience...</p>
      </div>
    </div>
  );
}
