import { Text, Grid, Spacer } from "@nextui-org/react";

import CreateGrid from "../component/CreateGrid";

export default function Home() {
  return (
    <div>
      <Grid.Container justify="center">
        <Text
          h1
          size={50}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Conway's Game of Life
        </Text>
      </Grid.Container>
      <Spacer y={1} />
      <CreateGrid />
    </div>
  );
}
