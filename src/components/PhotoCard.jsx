
function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/80 bg-white shadow-md shadow-indigo-950/5 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-950/10">
      <div className="relative overflow-hidden bg-violet-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/400`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60 xl:h-64"
        />

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite
              ? "Remove from favourites"
              : "Add to favourites"
          }
          aria-pressed={isFavourite}
          className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-md backdrop-blur transition ${
            isFavourite
              ? "bg-pink-100 text-pink-600"
              : "bg-white/90 text-slate-600 hover:bg-pink-100 hover:text-pink-600"
          }`}
        >
          {isFavourite ? "♥" : "♡"}
        </button>
      </div>

      <div className="flex min-h-20 items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
            Photographer
          </p>

          <p className="mt-1 truncate text-base font-bold text-indigo-950">
            {photo.author}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            isFavourite
              ? "bg-pink-50 text-pink-600"
              : "bg-violet-50 text-violet-700"
          }`}
        >
          {isFavourite ? "Saved" : "Photo"}
        </span>
      </div>
    </article>
  );
}

export default PhotoCard;
