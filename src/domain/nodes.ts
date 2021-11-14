import { Border, Node } from "./domain";

const borders = new Map();

export const storeBorders = (borderData) => {
  borderData.forEach((border) => {
    borders.set(border.id, new Border(border));
  });
};

const createNodes = (borderData) => {
  const nodes = new Map();

  borderData.forEach((border) => {
    if (nodes.has(border.a)) {
      nodes.get(border.a).borderA(border);
    } else {
      const node = new Node(border.a);
      node.borderA(border);
      nodes.set(border.a, node);
    }

    if (nodes.has(border.b)) {
      nodes.get(border.b).borderB(border);
    } else {
      const node = new Node(border.b);
      node.borderB(border);
      nodes.set(border.b, node);
    }
  });

  return nodes;
};

export const borderPathForAreas = (areas) => {
  const areaBorders = bordersForAreas(areas, 1);
  const nodes = createNodes(areaBorders);
  return borderPathForNodes(nodes);
};

const bordersForAreas = (areas, value) => {
  const borderIdBag = new Map();
  const areaBorders = [];
  areas.forEach((area) => {
    area.b.forEach((borderId) => {
      borderIdBag.set(borderId, (borderIdBag.get(borderId) ?? 0) + 1);
    });
  });

  borderIdBag.forEach((occurence, borderId) => {
    if (occurence === value) {
      areaBorders.push(borders.get(borderId));
    }
  });

  return areaBorders;
};

const borderPathForNodes = (nodes) => {
  const paths = [];
  const leftOver = new Map(nodes);

  nodes.forEach((node, nodeId) => {
    if (leftOver.has(nodeId)) {
      const array = [];
      node.initialFillPath(array, leftOver, nodes);
      const path = new Path2D(array.join(" "));
      paths.push(path);
    }
  });

  if (paths.length === 1) {
    return paths[0];
  } else {
    const combinedPath = new Path2D();
    paths.forEach((path) => {
      combinedPath.addPath(path);
    });
    return combinedPath;
  }
};

export const provinceBordersPathForAreas = (areas) => {

  const provinceBorders = bordersForAreas(areas , 2);
 
  return new Path2D(provinceBorders.map(border => border.d).join(" "));


};
