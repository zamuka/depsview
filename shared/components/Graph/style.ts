import { Stylesheet } from "cytoscape";

const COLORS = {
  purple: "#43447a"
};

const nodeStyles: Stylesheet[] = [
  {
    "selector": "node[label]",
    "style": {
      "label": "data(label)",
      color: '#000',
      "text-outline-color": '#eee',
      'text-outline-width': 2,
    }
  },

  {
    "selector": ".top-left",
    "style": {
      "text-valign": "top",
      "text-halign": "left"
    }
  },

  {
    "selector": ".top-center",
    "style": {
      "text-valign": "top",
      "text-halign": "center"
    }
  },

  {
    "selector": ".top-right",
    "style": {
      "text-valign": "top",
      "text-halign": "right"
    }
  },

  {
    "selector": ".center-left",
    "style": {
      "text-valign": "center",
      "text-halign": "left"
    }
  },

  {
    "selector": ".center-center",
    "style": {
      "text-valign": "center",
      "text-halign": "center"
    }
  },

  {
    "selector": ".center-right",
    "style": {
      "text-valign": "center",
      "text-halign": "right"
    }
  },

  {
    "selector": ".bottom-left",
    "style": {
      "text-valign": "bottom",
      "text-halign": "left"
    }
  },

  {
    "selector": ".bottom-center",
    "style": {
      "text-valign": "bottom",
      "text-halign": "center"
    }
  },

  {
    "selector": ".bottom-right",
    "style": {
      "text-valign": "bottom",
      "text-halign": "right"
    }
  },

  {
    "selector": ".multiline-manual",
    "style": {
      "text-wrap": "wrap"
    }
  },

  {
    "selector": ".multiline-auto",
    "style": {
      "text-wrap": "wrap",
      "text-max-width": '80px',
    }
  },

  {
    selector: 'node',
    style: {
      'background-color': '#888',
      opacity: 0.7
    }
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': '#1976d2',
      opacity: 1,
    }
  },
  {
    selector: 'node.version',
    style: {
      'background-color': '#F00',
    }
  },
  {
    selector: 'node.version:selected',
    style: {
      'background-color': '#1976d2',
    }
  },
  {
    selector: 'node.destination',
    style: {
      'background-color': '#F00',
    }
  },
];
const edgeStyles: Stylesheet[] = [
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      "target-arrow-color": COLORS.purple,
      "line-color": COLORS.purple,
      opacity: 0.7,
    }
  }
];

export const style: Stylesheet[] = [...nodeStyles, ...edgeStyles];
