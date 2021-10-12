import { writable } from "svelte/store";

export const resize = writable({
  height: window.innerHeight - 40,
  width: window.innerWidth ,
});

export const scale = writable(0.2);

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

export const resetResize = () => {
  resize.set({ height: window.innerHeight - 40, width: window.innerWidth });
}

const handleResizeEvent = (event) => {
  resetResize()
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

export const detachEvents = () => {
  window.removeEventListener("wheel", handleWheelEvent );
  window.removeEventListener("resize", handleResizeEvent );
  window.removeEventListener("mousedown", handleMousedownEvent);
  window.removeEventListener("mouseup", handleMouseupEvent);
  window.removeEventListener("mousemove", handleMousemoveEvent);
};