"use client";

import { useState } from "react";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react/lazy";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { urlFor } from "@/sanity/client";
import type {
  GalleryMedia,
  SanityGalleryImage,
  SanityGalleryVideo,
} from "@/types/sanity";
import { cn } from "@/lib/utils";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";

const GRID_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

interface ProjectGalleryProps {
  items: GalleryMedia[];
  projectTitle: string;
  className?: string;
}

function isGalleryImage(item: GalleryMedia): item is SanityGalleryImage {
  return item._type === "image";
}

function isGalleryVideo(item: GalleryMedia): item is SanityGalleryVideo {
  return item._type === "galleryVideo";
}

function getImageAspectRatio(image: SanityGalleryImage): number {
  const dims = image.asset?.metadata?.dimensions;
  if (dims?.aspectRatio && dims.aspectRatio > 0) return dims.aspectRatio;
  if (dims?.width && dims?.height && dims.height > 0) {
    return dims.width / dims.height;
  }
  if (image.asset?.width && image.asset?.height && image.asset.height > 0) {
    return image.asset.width / image.asset.height;
  }
  return 4 / 5;
}

/** `aspect_ratio` da Mux vem como "16:9"; converte para número. */
function parseMuxAspectRatio(ratio?: string): number | undefined {
  if (!ratio) return undefined;
  const [w, h] = ratio.split(":").map(Number);
  return w > 0 && h > 0 ? w / h : undefined;
}

function getMediaAspectRatio(item: GalleryMedia): number {
  if (isGalleryImage(item)) return getImageAspectRatio(item);
  if (item.poster) return getImageAspectRatio({ ...item.poster, alt: item.alt, _type: "image" });
  return parseMuxAspectRatio(item.video?.asset?.data?.aspect_ratio) ?? 16 / 9;
}

function thumbUrl(image: SanityGalleryImage): string {
  return urlFor(image).width(800).format("webp").url();
}

function hiResUrl(image: SanityGalleryImage): string {
  return urlFor(image).width(1400).format("webp").url();
}

function videoPlaybackId(video: SanityGalleryVideo): string | undefined {
  return video.video?.asset?.playbackId;
}

function muxThumbnailUrl(playbackId: string, thumbTime?: number): string {
  const url = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
  return thumbTime != null ? `${url}?time=${thumbTime}` : url;
}

function posterAsImage(video: SanityGalleryVideo): SanityGalleryImage | undefined {
  if (!video.poster) return undefined;
  return { ...video.poster, _type: "image", alt: video.alt };
}

/** Poster do player: override editorial (Sanity) vence; senão, thumbnail Mux. */
function playerPosterUrl(video: SanityGalleryVideo): string | undefined {
  const poster = posterAsImage(video);
  if (poster) return urlFor(poster).width(1600).format("jpg").url();
  const playbackId = videoPlaybackId(video);
  return playbackId ? muxThumbnailUrl(playbackId, video.video?.asset?.thumbTime) : undefined;
}

function mediaKey(item: GalleryMedia, index: number): string {
  return item._key || `${item._type}-${index}`;
}

function GridVideoThumb({ video, title }: { video: SanityGalleryVideo; title: string }) {
  const poster = posterAsImage(video);
  if (poster) {
    return (
      <Image
        src={thumbUrl(poster)}
        alt={title}
        fill
        sizes={GRID_SIZES}
        className="object-contain transition-opacity duration-300 group-hover:opacity-80"
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_DATA_URL}
      />
    );
  }
  const playbackId = videoPlaybackId(video);
  if (playbackId) {
    return (
      <Image
        src={muxThumbnailUrl(playbackId, video.video?.asset?.thumbTime)}
        alt={title}
        fill
        sizes={GRID_SIZES}
        className="object-contain transition-opacity duration-300 group-hover:opacity-80"
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_DATA_URL}
      />
    );
  }
  return <span className="absolute inset-0 bg-[var(--color-ink)]/10" aria-hidden />;
}

function GalleryVideoPlayer({ video, title }: { video: SanityGalleryVideo; title: string }) {
  const playbackId = videoPlaybackId(video);
  if (!playbackId) return null;
  const poster = playerPosterUrl(video);
  const aspectRatio = parseMuxAspectRatio(video.video?.asset?.data?.aspect_ratio);
  return (
    <MuxPlayer
      playbackId={playbackId}
      poster={poster}
      placeholder={poster}
      playsInline
      metadata={{
        video_id: video.video?.asset?.assetId,
        video_title: title,
      }}
      style={{
        width: "100%",
        maxHeight: "75vh",
        aspectRatio: aspectRatio ? String(aspectRatio) : undefined,
      }}
    />
  );
}

export function ProjectGallery({ items, projectTitle, className }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hiResLoaded, setHiResLoaded] = useState(false);

  if (!items || items.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-12 border border-dashed border-[var(--color-line)]",
          className
        )}
      >
        <p className="text-[var(--color-muted)]">Sem mídia na galeria</p>
      </div>
    );
  }

  const openAt = (index: number) => {
    setHiResLoaded(false);
    setSelectedIndex(index);
  };

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setHiResLoaded(false);
      setSelectedIndex(selectedIndex === 0 ? items.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setHiResLoaded(false);
      setSelectedIndex(selectedIndex === items.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Eventos vindos do <mux-player> (hotkeys de seek/play) ficam no player;
    // sem este guard, uma seta faria seek no vídeo e trocaria de mídia no lightbox.
    if (e.target instanceof HTMLElement && e.target.closest("mux-player")) return;
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

  const fewItems = items.length < 3;
  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "gap-4",
          fewItems
            ? "flex flex-wrap justify-center"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {items.map((item, index) => (
          <button
            key={mediaKey(item, index)}
            type="button"
            onClick={() => openAt(index)}
            className={cn(
              "group relative overflow-hidden bg-[var(--color-line)] text-left",
              fewItems &&
                "w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
            )}
            style={{ aspectRatio: String(getMediaAspectRatio(item)) }}
          >
            {isGalleryImage(item) ? (
              <Image
                src={thumbUrl(item)}
                alt={item.alt || `${projectTitle} — mídia ${index + 1}`}
                fill
                sizes={GRID_SIZES}
                className="object-contain transition-opacity duration-300 group-hover:opacity-80"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
              />
            ) : (
              <>
                <GridVideoThumb
                  video={item}
                  title={item.alt || `${projectTitle} — vídeo ${index + 1}`}
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-[var(--color-bg)]/90 p-3 text-[var(--color-ink)] shadow-sm">
                    <Play className="h-6 w-6 fill-current" aria-hidden />
                  </span>
                </span>
                <span className="sr-only">
                  {item.alt || `${projectTitle} — vídeo ${index + 1}`}
                </span>
              </>
            )}
            {item.caption && (
              <span className="absolute bottom-0 inset-x-0 bg-[var(--color-bg)]/90 px-3 py-2 text-sm text-[var(--color-muted)] truncate">
                {item.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {selectedIndex !== null && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/90 p-4"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria — ${projectTitle}`}
        >
          <div
            className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between text-[var(--color-bg)]">
              <span className="text-sm tracking-wide">
                {projectTitle} — {selectedIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="p-1 opacity-80 hover:opacity-100"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-[40vh] items-center justify-center bg-black">
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="absolute left-2 z-20 p-2 text-[var(--color-bg)] opacity-80 hover:opacity-100"
                  aria-label="Mídia anterior"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
              )}

              {isGalleryImage(selected) ? (
                <div className="relative flex max-h-[75vh] w-full items-center justify-center">
                  <Image
                    src={thumbUrl(selected)}
                    alt=""
                    width={1400}
                    height={1050}
                    aria-hidden
                    className={cn(
                      "max-h-[75vh] w-auto object-contain blur-sm scale-105 transition-opacity duration-300",
                      hiResLoaded ? "opacity-0" : "opacity-100"
                    )}
                  />
                  <Image
                    key={mediaKey(selected, selectedIndex)}
                    src={hiResUrl(selected)}
                    alt={
                      selected.alt || `${projectTitle} — mídia ${selectedIndex + 1}`
                    }
                    width={1400}
                    height={1050}
                    className={cn(
                      "absolute inset-0 m-auto max-h-[75vh] w-auto object-contain transition-opacity duration-300",
                      hiResLoaded ? "opacity-100" : "opacity-0"
                    )}
                    priority
                    onLoad={() => setHiResLoaded(true)}
                  />
                </div>
              ) : isGalleryVideo(selected) && videoPlaybackId(selected) ? (
                <div className="relative flex max-h-[75vh] w-full items-center justify-center">
                  <GalleryVideoPlayer
                    key={mediaKey(selected, selectedIndex)}
                    video={selected}
                    title={
                      selected.alt || `${projectTitle} — vídeo ${selectedIndex + 1}`
                    }
                  />
                </div>
              ) : (
                <p className="p-8 text-sm text-[var(--color-bg)]/80">
                  Mídia indisponível
                </p>
              )}

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 z-20 p-2 text-[var(--color-bg)] opacity-80 hover:opacity-100"
                  aria-label="Próxima mídia"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              )}
            </div>

            {selected.caption && (
              <p className="mt-3 text-center text-sm text-[var(--color-bg)]/80">
                {selected.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
