import { useEffect, useState, type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

/**
 * Lifts its children into place the first time they scroll into view.
 * `index` staggers a row or grid so cards arrive one after another.
 */
export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("-8% 0px");

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${Math.min(index, 6) * 90}ms` }}
    >
      {children}
    </div>
  );
}

/** Counts up once in view. Reduced motion and no-JS land on the final number. */
export function CountUp({ to, className = "" }: { to: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>("-8% 0px");
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let frame = requestAnimationFrame(function step(now: number) {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
