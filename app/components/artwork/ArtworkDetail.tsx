"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchArtworkByIdThunk, selectArtworkById, selectDetailStatus, selectError } from "@/lib/features/artwork/artworkSlice";
import styles from "./Artwork.module.css";

interface ArtworkDetailProps {
  id: number;
}

export const ArtworkDetail = ({ id }: ArtworkDetailProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const artwork = useAppSelector(selectArtworkById);
  const status = useAppSelector(selectDetailStatus);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (!artwork || artwork.id !== id) {
      dispatch(fetchArtworkByIdThunk(id));
    }
  }, [dispatch, id, artwork]);

  if (status === "loading" && (!artwork || artwork.id !== id)) {
    return (
      <div className={styles.detailContainer}>
        <p>Loading artwork details...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className={styles.detailContainer}>
        <p className={styles.error}>Error: {error}</p>
      </div>
    );
  }

  if (!artwork || artwork.id !== id) {
    return (
      <div className={styles.detailContainer}>
        <p>No artwork found</p>
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={() => router.back()}>
        ← Back
      </button>
      <div className={styles.detailContent}>
        {artwork.image_id && (
          <div className={styles.imageContainerLarge}>
            <Image
              src={`/api/image/${artwork.image_id}.jpg`}
              alt={artwork.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className={styles.imageLarge}
            />
          </div>
        )}

        <div className={styles.detailInfo}>
          <h1>{artwork.title}</h1>

          {artwork.artist_title && (
            <div className={styles.infoSection}>
              <h3>Artist</h3>
              <p>{artwork.artist_title}</p>
            </div>
          )}

          {artwork.date_display && (
            <div className={styles.infoSection}>
              <h3>Date</h3>
              <p>{artwork.date_display}</p>
            </div>
          )}

          {artwork.place_of_origin && (
            <div className={styles.infoSection}>
              <h3>Place of Origin</h3>
              <p>{artwork.place_of_origin}</p>
            </div>
          )}

          {artwork.medium_display && (
            <div className={styles.infoSection}>
              <h3>Medium</h3>
              <p>{artwork.medium_display}</p>
            </div>
          )}

          {artwork.dimensions && (
            <div className={styles.infoSection}>
              <h3>Dimensions</h3>
              <p>{artwork.dimensions}</p>
            </div>
          )}

          {artwork.artwork_type_title && (
            <div className={styles.infoSection}>
              <h3>Type</h3>
              <p>{artwork.artwork_type_title}</p>
            </div>
          )}

          {artwork.description && (
            <div className={styles.infoSection}>
              <h3>Description</h3>
              <p>{artwork.description}</p>
            </div>
          )}

          {artwork.credit_line && (
            <div className={styles.infoSection}>
              <h3>Credit</h3>
              <p>{artwork.credit_line}</p>
            </div>
          )}

          {artwork.material_titles && artwork.material_titles.length > 0 && (
            <div className={styles.infoSection}>
              <h3>Materials</h3>
              <ul>
                {artwork.material_titles.map((material, idx) => (
                  <li key={idx}>{material}</li>
                ))}
              </ul>
            </div>
          )}

          {artwork.term_titles && artwork.term_titles.length > 0 && (
            <div className={styles.infoSection}>
              <h3>Subject Matter</h3>
              <div className={styles.tags}>
                {artwork.term_titles.map((term, idx) => (
                  <span key={idx} className={styles.tag}>
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}

          {artwork.is_public_domain && (
            <div className={styles.infoSection}>
              <p className={styles.publicDomain}>✓ Public Domain</p>
            </div>
          )}

          {artwork.main_reference_number && (
            <div className={styles.infoSection}>
              <h3>Accession Number</h3>
              <p className={styles.small}>{artwork.main_reference_number}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
