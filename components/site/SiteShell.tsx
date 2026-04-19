"use client";

import { usePathname } from "next/navigation";
import { Home, Shirt, User, Mail } from "lucide-react";
import { NavigationDock, MobileDock } from "@/components/ui/NavigationDock";
import { SiteExperienceBar } from "@/components/interactive/SiteExperienceBar";
import { cn } from "@/lib/utils";

function activeForPath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  const items = [
    { id: "home", label: "Sala", href: "/", icon: <Home className="w-5 h-5" />, isActive: activeForPath(pathname, "/") },
    {
      id: "projetos",
      label: "Closet",
      href: "/projetos",
      icon: <Shirt className="w-5 h-5" />,
      isActive: activeForPath(pathname, "/projetos"),
    },
    { id: "sobre", label: "Perfil", href: "/sobre", icon: <User className="w-5 h-5" />, isActive: activeForPath(pathname, "/sobre") },
    {
      id: "contato",
      label: "Cartinha",
      href: "/contato",
      icon: <Mail className="w-5 h-5" />,
      isActive: activeForPath(pathname, "/contato"),
    },
  ];

  if (isStudio) {
    return <main id="conteudo-principal">{children}</main>;
  }

  return (
    <>
      <SiteExperienceBar />
      <main id="conteudo-principal" tabIndex={-1} className={cn("flex flex-1 flex-col min-h-0 outline-none", "pb-28 md:pb-32")}>
        {children}
      </main>
      <div className="hidden md:block">
        <NavigationDock items={items} position="bottom" variant="floating" />
      </div>
      <div className="md:hidden">
        <MobileDock items={items} />
      </div>
    </>
  );
}
