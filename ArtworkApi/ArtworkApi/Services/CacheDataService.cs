using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace ArtworkApi.Services
{
    /**
     * Stores api responses in in-memory cache
     */
    public class CacheDataService : ICacheDataService
    {
        private readonly IMemoryCache _memoryCache;
        private readonly CacheSettings _settings;

        public CacheDataService(IMemoryCache memoryCache, IOptions<CacheSettings> options)
        {
            _memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));
            _settings = options?.Value ?? throw new ArgumentNullException(nameof(options));
        }

        public Task<T> GetOrCreateAsync<T>(string cacheKey, Func<Task<T>> factory, TimeSpan? absoluteExpirationRelativeToNow = null)
        {
            if (string.IsNullOrWhiteSpace(cacheKey))
            {
                throw new ArgumentException("Cache key must not be null or whitespace.", nameof(cacheKey));
            }

            if (factory == null)
            {
                throw new ArgumentNullException(nameof(factory));
            }

            var expiration = absoluteExpirationRelativeToNow ?? TimeSpan.FromSeconds(_settings.ApiTtlSeconds);

            return _memoryCache.GetOrCreateAsync(cacheKey, async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = expiration;
                return await factory();
            });
        }

        public void Set<T>(string cacheKey, T value, TimeSpan? absoluteExpirationRelativeToNow = null)
        {
            if (string.IsNullOrWhiteSpace(cacheKey))
            {
                throw new ArgumentException("Cache key must not be null or whitespace.", nameof(cacheKey));
            }

            var expiration = absoluteExpirationRelativeToNow ?? TimeSpan.FromSeconds(_settings.ApiTtlSeconds);
            var cacheEntryOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expiration
            };

            _memoryCache.Set(cacheKey, value, cacheEntryOptions);
        }

        public bool TryGetValue<T>(string cacheKey, out T value)
        {
            if (string.IsNullOrWhiteSpace(cacheKey))
            {
                throw new ArgumentException("Cache key must not be null or whitespace.", nameof(cacheKey));
            }

            return _memoryCache.TryGetValue(cacheKey, out value);
        }

        public void Remove(string cacheKey)
        {
            if (string.IsNullOrWhiteSpace(cacheKey))
            {
                throw new ArgumentException("Cache key must not be null or whitespace.", nameof(cacheKey));
            }

            _memoryCache.Remove(cacheKey);
        }
    }
}
