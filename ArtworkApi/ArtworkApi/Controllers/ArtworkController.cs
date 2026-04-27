using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using ArtworkApi.Models;
using ArtworkApi.Services;

namespace ArtworkApi.Controllers
{
    [ApiController]
    [ResponseCache(Duration = 300)] // Cache for 5 minutes
    [Route("artwork")]
    public class ArtworkController : ControllerBase
    {
        //private readonly string baseUrl = "https://corsproxy.io/?url=https://api.artic.edu/api/v1/artworks";
        private readonly string baseUrl = "https://api.artic.edu/api/v1/artworks";
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<ArtworkController> _logger;
        private readonly ICacheDataService _cacheDataService;

        public ArtworkController(IHttpClientFactory httpClientFactory, ILogger<ArtworkController> logger, ICacheDataService cacheDataService)
        {
            _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _cacheDataService = cacheDataService ?? throw new ArgumentNullException(nameof(cacheDataService));
        }

        /// <summary>
        /// Proxy endpoint that returns a paginated list of artworks from the external API.
        /// It only forward page number
        /// Example: GET /artworks?page=2
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1)
        {
            var cacheKey = $"artworks:list:{page}";

            if (_cacheDataService.TryGetValue(cacheKey, out ArtworksResponse cachedArtworks))
            {
                return Ok(cachedArtworks);
            }

            var externalUrl = $"{baseUrl}?page={page}&limit=20";
            var client = _httpClientFactory.CreateClient();
            HttpResponseMessage response;
            try
            {
                response = await client.GetAsync(externalUrl);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calling external artwork list API: {Url}", externalUrl);
                return StatusCode(502, "Failed to retrieve artworks from upstream service.");
            }

            var content = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
            {
                return new ContentResult
                {
                    Content = content,
                    ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                    StatusCode = (int)response.StatusCode
                };
            }

            try
            {
                var artworksResponse = JsonSerializer.Deserialize<ArtworksResponse>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (artworksResponse != null)
                {
                    _cacheDataService.Set(cacheKey, artworksResponse);
                }

                return Ok(artworksResponse);
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Error deserializing artworks response from {Url}", externalUrl);
                return new ContentResult
                {
                    Content = content,
                    ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                    StatusCode = (int)response.StatusCode
                };
            }
        }

        /// <summary>
        /// Proxy endpoint that returns a single artwork by id from the external API.
        /// Example: GET /artworks/4
        /// Query string parameters are forwarded if present.
        /// </summary>
        [ResponseCache(Duration = 300)] // Cache for 5 minutes
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest("id is required");
            }

            var query = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            var cacheKey = $"artwork:detail:{id}:{query}";

            if (_cacheDataService.TryGetValue(cacheKey, out ArtworkResponse cachedArtwork))
            {
                return Ok(cachedArtwork);
            }

            var externalUrl = $"{baseUrl}/{Uri.EscapeDataString(id)}" + query;
            var client = _httpClientFactory.CreateClient();
            HttpResponseMessage response;
            try
            {
                response = await client.GetAsync(externalUrl);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calling external artwork detail API: {Url}", externalUrl);
                return StatusCode(502, "Failed to retrieve artwork from upstream service.");
            }

            var content = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
            {
                return new ContentResult
                {
                    Content = content,
                    ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                    StatusCode = (int)response.StatusCode
                };
            }

            try
            {
                var artworkResponse = JsonSerializer.Deserialize<ArtworkResponse>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                

                if (artworkResponse != null)
                {
                    //todo: load file and store it in S3 using IFileStoreService
                    //and update image_url in artworkResponse before caching it
                    //var imageUrlResponse = await client.GetAsync($"<image_api>{artworkResponse.image_id}");
                    //var imageUrl = JsonSerializer.Deserialize<ImageResponse>(await response.Content.ReadAsStringAsync()).image_url;
                    //artworkResponse.image_url = await _fileStoreService.StoreFileAsync(artworkResponse.image_url);
                    _cacheDataService.Set(cacheKey, artworkResponse);
                }
                

                return Ok(artworkResponse);
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Error deserializing artwork response from {Url}", externalUrl);
                return new ContentResult
                {
                    Content = content,
                    ContentType = response.Content.Headers.ContentType?.ToString() ?? "application/json",
                    StatusCode = (int)response.StatusCode
                };
            }
        }
    }
}
