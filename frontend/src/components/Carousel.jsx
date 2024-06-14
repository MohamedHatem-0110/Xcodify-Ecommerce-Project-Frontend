import React, { useEffect, useState } from "react";

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const totalItems = images.length;

  const moveToIndex = (newIndex) => {
    setIndex((newIndex + totalItems) % totalItems);
  };

  const prevSlide = () => {
    moveToIndex(index - 1);
  };

  const nextSlide = () => {
    moveToIndex(index + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [index]); // Trigger effect when index changes

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex h-full md:min-h-72">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="w-full flex-none bg-white carousel"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: "transform 1s ease",
              }}
            >
              <img
                src={image}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center -ml-5 opacity-50 hover:opacity-100 transition-opacity duration-300"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white rounded-full w-10 h-10 flex items-center justify-center -mr-5 opacity-50 hover:opacity-100 transition-opacity duration-300"
        onClick={nextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
