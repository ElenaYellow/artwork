import { createAppSlice } from "@/lib/createAppSlice";
import type { Artwork, ArtworkDetailApiResponse, ArtworkListApiResponse } from "@/lib/models/artwork";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchAllArtworks, fetchArtworkById } from "./artworkAPI";
import { isBefore } from "date-fns/fp/isBefore";
import { addMilliseconds } from "date-fns";

export type LoadingStatus = "idle" | "loading" | "failed";
const maxCacheMin = 1000 * 60 * 60; // 1 hour

const TEST_IMAGE_URL = "https://www.artic.edu/iiif/2/715ea334-ba62-8ef7-a41b-89d9cba1828f/full/843,/0/default.jpg";

/**
 * NOT HOW IT SHOULD BE DONE IN PRODUCTION
 * In real world example I would use the RTK Query (see the artworkAPI.query.ts) for data fetching and caching,
 * but it would not show that i can understand the idea of using slices and
 * joining same data in one slice when more data gets avaiable.
 * It's not needed here and is not actually used, because there is no
 * real caching implemented, but I wanted to show that I understand the concept.
 *
 * I added a manual TTL for artwork items, so the list eventually
 * gets updated with the latest data from the API.
 *
 * Even if there would be API wrapper with caching,
 * I still prefer to have caching on the client as well to
 * minimize API calls.
 **/

export interface ArtworkSliceState {
  artworksById: Record<number, Artwork>;
  artworkCurrentPageIds: number[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  } | null;
  listStatus: LoadingStatus;
  detailStatus: LoadingStatus;
  error: string | null;
  selectedArtworkId: number | null;
}

const initialState: ArtworkSliceState = {
  artworksById: {},
  artworkCurrentPageIds: [],
  pagination: null,
  listStatus: "idle",
  detailStatus: "idle",
  error: null,
  selectedArtworkId: null,
};

export const artworkSlice = createAppSlice({
  name: "artwork",
  initialState,
  reducers: (create) => ({
    selectArtwork: create.reducer((state, action: PayloadAction<number>) => {
      state.selectedArtworkId = action.payload;
    }),
    clearError: create.reducer((state) => {
      state.error = null;
    }),
    fetchAllArtworks: create.asyncThunk(
      async (params: { page?: number; limit?: number } = { page: 1, limit: 20 }) => {
        const response = await fetchAllArtworks(params);
        return response as ArtworkListApiResponse;
      },
      {
        pending: (state) => {
          state.listStatus = "loading";
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.listStatus = "idle";
          const { data, pagination } = action.payload;

          // Store pagination info
          state.pagination = pagination;

          const newIds: number[] = [];
          data.forEach((artwork) => {
            if (
              !state.artworksById[artwork.id] ||
              isBefore(addMilliseconds(Date.parse(state.artworksById[artwork.id].last_fully_fetched_at), maxCacheMin), new Date())
            ) {
              state.artworksById[artwork.id] = artwork;
            }
            newIds.push(artwork.id);
          });

          // reset for new page
          state.artworkCurrentPageIds = newIds;
          state.error = null;
        },
        rejected: (state, action) => {
          state.listStatus = "failed";
          state.error = action.error.message || "Failed to fetch artworks";
        },
      },
    ),
    fetchArtworkById: create.asyncThunk(
      async (id: number) => {
        const response = await fetchArtworkById(id);
        return response as ArtworkDetailApiResponse;
      },
      {
        pending: (state) => {
          state.detailStatus = "loading";
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.detailStatus = "idle";
          const artwork = action.payload.data;

          state.artworksById[artwork.id] = artwork;
          state.artworksById[artwork.id].last_fully_fetched_at = new Date().toISOString();
          state.artworksById[artwork.id].image_url = `${TEST_IMAGE_URL}`;

          // Add to IDs list if not already present
          if (!state.artworkCurrentPageIds.includes(artwork.id)) {
            state.artworkCurrentPageIds.push(artwork.id);
          }

          state.selectedArtworkId = artwork.id;
          state.error = null;
        },
        rejected: (state, action) => {
          state.detailStatus = "failed";
          state.error = action.error.message || "Failed to fetch artwork details";
        },
      },
    ),
  }),
  selectors: {
    selectAllArtworks: (state) => state.artworkCurrentPageIds.map((id) => state.artworksById[id]),
    selectArtworkById: (state) => (state.selectedArtworkId ? state.artworksById[state.selectedArtworkId] : null),
    selectListStatus: (state) => state.listStatus,
    selectDetailStatus: (state) => state.detailStatus,
    selectPagination: (state) => state.pagination,
    selectError: (state) => state.error,
    selectSelectedArtworkId: (state) => state.selectedArtworkId,
  },
});

export const {
  selectArtwork,
  clearError,
  fetchAllArtworks: fetchAllArtworksThunk,
  fetchArtworkById: fetchArtworkByIdThunk,
} = artworkSlice.actions;

export const {
  selectAllArtworks,
  selectArtworkById,
  selectListStatus,
  selectDetailStatus,
  selectPagination,
  selectError,
  selectSelectedArtworkId,
} = artworkSlice.selectors;
