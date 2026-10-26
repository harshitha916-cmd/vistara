const API_URL = "https://picsum.photos/v2/list?limit=30";

export async function fetchPhotos() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load photos. Please try again.");
  }

  const data = await response.json();

  return data;
}