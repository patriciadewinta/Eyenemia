import React, { useEffect, useRef } from "react";

interface EyeProps {
  position: "left" | "right";
}

const Eye: React.FC<EyeProps> = ({ position }) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const eye = eyeRef.current;
      const pupil = pupilRef.current;

      if (eye && pupil) {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(
          event.clientY - eyeCenterY,
          event.clientX - eyeCenterX
        );

        const distance = Math.min(
          Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY) /
            15,
          10
        );

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={eyeRef}
      className={`eye ${position === "left" ? "eye-left" : "eye-right"}`}
    >
      <div className="eye-inner">
        <div ref={pupilRef} className="pupil">
          <div className="pupil-inner">
            <div className="pupil-highlight"></div>
            <div className="pupil-reflection"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EyeIllustration: React.FC = () => {
  return (
    <div className="eyes-container flex space-x-8">
      <Eye position="left" />
      <Eye position="right" />
    </div>
  );
};

export default EyeIllustration;
