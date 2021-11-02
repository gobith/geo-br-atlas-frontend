import { writable , get} from "svelte/store";

export const resize = writable({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const scale = writable(0.2);

export const zoom = writable(3);

export const offset = writable({ x: 0, y: 0 });

export const clicked = writable({ x: 0, y: 0 });

export const settings = writable({
  showProvinces: true,
  showProvinceInfo: true,
});

export const provinceSelection = writable(null);

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

const zoomValue = () => { return get(zoom)}

const scaleIncrement = 2;
const zoomCap = 8


const privateZoomIn = (x, y) => {
  
  if (zoomValue() === zoomCap) {return};

  zoom.update((zoomNumber) => {return zoomNumber + 1});

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

  if (zoomValue() === 1) {return};

  zoom.update((zoomNumber) => {return zoomNumber - 1});
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

export const attachEvents = () => {
  window.addEventListener("wheel", handleWheelEvent);
  window.addEventListener("resize", handleResizeEvent);
  window.addEventListener("mousedown", handleMousedownEvent);
  window.addEventListener("mouseup", handleMouseupEvent);
  window.addEventListener("mousemove", handleMousemoveEvent);

  window.addEventListener("touchstart", handleTouchstartEvent, true);
  window.addEventListener("touchmove", handleTouchmoveEvent, true);
  window.addEventListener("touchend", handleTouchendEvent, true);
  window.addEventListener("touchcancel", handleTouchcancelEvent, true);
};

export const detachEvents = () => {
  window.removeEventListener("wheel", handleWheelEvent);
  window.removeEventListener("resize", handleResizeEvent);
  window.removeEventListener("mousedown", handleMousedownEvent);
  window.removeEventListener("mouseup", handleMouseupEvent);
  window.removeEventListener("mousemove", handleMousemoveEvent);

  window.removeEventListener("touchstart", handleTouchstartEvent);
  window.removeEventListener("touchmove", handleTouchmoveEvent);
  window.removeEventListener("touchend", handleTouchendEvent);
  window.removeEventListener("touchcancel", handleTouchcancelEvent);
};
