using System.Collections.Generic;

namespace ArtworkApi.Models
{
    public class ArtworksResponse
    {
        public Pagination Pagination { get; set; }
        public List<Artwork> Data { get; set; }
        public object Info { get; set; } // Could be more specific if needed
        public object Config { get; set; } // Could be more specific if needed
    }
}