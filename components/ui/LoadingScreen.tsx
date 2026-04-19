"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Sparkles, Heart, Star } from "lucide-react";

interface LoadingScreenProps {
  isLoading?: boolean;
  progress?: number;
  message?: string;
  className?: string;
  variant?: "fullscreen" | "inline" | "minimal";
  onComplete?: () => void;
}

const loadingMessages = [
  "Vestindo o manequim...",
  "Escolhendo o look perfeito...",
  "Aplicando glitter...",
  "Arrumando o closet...",
  "Escovando o cabelo...",
  "Passando batom...",
  "Conferindo os acessórios...",
  "Fazendo pose...",
  "Tirando fotos...",
  "Quase pronto!",
];

export function LoadingScreen({
  isLoading = true,
  progress,
  message,
  className,
  variant = "fullscreen",
  onComplete,
}: LoadingScreenProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    // Ciclo de mensagens
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    // Progresso simulado se não fornecido
    const progressInterval = setInterval(() => {
      if (progress === undefined) {
        setInternalProgress((prev) => {
          if (prev >= 100) {
            onComplete?.();
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }
    }, 800);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading, progress, onComplete]);

  const displayProgress = progress ?? Math.min(internalProgress, 100);

  if (!isLoading) return null;

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5 text-pink-2000" />
        </motion.span>
        <span className="font-[family-name:var(--font-vt323)] text-night-purple">
          {message || "Carregando..."}
        </span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 p-6 rounded-2xl",
          "bg-polaroid-offwhite border-2 border-pink-2000/20",
          className
        )}
      >
        {/* Spinner */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full border-4 border-pink-2000/20 border-t-pink-2000"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            👗
          </motion.span>
        </div>

        {/* Mensagem */}
        <motion.p
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="font-[family-name:var(--font-vt323)] text-lg text-night-purple"
        >
          {message || loadingMessages[currentMessage]}
        </motion.p>

        {/* Progress bar */}
        <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-2000 to-glitter-pink rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${displayProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <span className="font-[family-name:var(--font-vt323)] text-sm text-gray-500">
          {Math.round(displayProgress)}%
        </span>
      </div>
    );
  }

  // Fullscreen
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "fixed inset-0 z-[100]",
        "flex flex-col items-center justify-center",
        "bg-gradient-to-br from-soft-white via-polaroid-offwhite to-soft-white",
        "bg-stars",
        className
      )}
    >
      {/* Container principal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative"
      >
        {/* Logo animado */}
        <div className="relative w-40 h-40 mb-8 mx-auto">
          {/* Círculos externos */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-pink-2000/30"
              animate={{
                scale: [1, 1.2, 1],
                rotate: i % 2 === 0 ? 360 : -360,
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Centro com ícone */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-pink-2000 to-glitter-pink flex items-center justify-center shadow-xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="text-6xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              👗
            </motion.span>
          </motion.div>

          {/* Sparkles orbitando */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: Math.cos((i * Math.PI) / 2) * 80 - 10,
                y: Math.sin((i * Math.PI) / 2) * 80 - 10,
              }}
            >
              <motion.span
                animate={{ scale: [0, 1, 0], rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                ✨
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Título */}
        <motion.h1
          className="text-center font-[family-name:var(--font-fredoka)] text-3xl md:text-4xl text-pink-2000 mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading...
        </motion.h1>

        {/* Mensagem animada */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center font-[family-name:var(--font-caveat)] text-xl text-night-purple mb-6"
          >
            {message || loadingMessages[currentMessage]}
          </motion.p>
        </AnimatePresence>

        {/* Barra de progresso estilo retro */}
        <div className="w-72 md:w-96 mx-auto">
          {/* Container com borda 3D */}
          <div
            className="relative h-8 rounded-lg overflow-hidden"
            style={{
              background: "#ddd",
              boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.2), inset -2px -2px 5px rgba(255,255,255,0.5)",
            }}
          >
            {/* Progresso */}
            <motion.div
              className="absolute top-1 bottom-1 left-1 rounded-md overflow-hidden"
              style={{ width: `calc(${displayProgress}% - 8px)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-2000 via-glitter-pink to-pink-2000" />

              {/* Stripes animados */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)",
                }}
                animate={{ x: [0, 20] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Porcentagem */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-[family-name:var(--font-vt323)] text-sm text-night-purple drop-shadow-sm">
                {Math.round(displayProgress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Tips de loading */}
        <motion.p
          className="text-center font-[family-name:var(--font-vt323)] text-xs text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Tip: Pressione ESC para pular animações
        </motion.p>
      </motion.div>

      {/* Elementos decorativos no fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${((i * 37) % 100)}%`,
              top: `${((i * 53 + 7) % 100)}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + ((i * 13) % 20) / 10,
              repeat: Infinity,
              delay: ((i * 7) % 20) / 10,
            }}
          >
            {i % 3 === 0 ? <Star className="w-4 h-4 text-flash-photo" /> : i % 3 === 1 ? <Heart className="w-4 h-4 text-pink-2000" /> : <Sparkles className="w-4 h-4 text-glitter-pink" />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Export também o AnimatePresence para uso
import { AnimatePresence } from "framer-motion";
export { AnimatePresence };
