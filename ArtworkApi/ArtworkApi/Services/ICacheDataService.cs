using System;
using System.Threading.Tasks;

namespace ArtworkApi.Services
{
    public interface ICacheDataService
    {
        Task<T> GetOrCreateAsync<T>(string cacheKey, Func<Task<T>> factory, TimeSpan? absoluteExpirationRelativeToNow = null);
        void Set<T>(string cacheKey, T value, TimeSpan? absoluteExpirationRelativeToNow = null);
        bool TryGetValue<T>(string cacheKey, out T value);
        void Remove(string cacheKey);
    }
}
