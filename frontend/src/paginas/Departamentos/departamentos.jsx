import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Home/home.css";
import Bar from "../Bar/Bar";
import aerodinamica from "../Imagenes/Aerodinamica.png";
import grupomotor from "../Imagenes/GrupoMotor.png";

const DeptoCarousel = () => {
  const [items] = useState([
    { id: 1, background: aerodinamica, name: "Aerodinámica",  description: "Diseñamos piezas que generan carga, reducen la resistencia al aire, enfrían componentes y aseguran la estabilidad del vehículo", route: "/Departamentos/Aerodinamica"},
    { id: 2, background: grupomotor, name: "Grupo Motor", description: "Nos encargamos de desarrollar y optimizar los motores, asegurando su rendimiento máximo, eficiencia de combustible y fiabilidad en la pista." , route: "/Departamentos/GrupoMotor" },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoScrollInterval = 10000;

  useEffect(() => {
    const timer = setInterval(handleNext, autoScrollInterval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, autoScrollInterval / 100);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setProgress(0);
  };

  return (
    <div className="todoHome">
      <div className="carousel-container">
        <Bar />
        <div className="carousel-slide">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            >
              <img
                src={item.background}
                alt={item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="carousel-content">
                <h2>{item.name}</h2>
                <p className="carousel-description">{item.description}</p>
                <Link to={item.route} className="carousel-link">
                  Entrar
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-navigation">
          <button onClick={handlePrev} className="nav-button left">&#x276E;</button>
          <button onClick={handleNext} className="nav-button right">&#x276F;</button>
        </div>

        <div className="progress-bar-group">
          {items.map((_, index) => {
            const isActive = index === activeIndex;
            const barWidth = isActive ? `${progress}%` : index < activeIndex ? "100%" : "0%";
            return (
              <div key={index} className={`progress-bar ${isActive ? "active" : ""}`}>
                <div
                  className="progress"
                  style={{ width: barWidth }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeptoCarousel;