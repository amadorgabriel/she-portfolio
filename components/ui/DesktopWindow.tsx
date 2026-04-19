"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Minus, Square, Sparkles } from "lucide-react";
import { useState, ReactNode } from "react";

interface DesktopWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  showDecorations?: boolean;
  variant?: "default" | "pink" | "purple";
  initialPosition?: { x: number; y: number };
  isDraggable?: boolean;
}

export function DesktopWindow({
  title,
  children,
  className,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized = false,
  showDecorations = true,
  variant = "default",
  initialPosition = { x: 0, y: 0 },
  isDraggable = false,
}: DesktopWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    onMinimize?.();
  };

  const variantStyles = {
    default: {
      titleBar: "bg-gradient-to-r from-[#3A5A9A] to-[#4B0082]",
      border: "border-gray-400",
      shadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]",
    },
    pink: {
      titleBar: "bg-gradient-to-r from-[#FF69B4] to-[#FF1493]",
      border: "border-pink-300",
      shadow: "shadow-[4px_4px_0px_0px_rgba(255,20,147,0.3)]",
    },
    purple: {
      titleBar: "bg-gradient-to-r from-[#4B0082] to-[#6A0DAD]",
      border: "border-purple-400",
      shadow: "shadow-[4px_4px_0px_0px_rgba(75,0,130,0.3)]",
    },
  };

  const currentVariant = variantStyles[variant];

  const WindowContent = (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-polaroid-offwhite",
        "border-2",
        currentVariant.border,
        currentVariant.shadow,
        isMaximized ? "w-full h-full" : "",
        className
      )}
    >
      {/* Title Bar estilo Windows 2000 */}
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2",
          currentVariant.titleBar,
          "text-white"
        )}
      >
        <div className="flex items-center gap-2">
          {showDecorations && (
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-flash-photo" />
            </motion.span>
          )}
          <span className="font-[family-name:var(--font-vt323)] text-lg tracking-wide truncate">
            {title}
          </span>
        </div>

        {/* Botões de controle */}
        <div className="flex items-center gap-1">
          <WindowButton onClick={handleMinimize} aria-label="Minimizar">
            <Minus className="w-3 h-3" />
          </WindowButton>
          <WindowButton onClick={onMaximize} aria-label="Maximizar">
            <Square className="w-3 h-3" />
          </WindowButton>
          <WindowButton onClick={onClose} variant="close" aria-label="Fechar">
            <X className="w-3 h-3" />
          </WindowButton>
        </div>
      </div>

      {/* Menu Bar (decorativo, estilo Windows) */}
      <div className="flex items-center gap-4 px-3 py-1 bg-gray-200 border-b border-gray-300 text-xs font-[family-name:var(--font-vt323)]">
        <button type="button" className="hover:bg-gray-300 px-2 py-0.5 underline">
          Arquivo
        </button>
        <button type="button" className="hover:bg-gray-300 px-2 py-0.5">
          Editar
        </button>
        <button type="button" className="hover:bg-gray-300 px-2 py-0.5">
          Ver
        </button>
        <button type="button" className="hover:bg-gray-300 px-2 py-0.5">
          Ajuda
        </button>
      </div>

      {/* Conteúdo */}
      <div
        className={cn(
          "p-4 overflow-auto",
          "max-h-[70vh]",
          "bg-soft-white",
          showDecorations && "bg-stars"
        )}
      >
        {children}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-gray-200 border-t border-gray-300 text-xs font-[family-name:var(--font-vt323)]">
        <span>Pronto</span>
        <span>{title}</span>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          drag={isDraggable}
          dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
          style={{ x: initialPosition.x, y: initialPosition.y }}
          className={cn(isMaximized ? "fixed inset-4 z-50" : "relative")}
        >
          {WindowContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Botão interno da janela
interface WindowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "close";
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

function WindowButton({
  children,
  onClick,
  variant = "default",
  className,
  disabled,
  "aria-label": ariaLabel,
}: WindowButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "flex items-center justify-center",
        "w-5 h-5 rounded-sm",
        "border border-gray-400",
        "bg-gradient-to-b from-gray-100 to-gray-300",
        "text-gray-700",
        "hover:from-gray-200 hover:to-gray-400",
        "active:from-gray-300 active:to-gray-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "close" && [
          "from-red-300 to-red-500",
          "text-white",
          "hover:from-red-400 hover:to-red-600",
          "border-red-600",
        ],
        className
      )}
    >
      {children}
    </motion.button>
  );
}

// Modal usando DesktopWindow
export function DesktopModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  variant = "pink",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "pink" | "purple";
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-night-purple/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <div className="pointer-events-auto w-full max-w-2xl">
              <DesktopWindow
                title={title}
                onClose={onClose}
                variant={variant}
                className={cn("max-h-[80vh]", className)}
              >
                {children}
              </DesktopWindow>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
