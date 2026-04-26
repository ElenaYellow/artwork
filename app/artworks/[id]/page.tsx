import { ArtworkDetail } from "@/app/components/artwork/ArtworkDetail";

interface ArtworkPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { id } = await params;
  const artworkId = parseInt(id, 10);

  if (isNaN(artworkId)) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Invalid Artwork ID</h1>
        <p>Please provide a valid artwork ID.</p>
      </div>
    );
  }

  return <ArtworkDetail id={artworkId} />;
}
