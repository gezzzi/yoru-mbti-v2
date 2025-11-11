import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { urlForImage } from "@/utils/sanityImage";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      const imageUrl = urlForImage(value)?.width(1600).quality(80).url();
      if (!imageUrl) return null;

      return (
        <figure className="my-10 overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
          {value.caption && (
            <figcaption className="px-4 py-2 text-center text-sm text-slate-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="text-base leading-relaxed text-slate-200">{children}</p>,
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-white">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-400/60 bg-purple-900/30 px-6 py-4 text-lg italic text-purple-100">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.openInNewTab ? "_blank" : undefined}
        rel="noreferrer"
        className="text-purple-200 underline underline-offset-4"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="text-purple-100">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-slate-900/80 px-1.5 py-0.5 text-sm text-amber-200">{children}</code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-slate-200">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-slate-200">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export function BlogPortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="space-y-6">
      <PortableText value={value} components={components} />
    </div>
  );
}
