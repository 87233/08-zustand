import type { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? "all" : slug?.[0];
  return {
    title: `Filter by category: ${tag}`,
    description: `Notes by filter: ${tag}`,
    openGraph: {
      title: `Filter by category: ${tag}`,
      description: `Notes by filter: ${tag}`,
      url: `https://notehub.com/notes/${slug}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Filter by category: ${tag}`,
        },
      ],
      type: "website",
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? undefined : slug?.[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ["notes", "", tag, "created", 1],
    queryFn: () =>
      fetchNotes({
        search: "",
        page: 1,
        sortBy: "created",
        tag: tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag ?? ""} />
    </HydrationBoundary>
  );
}
