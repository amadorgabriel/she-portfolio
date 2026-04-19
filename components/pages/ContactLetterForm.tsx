"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { GlossyButton } from "@/components/ui/GlossyButton";
import { PolaroidFrame } from "@/components/ui/PolaroidFrame";
import { Y2KBreadcrumbs } from "@/components/ui/NavigationDock";
import type { Contact } from "@/types/sanity";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "Assunto obrigatório"),
  message: z.string().min(10, "Conte mais um pouco 💌"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  contact: Contact | null;
  polaroidSrc?: string | null;
  polaroidAlt?: string;
};

export function ContactLetterForm({ contact, polaroidSrc, polaroidAlt }: Props) {
  const [sent, setSent] = useState(false);
  const [flyLetter, setFlyLetter] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !json.ok) {
      setServerError(json.error ?? "Não foi possível enviar agora. Tente de novo.");
      return;
    }
    setFlyLetter(true);
    setSent(true);
    reset();
  };

  const rawIg = contact?.instagram?.trim() ?? "";
  const igUrl = rawIg.startsWith("http")
    ? rawIg
    : rawIg
      ? `https://instagram.com/${rawIg.replace(/^@/, "")}`
      : null;
  const igLabel = rawIg
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/\/$/, "")
    .replace(/^@/, "");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <Y2KBreadcrumbs
        className="mb-6"
        items={[
          { label: "Sala", href: "/" },
          { label: "Cartinha Digital" },
        ]}
      />

      <header className="mb-10 text-center">
        <h1 className="font-[family-name:var(--font-fredoka)] text-4xl text-pink-2000 md:text-5xl">Cartinha Digital</h1>
        <p className="mt-2 font-[family-name:var(--font-vt323)] text-night-purple/80">Escreva com carinho — eu leio tudo ✉️</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(240px,320px)] lg:items-start">
        <motion.div
          layout
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 border-pink-2000/25 bg-[#fffef8] shadow-[6px_6px_0_rgba(255,105,180,0.2)]",
            "bg-[linear-gradient(transparent_31px,#e8b4dc22_31px)]",
            "bg-[length:100%_32px]"
          )}
        >
          <AnimatePresence>
            {flyLetter && (
              <motion.div
                key="fly"
                initial={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                animate={{ opacity: 0, y: -240, scale: 0.45, rotate: -10 }}
                transition={{ duration: 1.35, ease: "easeIn" }}
                onAnimationComplete={() => setFlyLetter(false)}
                className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-6xl"
              >
                ✉️
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4 p-6 md:p-8">
            <div className="mb-2 flex items-center gap-2 font-[family-name:var(--font-caveat)] text-2xl text-night-purple">
              <Mail className="h-6 w-6 text-pink-2000" />
              <span>Querida estilista,</span>
            </div>

            <div>
              <label className="font-[family-name:var(--font-vt323)] text-sm text-night-purple">Nome</label>
              <input
                {...register("name")}
                className="mt-1 w-full border-b-2 border-pink-2000/30 bg-transparent px-1 py-2 font-[family-name:var(--font-inter)] outline-none focus:border-pink-2000"
                placeholder="Seu nome fofo"
                autoComplete="name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="font-[family-name:var(--font-vt323)] text-sm text-night-purple">Email</label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 w-full border-b-2 border-pink-2000/30 bg-transparent px-1 py-2 font-[family-name:var(--font-inter)] outline-none focus:border-pink-2000"
                placeholder="voce@email.com"
                autoComplete="email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="font-[family-name:var(--font-vt323)] text-sm text-night-purple">Assunto</label>
              <input
                {...register("subject")}
                className="mt-1 w-full border-b-2 border-pink-2000/30 bg-transparent px-1 py-2 font-[family-name:var(--font-inter)] outline-none focus:border-pink-2000"
                placeholder="Sobre um projeto..."
              />
              {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="font-[family-name:var(--font-vt323)] text-sm text-night-purple">Mensagem</label>
              <textarea
                {...register("message")}
                rows={6}
                className="mt-1 w-full resize-y border-2 border-dashed border-pink-2000/25 bg-white/40 px-2 py-2 font-[family-name:var(--font-inter)] outline-none focus:border-pink-2000"
                placeholder="Linhas para o coração..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
            </div>

            {serverError && <p className="font-[family-name:var(--font-vt323)] text-red-600">{serverError}</p>}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <GlossyButton type="submit" size="lg" hasSparkle isLoading={isSubmitting} disabled={isSubmitting}>
                <Send className="h-5 w-5" />
                Enviar cartinha
              </GlossyButton>
              {sent && (
                <GlossyButton type="button" variant="outline" size="sm" onClick={() => setSent(false)}>
                  Nova cartinha
                </GlossyButton>
              )}
            </div>
          </form>

          <AnimatePresence>
            {sent && (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border-t-2 border-pink-2000/20 bg-pink-2000/10 p-4 text-center font-[family-name:var(--font-fredoka)] text-pink-2000"
              >
                Cartinha a caminho! ✨ Obrigada pelo carinho.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <aside className="flex flex-col items-center gap-4">
          <PolaroidFrame
            src={polaroidSrc ?? "/placeholder-y2k.svg"}
            alt={polaroidAlt ?? "Contato"}
            caption={contact?.email ? "Me chama!" : "Portfolio"}
            size="md"
            rotation={4}
            priority={false}
            blurPlaceholder={Boolean(polaroidSrc?.startsWith("http"))}
            sizes="(max-width:1024px) 70vw, 280px"
          />

          <div className="w-full max-w-xs rounded-xl border-2 border-night-purple/10 bg-white/90 p-4 font-[family-name:var(--font-vt323)] text-night-purple shadow-sm">
            {contact?.email && (
              <p className="mb-2 break-all">
                <span className="text-pink-2000">Email:</span> {contact.email}
              </p>
            )}
            {igLabel && (
              <p>
                <span className="text-pink-2000">IG:</span>{" "}
                {igUrl ? (
                  <a href={igUrl} className="underline hover:text-pink-2000" target="_blank" rel="noreferrer">
                    @{igLabel.replace(/^@/u, "")}
                  </a>
                ) : (
                  `@${igLabel.replace(/^@/u, "")}`
                )}
              </p>
            )}
            {contact?.responseTime && (
              <p className="mt-2 text-sm opacity-80">⏱ {contact.responseTime}</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
