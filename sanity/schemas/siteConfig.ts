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
      initialValue: "Karina Reis",
    }),
    defineField({
      name: "brandName",
      title: "Marca",
      type: "string",
      description: "Nome exibido na splash e no header quando não há arte",
      validation: (Rule) => Rule.required().min(2).max(80),
      initialValue: "Karina Reis",
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
      name: "splashLogo",
      title: "Arte da Marca",
      type: "image",
      description: "Imagem ou GIF exibido na splash e no header no lugar do texto",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "backgroundImage",
      title: "Imagem de Fundo (Home/Menu)",
      type: "image",
      description:
        "Fundo decorativo da splash e do menu (mesmo modelo visual das categorias). Sem texto alternativo por ser decorativa.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "ctaLabel",
      title: "Label do CTA (Splash)",
      type: "string",
      description: 'Texto do botão principal (default "ABRIR")',
      initialValue: "ABRIR",
      validation: (Rule) => Rule.required().min(1).max(40),
    }),
    defineField({
      name: "socialLinks",
      title: "Links Sociais",
      type: "object",
      fields: [
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
        }),
        defineField({
          name: "email",
          title: "E-mail",
          type: "string",
          description: "Endereço de e-mail (mailto)",
          validation: (Rule) =>
            Rule.email().error("Informe um e-mail válido"),
        }),
      ],
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
  ],
  preview: {
    select: {
      title: "siteTitle",
      subtitle: "brandName",
    },
  },
});
