import { useRef, useState, ReactNode, useCallback } from "react";

interface SlideUpOnViewProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function SlideUpOnView({
  children,
  delay = 0,
  className = "",
}: SlideUpOnViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setObservedNode = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => setIsVisible(true), delay);
              } else {
                setIsVisible(false);
              }
            });
          },
          { threshold: 0.1 }
        );
        observerRef.current.observe(node);
      }
    },
    [delay]
  );

  return (
    <div
      ref={setObservedNode}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
