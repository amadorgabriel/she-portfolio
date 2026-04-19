"use client";

import { Sparkles, Heart, Star, Scissors } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Main Container - Y2K Closet Window Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="win95-window w-full max-w-4xl overflow-hidden"
      >
        {/* Title Bar - Windows 2000 Style */}
        <div className="win95-titlebar">
          <span className="text-lg tracking-wide">
            🎀 Meu Closet Virtual - Microsoft Internet Explorer
          </span>
          <div className="flex gap-1">
            <button className="win95-button px-2 py-0.5 text-sm">_</button>
            <button className="win95-button px-2 py-0.5 text-sm">□</button>
            <button className="win95-button px-2 py-0.5 text-sm">×</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 bg-soft-white">
          {/* Header */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-glitter-pink animate-sparkle" />
              <h1 className="font-[family-name:var(--font-fredoka)] text-5xl md:text-7xl font-bold text-pink-2000 tracking-tight">
                Fashion Portfolio
              </h1>
              <Sparkles className="w-8 h-8 text-flash-photo animate-sparkle" />
            </div>
            <p className="font-[family-name:var(--font-caveat)] text-2xl md:text-3xl text-night-purple">
              ✨ Bem-vindo ao meu mundo fashion Y2K ✨
            </p>
          </motion.div>

          {/* Navigation Drawers - Gavetas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Heart, label: "Lookbook", color: "text-pink-2000" },
              { icon: Scissors, label: "Styling Lab", color: "text-plaid-blue" },
              { icon: Star, label: "Sketchbook", color: "text-night-purple" },
            ].map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-glossy p-6 flex flex-col items-center gap-3 cursor-star"
              >
                <item.icon className={`w-10 h-10 ${item.color}`} />
                <span className="font-[family-name:var(--font-fredoka)] text-xl text-white font-semibold">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Central Mannequin Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-polaroid-offwhite rounded-lg p-8 mb-8 border-4 border-glitter-pink border-dashed"
          >
            <div className="text-center">
              <div className="inline-block animate-float">
                <span className="text-8xl">👗</span>
              </div>
              <p className="font-[family-name:var(--font-vt323)] text-xl text-night-purple mt-4">
                &gt; Manequim Central - Carregando looks...
              </p>
              <p className="font-[family-name:var(--font-caveat)] text-lg text-leopard-brown mt-2">
                Clique nas gavetas para explorar as coleções!
              </p>
            </div>
          </motion.div>

          {/* Status Bar */}
          <div className="font-[family-name:var(--font-vt323)] text-sm text-night-purple bg-white/50 p-3 rounded border-2 border-glitter-pink/30 flex justify-between items-center">
            <span>⭐ 3 looks disponíveis</span>
            <span>📂 Última atualização: 2024</span>
            <span className="animate-pulse">💾 Salvando...</span>
          </div>
        </div>
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="font-[family-name:var(--font-caveat)] text-night-purple/70 mt-6 text-lg"
      >
        Feito com 💖 e muito glitter
      </motion.p>
    </div>
  );
}
