"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { urlFor } from "@/sanity/client";
import type { SanityImage } from "@/types/sanity";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: SanityImage[];
  projectTitle: string;
  className?: string;
}

export function ProjectGallery({ images, projectTitle, className }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-8",
          "bg-polaroid-offwhite rounded-lg border-2 border-dashed border-pink-2000/30",
          className
        )}
      >
        <p className="font-[family-name:var(--font-vt323)] text-night-purple">
          Sem imagens na galeria
        </p>
      </div>
    );
  }

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
      setIsZoomed(false);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
      setIsZoomed(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Grid estilo "Dressing Room" */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={image._key || index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "group relative aspect-[3/4] overflow-hidden rounded-lg",
              "border-4 border-white",
              "shadow-[4px_4px_0px_0px_rgba(255,105,180,0.3)]",
              "transition-all duration-300",
              "hover:shadow-[6px_6px_0px_0px_rgba(255,105,180,0.5)]",
              "cursor-zoom-in"
            )}
            style={{
              transform: `rotate(${(index % 3) - 1}deg)`,
            }}
          >
            {/* Imagem com fit crop para manter proporção */}
            <Image
              src={urlFor(image).width(400).height(533).format("webp").fit("crop").url()}
              alt={image.alt || `${projectTitle} - Imagem ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={cn(
                "object-cover transition-all duration-500",
                "group-hover:brightness-110"
              )}
            />

            {/* Overlay com ícone de zoom */}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "bg-gradient-to-t from-pink-2000/60 via-transparent to-transparent",
                "opacity-0 group-hover:opacity-100 transition-opacity"
              )}
            >
              <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
            </div>

            {/* Legenda estilo Polaroid */}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/90">
                <p className="font-[family-name:var(--font-caveat)] text-sm text-dark-text text-center truncate">
                  {image.caption}
                </p>
              </div>
            )}

            {/* Número da imagem (estilo "item de closet") */}
            <div
              className={cn(
                "absolute top-2 right-2",
                "w-6 h-6 rounded-full bg-pink-2000",
                "flex items-center justify-center",
                "font-[family-name:var(--font-fredoka)] text-xs text-white"
              )}
            >
              {index + 1}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal/Lightbox estilo Windows 2000 */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop com padrão */}
            <div className="absolute inset-0 bg-night-purple/90 backdrop-blur-sm bg-leopard" />

            {/* Janela estilo Windows 2000 */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={cn(
                "relative z-10 max-w-5xl w-full max-h-[90vh] overflow-hidden",
                "win95-window"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title Bar */}
              <div className="win95-titlebar flex items-center justify-between">
                <span className="font-[family-name:var(--font-vt323)] text-lg">
                  📷 {projectTitle} - Imagem {selectedIndex + 1} de {images.length}
                </span>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className={cn(
                    "win95-button px-2 py-0.5",
                    "hover:bg-red-500 hover:text-white transition-colors"
                  )}
                  aria-label="Fechar galeria"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Conteúdo da imagem */}
              <div className="relative bg-black flex items-center justify-center p-4">
                {/* Botão anterior */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className={cn(
                      "absolute left-4 z-20",
                      "btn-glossy p-2",
                      "hover:scale-110 transition-transform"
                    )}
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Imagem principal */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "relative overflow-hidden",
                      isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                    )}
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <Image
                      src={urlFor(images[selectedIndex])
                        .width(isZoomed ? 1600 : 1200)
                        .height(isZoomed ? 1200 : 900)
                        .format("webp")
                        .url()}
                      alt={images[selectedIndex].alt || `${projectTitle} - Imagem ${selectedIndex + 1}`}
                      width={isZoomed ? 1600 : 1200}
                      height={isZoomed ? 1200 : 900}
                      className={cn(
                        "max-h-[70vh] w-auto object-contain transition-transform duration-300",
                        isZoomed ? "scale-150" : "scale-100"
                      )}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Botão próximo */}
                {images.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className={cn(
                      "absolute right-4 z-20",
                      "btn-glossy p-2",
                      "hover:scale-110 transition-transform"
                    )}
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>

              {/* Footer com legenda e controles */}
              <div className="bg-polaroid-offwhite p-4 border-t-2 border-gray-300">
                {images[selectedIndex].caption && (
                  <p className="font-[family-name:var(--font-caveat)] text-xl text-center text-dark-text mb-3">
                    {images[selectedIndex].caption}
                  </p>
                )}

                {/* Thumbnails de navegação */}
                <div className="flex justify-center gap-2 mt-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all",
                        idx === selectedIndex
                          ? "bg-pink-2000 scale-125"
                          : "bg-gray-300 hover:bg-glitter-pink"
                      )}
                      aria-label={`Ver imagem ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Dica de atalhos */}
                <p className="font-[family-name:var(--font-vt323)] text-xs text-gray-500 text-center mt-3">
                  Use ← → para navegar • ESC para fechar • Clique para zoom
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Versão em carrossel para projetos com menos imagens
export function ProjectCarousel({
  images,
  projectTitle,
  className,
}: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Container estilo "TV antiga" */}
      <div
        className={cn(
          "relative overflow-hidden rounded-lg",
          "border-8 border-gray-700",
          "bg-black",
          "shadow-[0_0_0_4px_#FF1493,0_0_0_8px_#FF69B4]"
        )}
      >
        {/* Scanlines effect */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          }}
        />

        {/* Imagem atual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video"
          >
            <Image
              src={urlFor(images[currentIndex]).width(800).height(450).format("webp").url()}
              alt={images[currentIndex].alt || `${projectTitle} - ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Controles de navegação */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 btn-glossy p-2"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 btn-glossy p-2"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}

        {/* Indicador de slide */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                idx === currentIndex ? "bg-pink-2000 w-4" : "bg-white/50"
              )}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Legenda abaixo da TV */}
      {images[currentIndex].caption && (
        <p className="font-[family-name:var(--font-caveat)] text-center text-lg text-night-purple mt-4">
          {images[currentIndex].caption}
        </p>
      )}
    </div>
  );
}
