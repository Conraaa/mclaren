import React, { useState } from "react";
import "./departamento.css";
import aerodinamica from '../Imagenes/Oscar.png';
import GrupoMotor from '../Imagenes/Oscar.png';
import Chasis from '../Imagenes/OscarLando.png';
import Durabilidad from '../Imagenes/OscarLando2.png';
import Bar from "../Bar/Bar";


const Carousel = () => {
  const [items, setItems] = useState([
    { id: 1, background: aerodinamica, name: "Aerodinamica", description: "A beautiful country with breathtaking landscapes." },
    { id: 2, background: GrupoMotor, name: "Grupo Motor", description: "The land of a thousand lakes." },
    { id: 3, background: Chasis, name: "Chasis", description: "Home to glaciers and geysers." },
    { id: 4, background: Durabilidad, name: "Durabilidad", description: "A land of diverse wildlife and culture." },
    { id: 5, background: "https://i.ibb.co/jTQfmTq/img5.jpg", name: "Netherlands", description: "Famous for its tulip fields and windmills." }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="todo">
      <Bar />
      <div className="container">
        <div className="text-container">
          <div className="name">{items[activeIndex].name}</div>
          <div className="des">{items[activeIndex].description}</div>
          <button>See More</button>
        </div>
        <div className="slide-container">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`item ${index === activeIndex ? "active" : ""}`}
              style={{
                backgroundImage: `url(${item.background})`,
                transform: `translate(${(index - activeIndex) * 200}px, -50%)`,
                opacity: index === activeIndex ? 1 : 0.5
              }}
            ></div>
          ))}
        </div>
        <div className="button">
          <button className="prev" onClick={handlePrev}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="next" onClick={handleNext}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Carousel;
