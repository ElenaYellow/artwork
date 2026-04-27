namespace ArtworkApi.Services
{
    public interface IFileStoreService
    {
        void SaveFile(Stream fileStream);
    }
}
