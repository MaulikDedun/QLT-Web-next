import Image from "next/image";
import type { EditorialPost } from "@/lib/site-data";

type EditorialPostCardProps = {
  post: EditorialPost;
  onOpen: (post: EditorialPost) => void;
};

export function EditorialPostCard({ post, onOpen }: EditorialPostCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-6 backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1"
      onClick={() => onOpen(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(post);
      }}
      aria-label={`Open post: ${post.title}`}
    >
      <div className="relative h-44 w-full overflow-hidden rounded-2xl">
        <Image
          src={post.coverImageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/70">{post.category}</span>
        <span className="text-xs text-black/50">{post.readTimeMinutes} min read</span>
      </div>

      <h3 className="mt-3 text-2xl leading-tight">{post.title}</h3>
      <p className="mt-3 text-sm text-black/60">{post.excerpt}</p>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full border border-black/10 bg-white/40 px-2.5 py-1 text-xs text-black/60">
              {tag}
            </span>
          ))}
        </div>
        <button
          className="magnetic flex items-center gap-2 rounded-full border border-black/15 bg-white/80 px-4 py-2 text-sm transition-colors group-hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(post);
          }}
          data-cursor="Read"
          data-magnetic
        >
          Read <span aria-hidden>→</span>
        </button>
      </div>

      {/* Keep a semantic link for accessibility/SEO; modal is the primary interaction. */}
      <span className="sr-only">{post.title}</span>
    </article>
  );
}

