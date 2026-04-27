namespace ArtworkApi.Services
{
    public class CacheSettings
    {
        public int ApiTtlSeconds { get; set; } = 30 * 60; // 30 minutes
        public int ImageTtlSeconds { get; set; } = 2 * 60 * 60; // 2 hours
    }
}
