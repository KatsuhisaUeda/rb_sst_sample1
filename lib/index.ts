import * as sst from "@serverless-stack/resources";

import SampleStack from "./sampleStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x",
  });

  new SampleStack(app, "sample-stack");

  // Add more stacks
}
