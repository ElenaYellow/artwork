
namespace ArtworkApi.Services
{
    //TODO: store file is s3 or any other file storage

    public class FileStoreService : IFileStoreService
    {
        public void SaveFile(Stream fileStream)
        {
            /*
            using var s3Client = new AmazonS3Client();
            var fileTransferUtility = new TransferUtility(s3Client);


            // OR Upload from a Stream (e.g., from an API request)
            // await fileTransferUtility.UploadAsync(myStream, bucketName, keyName);*/
        }
    }
}
