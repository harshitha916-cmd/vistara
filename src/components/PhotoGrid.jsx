
import PhotoCard from "./PhotoCard";

function PhotoGrid({
  photos,
  loading,
  error,
  favourites,
  onToggleFavourite,
}) {
  if (loading) {
    return (
      <div className="py-20 text-center" role="status">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-violet-200 border-t-violet-700" />

        <p className="mt-5 text-lg font-medium text-indigo-950">
          Loading beautiful photos...
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while we prepare your gallery.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow-sm"
      >
        <p className="text-lg font-bold">
          Unable to load photos
        </p>

        <p className="mt-2">{error}</p>

        <p className="mt-2 text-sm">
          Please check your internet connection and refresh the page.
        </p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="rounded-2xl border border-violet-100 bg-white/80 px-5 py-16 text-center shadow-sm">
        <p className="text-xl font-bold text-indigo-950">
          No photos found
        </p>

        <p className="mt-2 text-slate-600">
          Try searching with a different photographer name.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={favourites.includes(String(photo.id))}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}

export default PhotoGrid;
