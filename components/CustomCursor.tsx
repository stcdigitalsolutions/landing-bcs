'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!cursor || !dot || !circle) return;

    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      circleX += (mouseX - circleX) * 0.08;
      circleY += (mouseY - circleY) * 0.08;
      circle.style.left = circleX + 'px';
      circle.style.top = circleY + 'px';
      rafId = requestAnimationFrame(animate);
    };

    animate();
    document.addEventListener('mousemove', onMouseMove);

    const addHover = () => cursor.classList.add('hover');
    const removeHover = () => cursor.classList.remove('hover');

    const attachHover = () => {
      document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };
    attachHover();

    const onDown = () => cursor.classList.add('click');
    const onUp = () => cursor.classList.remove('click');
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={circleRef} className="cursor-circle" />
    </div>
  );
}
