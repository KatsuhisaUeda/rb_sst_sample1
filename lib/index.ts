import * as sst from "@serverless-stack/resources";

import GmopgStack from "./gmopgStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x",
  });

  new GmopgStack(app, "gmopg-stack");

  // Add more stacks
}
