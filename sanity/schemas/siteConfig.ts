import { defineType, defineField } from "sanity";

export const siteConfig = defineType({
  name: "siteConfig",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Título do Site",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(60),
      initialValue: "Portfólio Y2K | Fashion Designer",
    }),
    defineField({
      name: "tagline",
      title: "Tagline/Slogan",
      type: "string",
      description: "Frase curta que aparece no header",
      initialValue: "Meu Closet Virtual, Meu Mundo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Descrição (SEO)",
      type: "text",
      rows: 3,
      description: "Descrição para motores de busca (max 160 caracteres)",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "footerText",
      title: "Texto do Footer",
      type: "string",
      description: "Mensagem que aparece no rodapé",
      initialValue: "Feito com 💖 e muito glitter",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: {
        accept: "image/png,image/x-icon,image/svg+xml",
      },
    }),
    defineField({
      name: "ogImage",
      title: "Imagem Open Graph (Social Share)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Imagem que aparece quando o site é compartilhado (1200x630px recomendado)",
    }),
    defineField({
      name: "themeColors",
      title: "Cores do Tema Y2K",
      type: "object",
      fields: [
        defineField({
          name: "primary",
          title: "Cor Primária (Pink 2000)",
          type: "color",
          options: {
            disableAlpha: true,
          },
        }),
        defineField({
          name: "secondary",
          title: "Cor Secundária (Glitter Pink)",
          type: "color",
          options: {
            disableAlpha: true,
          },
        }),
        defineField({
          name: "accent",
          title: "Cor de Destaque (Flash Photo)",
          type: "color",
          options: {
            disableAlpha: true,
          },
        }),
      ],
    }),
    defineField({
      name: "features",
      title: "Funcionalidades Ativas",
      type: "object",
      fields: [
        defineField({
          name: "enableSounds",
          title: "Sons de Interação",
          type: "boolean",
          initialValue: false,
          description: "Efeitos sonoros nos cliques (toggle pelo usuário)",
        }),
        defineField({
          name: "enableCustomCursor",
          title: "Cursor Personalizado",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "showFavorites",
          title: "Mostrar Sistema de Favoritos",
          type: "boolean",
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: "analytics",
      title: "Analytics",
      type: "object",
      fields: [
        defineField({
          name: "googleAnalyticsId",
          title: "Google Analytics ID",
          type: "string",
          description: "GA-XXXXXXXXX",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "siteTitle",
      subtitle: "tagline",
    },
  },
});
