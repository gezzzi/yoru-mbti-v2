import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "著者",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "名前",
      type: "string",
      validation: (rule) => rule.required().error("名前は必須です"),
    }),
    defineField({
      name: "role",
      title: "役割・肩書き",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "プロフィール画像",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "紹介文",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "avatar",
    },
  },
});
