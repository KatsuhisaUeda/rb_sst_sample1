import * as sst from "@serverless-stack/resources";

export default class GmopgStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": "src/lambda/hello.handler",
        "POST /payment/start": {
          function: {
            srcPath: "src/lambda/",
            handler: "getGmopgPaymentUrl.handler",
            environment: {
              GMOPG_SHOP_ID: process.env.GMOPG_SHOP_ID || "",
              GMOPG_SHOP_PASS: process.env.GMOPG_SHOP_PASS || "",
            },
            permissions: ["ssm"],
          },
        },
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}
