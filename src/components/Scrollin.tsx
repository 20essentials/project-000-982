import { useEffect, useRef } from "react";
import "@/styles/Scrollin.css";
import { withBase } from "@/utils/functionsTs";
import { useScrollinStore } from "@/store/useScrollinStore";

export function Scrollin() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const {
    isDown,
    startX,
    scrollLeft,
    setIsDown,
    setStartX,
    setScrollLeft,
  } = useScrollinStore();

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDown(true);
      slider.classList.add("active");
      setStartX(e.pageX - slider.offsetLeft);
      setScrollLeft(slider.scrollLeft);
    };

    const handleMouseLeave = () => {
      setIsDown(false);
      slider.classList.remove("active");
    };

    const handleMouseUp = () => {
      setIsDown(false);
      slider.classList.remove("active");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDown, startX, scrollLeft, setIsDown, setStartX, setScrollLeft]);

  const items = Array.from({ length: 25 }, (_, i) => (
    <div key={i} className={`item item${i + 1}`}>
      <img draggable="false" src={withBase(`assets/u${i + 1}.avif`)} alt="Image" />
    </div>
  ));

  return (
    <div className="items" ref={sliderRef}>
      {items}
    </div>
  );
}
