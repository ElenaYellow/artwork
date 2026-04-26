import { NextRequest, NextResponse } from "next/server";

const IIIF_BASE_URL = "https://corsproxy.io/?url=https://www.artic.edu/iiif/2";

export async function GET(request: NextRequest, { params }: { params: Promise<{ imageId: string }> }) {
  try {
    const { imageId: rawImageId } = await params;
    let imageId = rawImageId;

    // Remove .jpg extension if present
    if (imageId.endsWith(".jpg")) {
      imageId = imageId.slice(0, -4);
    }

    if (!imageId) {
      return NextResponse.json({ error: "Missing image ID" }, { status: 400 });
    }

    //715ea334-ba62-8ef7-a41b-89d9cba1828f
    // Construct the IIIF URL
    //const iiifUrl = `${IIIF_BASE_URL}/${imageId}/full/843,/0/default.jpg`;
    //const iiifUrl = `${IIIF_BASE_URL}/715ea334-ba62-8ef7-a41b-89d9cba1828f/full/843,/0/default.jpg`;

    const iiifUrl = `${IIIF_BASE_URL}/${imageId}/full/843,/0/default.jpg`;

    // Fetch the image from the Art Institute
    const response = await fetch(iiifUrl);

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch image: ${response.statusText}` }, { status: response.status });
    }

    // Get the image blob
    const imageBlob = await response.blob();

    // Return the blob with appropriate headers
    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        "Content-Type": imageBlob.type || "image/jpeg",
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
