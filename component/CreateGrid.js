import React, { useState, useEffect, useCallback } from "react";
import "../styles/creategrid.module.css";
import produce from "immer";
import { Input, Button, Grid, Spacer } from "@nextui-org/react";

const CreateGrid = () => {
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);

  const rows = width;
  const cols = height;

  const createEmptyGrid = () => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.random() * 0);
      }
      grid.push(row);
    }
    return grid;
  };

  const CreateRandomGrid = () => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.floor(Math.random() * 2));
      }
      grid.push(row);
    }

    return grid;
  };

  const [randomGrid, setRandomGrid] = useState();

  useEffect(() => {
    setRandomGrid(createEmptyGrid());
  }, [width, height]);

  const positions = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  const gameStart = useCallback(() => {
    setRandomGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < rows; i++) {
          for (let k = 0; k < cols; k++) {
            let neighbors = 0;
            positions.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < rows && newK >= 0 && newK < cols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
  }, [rows, cols]);

  return (
    <>
      <div className="main">
        <Grid.Container gap={2} justify="center">
          <Grid>
            <Input
              labelPlaceholder="Width"
              rounded
              placeholder="Grid width:"
              status="primary"
              onChange={(e) => setHeight(e.target.value)}
            />
          </Grid>

          <Grid>
            <Input
              labelPlaceholder="Height"
              rounded
              placeholder="Grid height:"
              status="primary"
              onChange={(e) => setWidth(e.target.value)}
            />
          </Grid>

          <Grid>
            <Input
              labelPlaceholder="Alive cells"
              rounded
              placeholder="Alive cells"
              disabled={true}
              status="primary"
            />
          </Grid>

          <Grid>
            <Button
              shadow
              color="success"
              auto
              onClick={(e) => {
                gameStart();
              }}
            >
              Next
            </Button>
          </Grid>
          <Grid>
            <Button
              auto
              shadow
              color="warning"
              onClick={() => {
                setRandomGrid(createEmptyGrid());
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid.Container>
        <Spacer y={1} />

        <Grid.Container justify="center">
          <div
            className="grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${height}, 20px)`,
              width: `${width}`,
              margin: "0 auto",
            }}
          >
            {randomGrid &&
              randomGrid.map((row, i) =>
                row.map((col, k) => (
                  <div
                    className="table"
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: col ? "green" : undefined,
                      border: "1px solid black",
                    }}
                    onClick={() => {
                      const newGrid = produce(randomGrid, (gridCopy) => {
                        gridCopy[i][k] = col ? 0 : 1;
                      });
                      console.log(newGrid);
                      setRandomGrid(newGrid);
                    }}
                    key={`${i}-${k}`}
                  />
                ))
              )}
          </div>
        </Grid.Container>
        <Spacer y={1} />

        <Grid.Container justify="center">
          <Button
            shadow
            color="error"
            auto
            onPress={() => setRandomGrid(CreateRandomGrid())}
          >
            Random Board
          </Button>
        </Grid.Container>
      </div>
    </>
  );
};

export default CreateGrid;
