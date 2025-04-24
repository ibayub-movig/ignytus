export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article className="prose prose-lg dark:prose-invert">
        {children}
      </article>
    </div>
  );
}