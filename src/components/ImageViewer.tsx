"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Expand } from "lucide-react";
import { Media } from "./Media";
const Lightbox = dynamic(() => import("./Lightbox"));
export function ImageViewer({ id, caption }: { id: string; caption: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="product-visual"
        onClick={() => setOpen(true)}
        aria-label={`View ${caption}`}
      >
        <Media
          id={id}
          alt={caption}
          priority
          contain
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <span className="visual-expand">
          View illustration
          <Expand size={15} />
        </span>
      </button>
      {open && (
        <Lightbox
          images={[{ id, caption }]}
          initialIndex={0}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
