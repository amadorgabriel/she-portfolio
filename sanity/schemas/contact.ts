import { defineType, defineField } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contato",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email Principal",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      description: "URL completa do perfil do Instagram",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      description: "URL completa do perfil do LinkedIn",
    }),
    defineField({
      name: "behance",
      title: "Behance",
      type: "url",
      description: "URL completa do perfil do Behance",
    }),
    defineField({
      name: "pinterest",
      title: "Pinterest",
      type: "url",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      description: "Número completo com DDD (ex: 5511999999999)",
    }),
    defineField({
      name: "location",
      title: "Localização",
      type: "string",
      description: "Cidade/Estado ou 'Remoto'",
    }),
    defineField({
      name: "availability",
      title: "Disponibilidade",
      type: "string",
      options: {
        list: [
          { title: "Disponível para projetos", value: "available" },
          { title: "Ocupado (lista de espera)", value: "busy" },
          { title: "Não disponível", value: "unavailable" },
        ],
      },
      initialValue: "available",
    }),
    defineField({
      name: "responseTime",
      title: "Tempo de Resposta",
      type: "string",
      description: "Ex: 'Respondo em até 24h'",
      initialValue: "Respondo em até 24 horas",
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "availability",
    },
    prepare({ title, subtitle }) {
      const availabilityMap: Record<string, string> = {
        available: "Disponível",
        busy: "Ocupado",
        unavailable: "Não disponível",
      };
      return {
        title: title || "Contato",
        subtitle: availabilityMap[subtitle as string] || subtitle,
      };
    },
  },
});
