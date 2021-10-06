import { writable } from "svelte/store";

export const resize = writable({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const scale = writable(1);

export const offset = writable({ x: 100, y: 100 });

let isMouseDown = false;

const handleWheelEvent = (event) => {
  if (event.wheelDelta > 0) {
    scale.update((scaleNumber) => {
      return scaleNumber * 2;
    });
  } else {
    scale.update((scaleNumber) => {
      return scaleNumber / 2;
    });
  }
};

const handleResizeEvent = (event) => {
  resize.set({ height: window.innerHeight, width: window.innerWidth });
};

const handleMousedownEvent = (event) => {
  isMouseDown = true;
};

const handleMouseupEvent = (event) => {
  isMouseDown = false;
};

const handleMousemoveEvent = (event) => {
  if (isMouseDown) {
    offset.update((offsetPoint) => { return {x: offsetPoint.x + event.movementX , y: offsetPoint.y + event.movementY })
  }
};

export const attachEvents = () => {
  window.addEventListener("wheel", handleWheelEvent);
  window.addEventListener("resize", handleResizeEvent);
  window.addEventListener("mousedown", handleMousedownEvent);
  window.addEventListener("mouseup", handleMouseupEvent);
  window.addEventListener("mousemove", handleMousemoveEvent);
};
