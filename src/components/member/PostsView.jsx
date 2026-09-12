export default function PostsView({ posts }) {
  return (
    <div className="mt-6 grid gap-4">
      {posts.map((post, i) => (
        <div
          key={`${post.club}-${i}`}
          className="rounded-panel border border-ink/12 bg-white p-6 sm:p-7"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-heading text-sm font-extrabold text-paper">
              {post.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-heading text-base font-extrabold">{post.clubName}</div>
              <div className="text-[13px] text-ink/55">{post.when}</div>
            </div>
          </div>
          <h3 className="mb-2 mt-4.5 font-heading text-[21px] font-extrabold">{post.title}</h3>
          <p className="m-0 text-[15px] leading-[1.65] text-ink/75">{post.text}</p>
          <div className="mt-4.5 flex gap-4.5 text-sm text-ink/60">
            <span>{post.likes}</span>
            <span>{post.comments}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
