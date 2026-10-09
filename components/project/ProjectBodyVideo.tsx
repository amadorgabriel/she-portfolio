"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { urlFor } from "@/sanity/client";
import type { MuxVideoAsset, SanityImage } from "@/types/sanity";
import { cn } from "@/lib/utils";

interface ProjectBodyVideoProps {
  video: {
    _type: "mux.video";
    asset?: MuxVideoAsset;
  };
  alt: string;
  caption?: string;
  poster?: SanityImage;
  title: string;
  className?: string;
}

function parseMuxAspectRatio(ratio?: string): number | undefined {
  if (!ratio) return undefined;
  const [w, h] = ratio.split(":").map(Number);
  return w > 0 && h > 0 ? w / h : undefined;
}

function muxThumbnailUrl(playbackId: string, thumbTime?: number): string {
  const url = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
  return thumbTime != null ? `${url}?time=${thumbTime}` : url;
}

function playerPosterUrl(
  playbackId: string | undefined,
  thumbTime: number | undefined,
  poster?: SanityImage
): string | undefined {
  if (poster?.asset) {
    return urlFor(poster).width(1600).format("jpg").url();
  }
  return playbackId ? muxThumbnailUrl(playbackId, thumbTime) : undefined;
}

export function ProjectBodyVideo({
  video,
  alt,
  caption,
  poster,
  title,
  className,
}: ProjectBodyVideoProps) {
  const playbackId = video?.asset?.playbackId;
  if (!playbackId) {
    return (
      <figure className={cn("mb-12 w-full", className)}>
        <div className="flex aspect-video w-full items-center justify-center bg-[var(--color-line)]">
          <p className="text-sm text-[var(--color-muted)]">Vídeo indisponível</p>
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-[var(--color-muted)]">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  const posterUrl = playerPosterUrl(playbackId, video.asset?.thumbTime, poster);
  const aspectRatio =
    parseMuxAspectRatio(video.asset?.data?.aspect_ratio) ?? 16 / 9;

  return (
    <figure className={cn("mb-12 w-full", className)}>
      <div className="relative w-full overflow-hidden bg-black">
        <MuxPlayer
          playbackId={playbackId}
          poster={posterUrl}
          placeholder={posterUrl}
          playsInline
          metadata={{
            video_id: video.asset?.assetId,
            video_title: title,
          }}
          style={{
            width: "100%",
            aspectRatio: String(aspectRatio),
          }}
        />
      </div>
      <span className="sr-only">{alt}</span>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
