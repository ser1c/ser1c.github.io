export default function BlogListCard({ post }) {
  const publishDate = new Date(post.data.date);

  return (
    <li className="opacity-0 translate-y-4 transition-all duration-500 group" data-blog-item>
      <a href={`/blog/${post.slug}`} className="block p-4 -mx-4 rounded-lg hover:bg-mountain-50/50 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-bold text-size-0 text-zinc-800 group-hover:text-dhaka-red transition-colors">
            {post.data.title}
          </h2>
          
          <div className="flex items-center gap-2 text-zinc-500 mt-2 text-size--1">
            <time dateTime={post.data.date}>
              {publishDate.toLocaleDateString("en-US", { 
                year: "numeric", 
                month: "long",
                day: "numeric"
              })}
            </time>
            {post.data.author && (
              <>
                <span>•</span>
                <span>{post.data.author[0]?.name || "Sabin Subedi"}</span>
              </>
            )}
          </div>
          
          {post.data.description && (
            <p className="mt-2 text-size--1 text-mountain-600 line-clamp-2">
              {post.data.description}
            </p>
          )}
        </div>
        
        <div className="absolute left-0 top-0 w-1 h-0 bg-dhaka-red transition-all duration-300 group-hover:h-full"></div>
      </a>
    </li>
  );
}
