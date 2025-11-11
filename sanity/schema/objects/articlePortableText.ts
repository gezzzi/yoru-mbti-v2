import { defineArrayMember, defineType } from "sanity";

export default defineType({
  name: "articlePortableText",
  title: "本文",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      marks: {
        decorators: [
          { title: "太字", value: "strong" },
          { title: "斜体", value: "em" },
          { title: "コード", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "リンク",
            fields: [
              { name: "href", type: "url", title: "URL" },
              { name: "openInNewTab", type: "boolean", title: "別タブで開く", initialValue: true },
            ],
          },
        ],
      },
      styles: [
        { title: "通常", value: "normal" },
        { title: "見出し 2", value: "h2" },
        { title: "見出し 3", value: "h3" },
        { title: "引用", value: "blockquote" },
      ],
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
