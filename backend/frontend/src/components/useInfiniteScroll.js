import { useEffect } from "react";

export default function useInfiniteScroll(
  scrollRef,
  setPage,
  isLoading,
  hasNextPage
) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0 && !isLoading && hasNextPage) {
          setPage((prevPage) => {
            return prevPage + 1;
          });
        }
      });
    });

    if (scrollRef?.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef?.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, [scrollRef, setPage, isLoading, hasNextPage]);
}
