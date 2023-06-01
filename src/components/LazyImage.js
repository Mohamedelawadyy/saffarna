import React, { useEffect, useRef, useState } from "react";

function LazyImage({
  placeholderSrc,
  placeholderStyle,
  placeholderClassName,
  className,
  src,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const placeholderRef = useRef(null);
  const [view, setView] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setView(src);
        observer.unobserve(placeholderRef.current);
      }
    });
    if (placeholderRef && placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }
  }, []);
  return (
    <>
      {isLoading && (
        <img
          src={placeholderSrc}
          alt=""
          style={placeholderStyle}
          className={placeholderClassName}
          ref={placeholderRef}
        />
      )}
      <img
        src={view}
        alt={view}
        onLoad={() => setIsLoading(false)}
        className={isLoading ? "hidden" : className}
      />
    </>
  );
}
export default LazyImage;
