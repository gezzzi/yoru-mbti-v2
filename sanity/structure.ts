import type { StructureResolver } from "sanity/desk";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .id("content-root")
    .title("コンテンツ")
    .items([
      S.listItem()
        .id("posts")
        .title("ブログ記事")
        .schemaType("post")
        .child(S.documentTypeList("post").title("ブログ記事")),
      S.listItem()
        .id("authors")
        .title("著者")
        .schemaType("author")
        .child(S.documentTypeList("author").title("著者")),
      S.listItem()
        .id("tags")
        .title("タグ")
        .schemaType("tag")
        .child(S.documentTypeList("tag").title("タグ")),
    ]);
