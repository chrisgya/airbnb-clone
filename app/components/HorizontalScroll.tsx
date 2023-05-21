import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const scrollRefCopy = scrollRef;
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial scroll position
    }

    return () => {
      if (scrollRefCopy.current) {
        scrollRefCopy.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;

      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200; // Adjust scroll distance as needed
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200; // Adjust scroll distance as needed
    }
  };

  return (
    <div
      className={classNames("relative w-11/12", {
        "pl-10": showLeftButton,
        "pr-10": showRightButton,
      })}
    >
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </div>
      {showLeftButton && (
        <button
          className={classNames(
            "absolute top-8 bottom-0 left-0 z-10 flex items-center rounded-full h-7 w-7 border-[1px] justify-center bg-white text-black border-black/25",
            "shadow-gray-400 shadow-lg transition hover:shadow-gray-600",
            "focus:outline-none"
          )}
          onClick={handleScrollLeft}
        >
          <MdKeyboardArrowLeft size={20} />
        </button>
      )}
      {showRightButton && (
        <button
          className={classNames(
            "absolute top-8 bottom-0 right-0 z-10 flex items-center rounded-full h-7 w-7 border-[1px] justify-center bg-white text-black border-black/25",
            "shadow-gray-400 shadow-lg transition hover:shadow-gray-600",
            "focus:outline-none"
          )}
          onClick={handleScrollRight}
        >
          <MdKeyboardArrowRight size={20} />
        </button>
      )}
    </div>
  );
};

export default HorizontalScroll;
