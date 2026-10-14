"use client";
import { useEffect, useRef } from "react";
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let visible = false;
    const update = () => {
      if (ref.current)
        ref.current.style.animationPlayState =
          visible && !document.hidden ? "running" : "paused";
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    if (ref.current) observer.observe(ref.current);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div className="statement-marquee" aria-hidden="true">
      <div ref={ref}>
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i}>
            MORE LIGHT. <i>MORE POSSIBILITY.</i>
            <span className="marquee-star">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
