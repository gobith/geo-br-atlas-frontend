import { Border , Node } from "./domain";


const borders = new Map();

export const storeBorders = (borderData) => {
  borderData.forEach((border) => {
    borders.set(border.id, new Border(border));
  });

  console.log(borders.get(1).d )
  console.log(borders.get(1).reverseD())
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
  const areaBorders = bordersForAreas(areas);
  const nodes = createNodes(areaBorders);
  return borderPathForNodes(nodes);
};

const bordersForAreas = (areas) => {
  const borderIdBag = new Map();
  const areaBorders = [];
  areas.forEach((area) => {
    area.borders.forEach((borderId) => {
      borderIdBag.set(borderId, (borderIdBag.get(borderId) ?? 0) + 1);
    });
  });

  borderIdBag.forEach((occurence, borderId) => {
    if (occurence === 1) {
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
      const path = new Path2D();
      paths.push(path);
      node.initialFillPath(path, leftOver, nodes);
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
