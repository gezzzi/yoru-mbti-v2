import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "ブログ記事",
  type: "document",
  groups: [
    { name: "content", title: "本文" },
    { name: "meta", title: "メタ情報" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().error("タイトルは必須です"),
    }),
    defineField({
      name: "slug",
      title: "スラッグ",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      group: "content",
      validation: (rule) => rule.required().error("スラッグは必須です"),
    }),
    defineField({
      name: "publishedAt",
      title: "公開日時",
      type: "datetime",
      group: "meta",
      validation: (rule) => rule.required().error("公開日時は必須です"),
    }),
    defineField({
      name: "author",
      title: "著者",
      type: "reference",
      to: [{ type: "author" }],
      group: "meta",
      validation: (rule) => rule.required().error("著者は必須です"),
    }),
    defineField({
      name: "tags",
      title: "タグ",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      group: "meta",
    }),
    defineField({
      name: "thumbnail",
      title: "サムネイル画像",
      type: "image",
      options: { hotspot: true },
      group: "meta",
      validation: (rule) => rule.required().error("サムネイルは必須です"),
    }),
    defineField({
      name: "excerpt",
      title: "リード文",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "content",
      title: "本文",
      type: "articlePortableText",
      group: "content",
      validation: (rule) => rule.required().error("本文は必須です"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author.name",
      media: "thumbnail",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        ...selection,
        subtitle: subtitle ? `by ${subtitle}` : "",
      };
    },
  },
  orderings: [
    {
      title: "公開が新しい順",
      name: "publishDateDesc",
      by: [
        { field: "publishedAt", direction: "desc" },
      ],
    },
  ],
});
