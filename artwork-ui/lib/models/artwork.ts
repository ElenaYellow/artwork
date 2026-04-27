export interface ArtworkThumbnail {
  lqip: string;
  width: number;
  height: number;
  alt_text?: string;
}

export interface ArtworkDimensionDetail {
  depth?: number | null;
  width?: number | null;
  height?: number | null;
  diameter?: number | null;
  clarification?: string | null;
}

export interface ArtworkColor {
  h: number;
  l: number;
  s: number;
  percentage: number;
  population: number;
}

export interface ArtworkSuggestAutocomplete {
  input: string[];
  weight?: number;
  contexts: {
    groupings: string[];
  };
}

export interface Artwork {
  id: number;
  last_fully_fetched_at: string; // for manual cache management
  image_url?: string; //actual image url
  api_model: string;
  api_link: string;
  is_boosted: boolean;
  title: string;
  alt_titles: string[] | null;
  thumbnail: ArtworkThumbnail;
  main_reference_number: string;
  has_not_been_viewed_much: boolean;
  boost_rank: number | null;
  date_start: number;
  date_end: number;
  date_display: string;
  date_qualifier_title: string;
  date_qualifier_id: number | null;
  artist_display: string;
  place_of_origin: string;
  description: string | null;
  short_description: string | null;
  dimensions: string | null;
  dimensions_detail: ArtworkDimensionDetail[];
  medium_display: string;
  inscriptions: string | null;
  credit_line: string;
  catalogue_display: string | null;
  publication_history: string | null;
  exhibition_history: string | null;
  provenance_text: string | null;
  edition: string | null;
  publishing_verification_level: string;
  internal_department_id: number;
  fiscal_year: number;
  fiscal_year_deaccession: number | null;
  is_public_domain: boolean;
  is_zoomable: boolean;
  max_zoom_window_size: number;
  copyright_notice: string | null;
  has_multimedia_resources: boolean;
  has_educational_resources: boolean;
  has_advanced_imaging: boolean;
  colorfulness: number;
  color: ArtworkColor;
  latitude: number | null;
  longitude: number | null;
  latlon: string | null;
  is_on_view: boolean;
  on_loan_display: string | null;
  gallery_title: string | null;
  gallery_id: number | null;
  nomisma_id: string | null;
  artwork_type_title: string;
  artwork_type_id: number;
  department_title: string;
  department_id: string;
  artist_id: number | null;
  artist_title: string | null;
  alt_artist_ids: number[];
  artist_ids: number[];
  artist_titles: string[];
  category_ids: string[];
  category_titles: string[];
  term_titles: string[];
  style_id: string | null;
  style_title: string | null;
  alt_style_ids: string[];
  style_ids: string[];
  style_titles: string[];
  classification_id: string;
  classification_title: string;
  alt_classification_ids: string[];
  classification_ids: string[];
  classification_titles: string[];
  subject_id: string | null;
  alt_subject_ids: string[];
  subject_ids: string[];
  subject_titles: string[];
  material_id: string | null;
  alt_material_ids: string[];
  material_ids: string[];
  material_titles: string[];
  technique_id: string | null;
  alt_technique_ids: string[];
  technique_ids: string[];
  technique_titles: string[];
  theme_titles: string[];
  image_id: string;
  alt_image_ids: string[];
  document_ids: string[];
  sound_ids: string[];
  video_ids: string[];
  text_ids: string[];
  section_ids: string[];
  section_titles: string[];
  site_ids: string[];
  suggest_autocomplete_all: ArtworkSuggestAutocomplete[];
  source_updated_at: string;
  updated_at: string;
  timestamp: string;
}

export interface ArtworkListApiResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url?: string;
  };
  data: Artwork[];
  info: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

export interface ArtworkDetailApiResponse {
  data: Artwork;
  info: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}
