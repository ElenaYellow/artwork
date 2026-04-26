const API_BASE_URL = "https://api.artic.edu/api";

const MINIMAL_FIELDS = [
  "id",
  "title",
  "thumbnail",
  "image_id",
  "artist_title",
  "date_display",
  "place_of_origin",
  "artwork_type_title",
].join(",");

interface FetchAllArtworksParams {
  page?: number;
  limit?: number;
}

/**
 * Fetch all artworks with minimal fields to reduce payload size
 */
export const fetchAllArtworks = async ({ page = 1 }: FetchAllArtworksParams = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    fields: MINIMAL_FIELDS,
  });

  const response = await fetch(`${API_BASE_URL}/v1/artworks?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch artworks: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch a single artwork with all details
 */
export const fetchArtworkById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/v1/artworks/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch artwork ${id}: ${response.statusText}`);
  }

  return response.json();
};
