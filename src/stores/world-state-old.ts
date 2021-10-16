import { writable } from "svelte/store";

export const resize = writable({
  height: window.innerHeight - 40,
  width: window.innerWidth,
});

export const scale = writable(0.2);

export const offset = writable({ x: 100, y: 100 });

let isMouseDown = false;

const zoomCap = 10;
let zoom = 1;
let x = 0;
let y = 0;
let worldViewX = 0;
let worldViewY = 0;
let worldX = 0;
let worldY = 0;

const handleWheelEvent = (event) => {
  if (event.wheelDelta > 0) {
    if (zoom !== 1) {
      zoomTo(zoom - 1, x, y);
    }
  } else {
    if (zoom !== zoomCap) {
      zoomTo(zoom + 1, x, y);
    }
  }
};

const zoomTo = (newZoom, newX, newY) => {
  if (zoom === newZoom) {
    return;
  }
  let delta = newZoom - zoom;
  zoom = newZoom;
  worldViewX = worldViewX + newX * delta;
  worldViewY = worldViewY + newY * delta;
  scale.update((scaleNumber) => {
    return 1 / zoom;
  });
  offset.update((offsetPoint) => {
    return {
      x: worldViewX,
      y: worldViewY,
    };
  });
};

export const resetResize = () => {
  resize.set({ height: window.innerHeight - 40, width: window.innerWidth });
};

const handleResizeEvent = (event) => {
  resetResize();
};

const handleMousedownEvent = (event) => {
  isMouseDown = true;
};

const handleMouseupEvent = (event) => {
  isMouseDown = false;
};

const handleMousemoveEvent = (event) => {
  x = event.clientX;
  y = event.clientY;
  if (isMouseDown) {
    worldViewX = worldViewX + event.movementX * zoom;
    worldViewY = worldViewY + event.movementY * zoom;

    offset.update((offsetPoint) => {
      return {
        x: worldViewX,
        y: worldViewY,
      };
    });
  } else {
    worldX = 0 - worldViewX + x * zoom;
    worldY = 0 - worldViewY + y * zoom;
  }
};

const handleMousemoveEvent2 = (event) => {
  if (isMouseDown) {
    offset.update((offsetPoint) => {
      return {
        x: offsetPoint.x + event.movementX,
        y: offsetPoint.y + event.movementY,
      };
    });
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
  window.removeEventListener("wheel", handleWheelEvent);
  window.removeEventListener("resize", handleResizeEvent);
  window.removeEventListener("mousedown", handleMousedownEvent);
  window.removeEventListener("mouseup", handleMouseupEvent);
  window.removeEventListener("mousemove", handleMousemoveEvent);
};
