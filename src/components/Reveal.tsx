import { useRef, useEffect, useState, type ReactNode } from "react";

type AnimationVariant =
  | "fade-up"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "scale-in";

interface RevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  margin?: string;
  className?: string;
  as?: "div" | "span";
}

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  margin = "-60px",
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant}${visible ? " reveal-visible" : ""}${className ? " " + className : ""}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
