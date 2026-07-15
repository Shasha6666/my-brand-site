interface Props {
  bv: string;
  title?: string;
}

export function BilibiliVideo({ bv, title }: Props) {
  return (
    <div className="my-6">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={`https://player.bilibili.com/player.html?bvid=${bv}&high_quality=1&autoplay=0`}
          title={title ?? "B 站视频"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-lg"
        />
      </div>
      {title && (
        <p className="mt-2 text-center text-xs text-muted-foreground">{title}</p>
      )}
    </div>
  );
}
