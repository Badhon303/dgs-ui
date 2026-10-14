import { asset } from "@/lib/media";

export function Media({
  id,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  contain = false,
}: {
  id: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  contain?: boolean;
}) {
  const a = asset(id);
  return (
    <div
      className={`media ${contain ? "contain" : ""} ${className}`}
      style={{ backgroundImage: `url("${a.placeholder}")` }}
    >
      {/* A build-time responsive pipeline supports both Next and static hosting. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={a.variants.find((v) => v.width >= 720)?.path || a.optimizedPath}
        srcSet={a.variants.map((v) => `${v.path} ${v.width}w`).join(", ")}
        sizes={sizes}
        width={a.width}
        height={a.height}
        alt={alt ?? a.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={{ objectPosition: a.focalPoint }}
      />
    </div>
  );
}
