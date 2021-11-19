import { writable, get } from "svelte/store";

export const resize = writable({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const scale = writable(0.2);

export const zoom = writable(3);

export const offset = writable({ x: 0, y: 0 });

export const cursor = writable({ x: 0, y: 0 });

export const clicked = writable({ x: 0, y: 0 });

export const settings = writable({
  showProvinces: true,
  showProvinceInfo: true,
  showRealms: true,
  showRealmInfo: true,
  shadowBlur: true,
});

export const selection = writable(null);

export const resetResize = () => {
  resize.set({ height: window.innerHeight, width: window.innerWidth });
};

let isMouseDown = false;
let isMouseDownMove = false;

export const zoomIn = () => {
  privateZoomIn(window.innerWidth / 2, window.innerHeight / 2);
};

export const zoomOut = () => {
  privateZoomOut(window.innerWidth / 2, window.innerHeight / 2);
};

const handleWheelEvent = (event) => {
  if (event.wheelDelta > 0) {
    privateZoomIn(event.clientX, event.clientY);
  } else {
    privateZoomOut(event.clientX, event.clientY);
  }
};

const zoomValue = () => {
  return get(zoom);
};

const scaleIncrement = 2;
const zoomCap = 8;

const privateZoomIn = (x, y) => {
  if (zoomValue() === zoomCap) {
    return;
  }

  zoom.update((zoomNumber) => {
    return zoomNumber + 1;
  });

  scale.update((scaleNumber) => {
    return scaleNumber * scaleIncrement;
  });
  offset.update((offset) => {
    return {
      x: scaleIncrement * offset.x - x,
      y: scaleIncrement * offset.y - y,
    };
  });
};

const privateZoomOut = (x, y) => {
  if (zoomValue() === 1) {
    return;
  }

  zoom.update((zoomNumber) => {
    return zoomNumber - 1;
  });
  scale.update((scaleNumber) => {
    return scaleNumber / scaleIncrement;
  });
  offset.update((offset) => {
    return {
      x: (offset.x + x) / scaleIncrement,
      y: (offset.y + y) / scaleIncrement,
    };
  });
};

const handleResizeEvent = (event) => {
  resetResize();
};

const handleMousedownEvent = (event) => {
  isMouseDown = true;
};

const handleMouseupEvent = (event) => {
  if (!isMouseDownMove) {
    clicked.update((point) => {
      return { x: event.clientX, y: event.clientY };
    });
  }
  isMouseDown = false;
  isMouseDownMove = false;
};

const handleMousemoveEvent = (event) => {

  cursor.update((point) => {return {x: event.x , y: event.y}});

  if (isMouseDown) {
    isMouseDownMove = true;
    offset.update((offsetPoint) => {
      return {
        x: offsetPoint.x + event.movementX,
        y: offsetPoint.y + event.movementY,
      };
    });
  }
};

const handleTouchstartEvent = (event) => {
  event.preventDefault();
  console.log("start", event);
};

const handleTouchmoveEvent = (event) => {
  event.preventDefault();
  console.log("move", event);
};

const handleTouchendEvent = (event) => {
  event.preventDefault();
  console.log("end", event);
};

const handleTouchcancelEvent = (event) => {
  event.preventDefault();
  console.log("cancel", event);
};

export const attachResizeEvent = () => {
  window.addEventListener("resize", handleResizeEvent);
};

export const detachResizeEvent = () => {
  window.removeEventListener("resize", handleResizeEvent);
};

export const attachEvents = (canvas) => {
  canvas.addEventListener("wheel", handleWheelEvent);

  canvas.addEventListener("mousedown", handleMousedownEvent);
  canvas.addEventListener("mouseup", handleMouseupEvent);
  canvas.addEventListener("mousemove", handleMousemoveEvent);

  canvas.addEventListener("touchstart", handleTouchstartEvent, true);
  canvas.addEventListener("touchmove", handleTouchmoveEvent, true);
  canvas.addEventListener("touchend", handleTouchendEvent, true);
  canvas.addEventListener("touchcancel", handleTouchcancelEvent, true);
};

export const detachEvents = (canvas) => {
  canvas.removeEventListener("wheel", handleWheelEvent);
  canvas.removeEventListener("resize", handleResizeEvent);
  canvas.removeEventListener("mousedown", handleMousedownEvent);
  canvas.removeEventListener("mouseup", handleMouseupEvent);
  canvas.removeEventListener("mousemove", handleMousemoveEvent);

  canvas.removeEventListener("touchstart", handleTouchstartEvent);
  canvas.removeEventListener("touchmove", handleTouchmoveEvent);
  canvas.removeEventListener("touchend", handleTouchendEvent);
  canvas.removeEventListener("touchcancel", handleTouchcancelEvent);
};
