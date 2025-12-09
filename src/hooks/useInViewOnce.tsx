// hooks/useInViewOnce.ts
import { useEffect, useRef, useState } from 'react';

export function useInViewOnce(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // 한 번 애니메이션 된 이후로는 다시 관찰 안 해도 됨
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // 20% 정도 보이면 발동
        ...options,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, inView };
}
