import { useState, useEffect } from "react";
import "./Carousel.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Check out our promotions of this month !",
  },
  {
    image:
      "https://images.unsplash.com/photo-1663245482988-22fad02654e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Go to our newest phone arrivals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Everything you need for your home office",
  },
];

export const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  useEffect(() => {
    timeOut =
      autoPlay &&
      setTimeout(() => {
        slideRight();
      }, 8000);
  });

  const slideRight = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1); //increment current state
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };
  console.log("clg carousel", current);

  return (
    <>
      <div
        className="carousel"
        onMouseEnter={() => {
          setAutoPlay(false);
          clearTimeout(timeOut);
        }}
        onMouseLeave={() => {
          setAutoPlay(true);
        }}
      >
        <div className="carousel-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={
                index === current
                  ? "carousel-card carousel-card-active"
                  : "carousel-card"
              }
            >
              <img
                className="card-image"
                src={slide.image}
                alt={slide.caption}
              />
              <div className="card-overlay">
                <h2 className="slide-caption">{slide.caption}</h2>
              </div>
            </div>
          ))}
          <div className="carousel-arrow-left" onClick={slideLeft}>
            &lsaquo;
          </div>
          <div className="carousel-arrow-right" onClick={slideRight}>
            &rsaquo;
          </div>

          <div className="carousel-pagination">
            {slides.map((_, index) => (
              <div
                key={index}
                className={
                  index === current
                    ? "pagination-dot pagination-dot-active"
                    : "pagination-dot"
                }
                onClick={() => setCurrent(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
