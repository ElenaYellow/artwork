"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchAllArtworksThunk,
  selectAllArtworks,
  selectListStatus,
  selectPagination,
  selectError,
} from "@/lib/features/artwork/artworkSlice";
import styles from "./Artwork.module.css";

interface ArtworkListProps {
  limit?: number;
}

export const ArtworkList = ({ limit = 20 }: ArtworkListProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const artworks = useAppSelector(selectAllArtworks);
  const status = useAppSelector(selectListStatus);
  const pagination = useAppSelector(selectPagination);
  const error = useAppSelector(selectError);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllArtworksThunk({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const handleArtworkClick = (id: number) => {
    router.push(`/artworks/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleArtworkClick(id);
    }
  };

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (status === "loading" && artworks.length === 0) {
    return (
      <div className={styles.container}>
        <p>Loading artworks...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Artworks Gallery</h2>

      {pagination && (
        <div className={styles.paginationInfo}>
          <p>
            Page {pagination.current_page} of {pagination.total_pages} • Total: {pagination.total} artworks
          </p>
        </div>
      )}

      <div className={styles.grid}>
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className={styles.card}
            onClick={() => handleArtworkClick(artwork.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, artwork.id)}
          >
            {artwork.thumbnail && (
              <div className={styles.imageContainer}>
                <Image
                  src={artwork.thumbnail.lqip}
                  alt={artwork.thumbnail.alt_text || artwork.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{artwork.title}</h3>
              {artwork.artist_title && <p className={styles.artist}>{artwork.artist_title}</p>}
              {artwork.date_display && <p className={styles.date}>{artwork.date_display}</p>}
              {artwork.artwork_type_title && <p className={styles.type}>{artwork.artwork_type_title}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1 || status === "loading"}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={!pagination || currentPage >= pagination.total_pages || status === "loading"}>
          Next
        </button>
      </div>
    </div>
  );
};
