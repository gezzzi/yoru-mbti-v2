'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-serif text-purple-100 mb-6 mt-12 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-serif text-purple-100 mb-4 mt-10">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-serif text-purple-100 mb-3 mt-8">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-purple-100/70 leading-loose mb-6">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-purple-300 hover:text-purple-200 underline underline-offset-4 decoration-purple-500/50 hover:decoration-purple-400 transition-colors"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-6 text-purple-100/70">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-6 text-purple-100/70">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-purple-500/50 pl-6 py-2 my-6 italic text-purple-200/80 bg-purple-900/10 rounded-r-lg">
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-purple-900/30 text-purple-200 px-2 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          }
          return (
            <code className="block bg-[#1a0b2e] text-purple-200 p-4 rounded-lg overflow-x-auto font-mono text-sm">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="bg-[#1a0b2e] rounded-lg overflow-x-auto mb-6 border border-purple-500/20">
            {children}
          </pre>
        ),
        hr: () => (
          <hr className="border-purple-500/20 my-12" />
        ),
        strong: ({ children }) => (
          <strong className="text-white/90 font-semibold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-purple-200/90 italic">{children}</em>
        ),
        img: ({ src, alt }) => (
          <span className="block my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || ''}
              className="rounded-lg w-full shadow-lg shadow-purple-900/30"
            />
            {alt && (
              <span className="block text-center text-sm text-purple-400/60 mt-2 italic">
                {alt}
              </span>
            )}
          </span>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-purple-500/20">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-purple-500/20 bg-purple-900/20 px-4 py-2 text-left text-purple-200">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-purple-500/20 px-4 py-2 text-purple-100/70">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

