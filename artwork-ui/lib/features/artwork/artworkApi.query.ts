import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const artworkApiQuery = createApi({
  reducerPath: "artworkApiQuery",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getArtworks: builder.query({
      query: (params?: { page?: number }) => {
        const { page = 1 } = params || {};
        return {
          url: "/v1/artworks",
          params: {
            page,
            fields: MINIMAL_FIELDS,
          },
        };
      },
    }),
    getArtworkById: builder.query({
      query: (id: number) => `/v1/artworks/${id}`,
    }),
  }),
});

export const { useGetArtworksQuery, useGetArtworkByIdQuery } = artworkApiQuery;
