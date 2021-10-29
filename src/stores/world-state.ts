import { writable } from "svelte/store";

const heightDelta = 0;

export const resize = writable({
  height: window.innerHeight - heightDelta,
  width: window.innerWidth,
});

export const scale = writable(0.2);

export const offset = writable({ x: 0, y: 0 });

export const clicked = writable({ x: 0, y: 0 });

export const settings = writable({showProvinces: true});

let isMouseDown = false;
let isMouseDownMove = false;



export const zoomIn = () => {

  scale.update((scaleNumber) => {
    return scaleNumber * 2;
  });
  offset.update((offset) => {
    return {
      x: 2 * offset.x - (window.innerWidth / 2),
      y: 2 * offset.y - (window.innerHeight / 2),
    };
  });

}

export const zoomOut = () => {

  scale.update((scaleNumber) => {
    return scaleNumber / 2;
  });
  offset.update((offset) => {
    return {
      x: (offset.x + (window.innerWidth / 2)) / 2,
      y: (offset.y + (window.innerHeight / 2)) / 2,
    };
  });

}


const handleWheelEvent = (event) => {
  if (event.wheelDelta > 0) {
    scale.update((scaleNumber) => {
      return scaleNumber * 2;
    });
    offset.update((offset) => {
      return {
        x: 2 * offset.x - event.clientX,
        y: 2 * offset.y - (event.clientY - heightDelta),
      };
    });
  } else {
    scale.update((scaleNumber) => {
      return scaleNumber / 2;
    });
    offset.update((offset) => {
      return {
        x: (offset.x + event.x) / 2,
        y: (offset.y + (event.clientY - heightDelta)) / 2,
      };
    });
  }
};

export const resetResize = () => {
  resize.set({ height: window.innerHeight - heightDelta, width: window.innerWidth });
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
