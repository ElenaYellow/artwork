using System;
using System.Collections.Generic;

namespace ArtworkApi.Models
{
    public class Artwork
    {
        public int Id { get; set; }
        public string ApiModel { get; set; }
        public string ApiLink { get; set; }
        public bool IsBoosted { get; set; }
        public string Title { get; set; }
        public List<string> AltTitles { get; set; }
        public object Thumbnail { get; set; } // Could be a more specific type
        public string MainReferenceNumber { get; set; }
        public bool HasNotBeenViewedMuch { get; set; }
        public double? BoostRank { get; set; }
        public int? DateStart { get; set; }
        public int? DateEnd { get; set; }
        public string DateDisplay { get; set; }
        public string DateQualifierTitle { get; set; }
        public int? DateQualifierId { get; set; }
        public string ArtistDisplay { get; set; }
        public string PlaceOfOrigin { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Dimensions { get; set; }
        public object DimensionsDetail { get; set; } // Could be a more specific type
        public string MediumDisplay { get; set; }
        public string Inscriptions { get; set; }
        public string CreditLine { get; set; }
        public string CatalogueDisplay { get; set; }
        public string PublicationHistory { get; set; }
        public string ExhibitionHistory { get; set; }
        public string ProvenanceText { get; set; }
        public string Edition { get; set; }
        public string PublishingVerificationLevel { get; set; }
        public double? InternalDepartmentId { get; set; }
        public double? FiscalYear { get; set; }
        public double? FiscalYearDeaccession { get; set; }
        public bool IsPublicDomain { get; set; }
        public bool IsZoomable { get; set; }
        public double? MaxZoomWindowSize { get; set; }
        public string CopyrightNotice { get; set; }
        public bool HasMultimediaResources { get; set; }
        public bool HasEducationalResources { get; set; }
        public bool HasAdvancedImaging { get; set; }
        public float? Colorfulness { get; set; }
        public object Color { get; set; } // Could be a more specific type
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string Latlon { get; set; }
        public bool IsOnView { get; set; }
        public string OnLoanDisplay { get; set; }
        public string GalleryTitle { get; set; }
        public double? GalleryId { get; set; }
        public string NomismaId { get; set; }
        public string ArtworkTypeTitle { get; set; }
        public double? ArtworkTypeId { get; set; }
        public string DepartmentTitle { get; set; }
        public double? DepartmentId { get; set; }
        public int? ArtistId { get; set; }
        public string ArtistTitle { get; set; }
        public List<int> AltArtistIds { get; set; }
        public int? ArtistIds { get; set; }
        public List<string> ArtistTitles { get; set; }
        public List<string> CategoryIds { get; set; }
        public List<string> CategoryTitles { get; set; }
        public List<string> TermTitles { get; set; }
        public string StyleId { get; set; }
        public string StyleTitle { get; set; }
        public List<string> AltStyleIds { get; set; }
        public List<string> StyleIds { get; set; }
        public List<string> StyleTitles { get; set; }
        public string ClassificationId { get; set; }
        public string ClassificationTitle { get; set; }
        public List<string> AltClassificationIds { get; set; }
        public List<string> ClassificationIds { get; set; }
        public List<string> ClassificationTitles { get; set; }
        public string SubjectId { get; set; }
        public List<string> AltSubjectIds { get; set; }
        public List<string> SubjectIds { get; set; }
        public List<string> SubjectTitles { get; set; }
        public string MaterialId { get; set; }
        public List<string> AltMaterialIds { get; set; }
        public List<string> MaterialIds { get; set; }
        public List<string> MaterialTitles { get; set; }
        public string TechniqueId { get; set; }
        public List<string> AltTechniqueIds { get; set; }
        public List<string> TechniqueIds { get; set; }
        public List<string> TechniqueTitles { get; set; }
        public List<string> ThemeTitles { get; set; }
        public Guid? ImageId { get; set; }
        public List<string> AltImageIds { get; set; }
        public List<string> DocumentIds { get; set; }
        public Guid? SoundIds { get; set; }
        public Guid? VideoIds { get; set; }
        public Guid? TextIds { get; set; }
        public List<long> SectionIds { get; set; }
        public List<string> SectionTitles { get; set; }
        public List<int> SiteIds { get; set; }
        public object SuggestAutocompleteBoosted { get; set; }
        public object SuggestAutocompleteAll { get; set; }
        public DateTime? SourceUpdatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? Timestamp { get; set; }
    }
}