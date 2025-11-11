import { defineField, defineType } from "sanity";

export default defineType({
  name: "tag",
  title: "タグ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タグ名",
      type: "string",
      validation: (rule) => rule.required().error("タグ名は必須です"),
    }),
    defineField({
      name: "slug",
      title: "スラッグ",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required().error("スラッグは必須です"),
    }),
    defineField({
      name: "description",
      title: "説明",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
