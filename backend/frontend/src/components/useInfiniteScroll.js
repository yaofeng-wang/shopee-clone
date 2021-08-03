import { useCallback, useEffect } from "react";

export default function useInfiniteScroll(scrollRef, setPage, isLoading) {
  const scrollObserver = useCallback(
    (node) => {
      if (!node || isLoading) {
        return;
      }
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            setPage((prevPage) => {
              return prevPage + 1;
            });
          }
        });
      }).observe(node);
    },
    [setPage, isLoading]
  );

  useEffect(() => {
    if (scrollRef?.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
}
