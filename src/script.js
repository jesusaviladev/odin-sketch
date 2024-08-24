const canvas = document.querySelector("#container");
const button = document.querySelector("#new");
const reset = document.querySelector("#reset");

const GRID_WIDTH = 640;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomColor = () => {
  return `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(
    0,
    255
  )}, ${getRandomNumber(0, 255)})`;
};

const renderGrid = (gridSize = 16) => {
  const grid = new Array(gridSize)
    .fill(0)
    .map(() => new Array(gridSize).fill(0));

  grid.forEach((row) => {
    row.forEach(() => {
      const box = document.createElement("div");
      box.setAttribute("class", "box");
      box.textContent = "";

      if (gridSize !== 16) {
        box.style.width = `${GRID_WIDTH / gridSize}px`;
        box.style.height = `${GRID_WIDTH / gridSize}px`;
      }

      box.addEventListener("mouseover", () => {
        if (!box.style.backgroundColor) {
          box.style.backgroundColor = getRandomColor();
        }

        if (!box.style?.opacity) {
          box.style.opacity = 0.1;
        } else if (box.style.opacity < 1) {
          box.style.opacity = Number(box.style.opacity) + 0.1;
        }
      });

      canvas.appendChild(box);
    });
  });
};

const removeGrid = () => {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
};

button.addEventListener("click", () => {
  const gridSize = Number(prompt("Enter a number between 2 and 100"));

  if (gridSize < 2 || gridSize > 100 || Number.isNaN(gridSize)) {
    throw new Error("Invalid grid size");
  }

  removeGrid();
  renderGrid(gridSize);
});

reset.addEventListener("click", () => {
  removeGrid();
  renderGrid();
});

renderGrid();
