import { writable } from "svelte/store";

export const resize = writable({height: window.innerHeight , width: window.innerWidth});


const handleWheelEvent = (event) => {
  console.log(event);
};

const handleResizeEvent = (event) => {
  resize.set({height: window.innerHeight , width: window.innerWidth})
};

const handleMousedownEvent = (event) => {
  console.log(event);
};

const handleMouseupEvent = (event) => {
  console.log(event);
};

const handleMousemoveEvent = (event) => {
  console.log(event);
};

export const attachEvents = () => {
  window.addEventListener("wheel", handleWheelEvent);
  window.addEventListener("resize", handleResizeEvent);
  window.addEventListener("mousedown", handleMousedownEvent);
  window.addEventListener("mouseup", handleMouseupEvent);
  window.addEventListener("mousemove", handleMousemoveEvent);
};
