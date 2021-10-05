import { writable } from "svelte/store";

export const resize = writable({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const scale = writable(1);

const handleWheelEvent = (event) => {
  if (event.wheelDelta > 0) {
    scale.update((scaleNumber) => {
      return scaleNumber * 2;
    });
  } else {
    scale.update((scaleNumber) => {
      return scaleNumber / 2;
    });
  };
};

const handleResizeEvent = (event) => {
  resize.set({ height: window.innerHeight, width: window.innerWidth });
};

const handleMousedownEvent = (event) => {
  // console.log(event);
};

const handleMouseupEvent = (event) => {
  // console.log(event);
};

const handleMousemoveEvent = (event) => {
  // console.log(event);
};

export const attachEvents = () => {
  window.addEventListener("wheel", handleWheelEvent);
  window.addEventListener("resize", handleResizeEvent);
  window.addEventListener("mousedown", handleMousedownEvent);
  window.addEventListener("mouseup", handleMouseupEvent);
  window.addEventListener("mousemove", handleMousemoveEvent);
};
