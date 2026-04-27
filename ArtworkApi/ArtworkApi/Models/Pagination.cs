namespace ArtworkApi.Models
{
    public class Pagination
    {
        public int Total { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public string PrevUrl { get; set; }
        public string NextUrl { get; set; }
    }
}