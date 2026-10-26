
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import PhotoGrid from "./components/PhotoGrid";
import useFetchPhotos from "./hooks/useFetchPhotos";

const STORAGE_KEY = "vistara-favourites";

function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const photoId = String(action.photoId);

      if (state.includes(photoId)) {
        return state.filter((id) => id !== photoId);
      }

      return [...state, photoId];
    }

    default:
      return state;
  }
}

function App() {
  const { photos, loading, error } = useFetchPhotos();

  const [searchQuery, setSearchQuery] = useState("");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    loadFavourites
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favourites)
      );
    } catch {
      // The gallery can still work if browser storage is unavailable.
    }
  }, [favourites]);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({
      type: "TOGGLE",
      photoId,
    });
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return photos;
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 text-gray-900">
      <Navbar />

      <main className="mx-auto w-full max-w-[1800px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <section className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-violet-700 sm:text-base">
            YOUR VISUAL INSPIRATION
          </p>

          <h1 className="mt-6 text-3xl font-extrabold uppercase leading-tight tracking-tight text-indigo-950 sm:text-4xl md:text-5xl">
            Discover Beautiful Photos
            <span className="mt-2 block bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Find Your Inspiration
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Explore stunning photographs from talented creators.
            Search by photographer and save the images you love.
          </p>

          <div className="mx-auto mt-10 max-w-3xl text-left">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>
        </section>

        <section
          className="mt-16 sm:mt-20"
          aria-label="Photo gallery"
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-indigo-950 sm:text-3xl md:text-4xl">
                Explore Photos
              </h2>

              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                A collection of beautiful moments and perspectives.
              </p>
            </div>

            <span className="rounded-full border border-violet-200 bg-white/80 px-5 py-2 text-sm font-semibold text-violet-800 shadow-sm sm:text-base">
              {loading
                ? "Loading photos..."
                : `${filteredPhotos.length} photos`}
            </span>
          </div>

          <PhotoGrid
            photos={filteredPhotos}
            loading={loading}
            error={error}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
          />
        </section>
      </main>

      <footer className="mt-10 border-t border-violet-100 bg-white/70 px-5 py-8 text-center text-sm text-slate-500 backdrop-blur">
        <p className="text-lg font-bold text-indigo-950">
          Vistara<span className="text-violet-600">.</span>
        </p>

        <p className="mt-2">
          Discover. Explore. Save your favourites.
        </p>

        <p className="mt-2">
          © 2026 Vistara. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
