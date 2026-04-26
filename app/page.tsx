import type { Metadata } from "next";
import { ArtworkList } from "./components/artwork/ArtworkList";

export default function IndexPage() {
  return <ArtworkList />;
}

export const metadata: Metadata = {
  title: "Artwork Explorer",
};
