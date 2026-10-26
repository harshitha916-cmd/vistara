import { useEffect, useState } from "react";
import { fetchPhotos } from "../utils/api";

function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPhotos() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchPhotos();

        if (!cancelled) {
          setPhotos(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPhotos();

    return () => {
      cancelled = true;
    };
  }, []);

  return { photos, loading, error };
}

export default useFetchPhotos;