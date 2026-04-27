namespace ArtworkApi.Models
{
    public class ArtworkResponse
    {
        public Artwork Data { get; set; }
        public object Info { get; set; } // Could be more specific if needed
        public object Config { get; set; } // Could be more specific if needed
    }
}