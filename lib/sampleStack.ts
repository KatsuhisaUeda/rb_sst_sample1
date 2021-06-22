import * as sst from "@serverless-stack/resources";

export default class SampleStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": "src/lambda/hello.handler",
        "POST /gmo/payment/start": {
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
        "GET /pring/app-auth": {
          function: {
            srcPath: "src/lambda/",
            handler: "authorizePringAppUrl.handler",
            environment: {
              PRING_CLIENT_ID: process.env.PRING_CLIENT_ID || "",
              PRING_SCHEME: process.env.PRING_SCHEME || "",
            },
            permissions: ["ssm"],
          },
        },
        "POST /pring/purchase": {
          function: {
            srcPath: "src/lambda/",
            handler: "purchase.handler",
            environment: {
              PRING_CLIENT_ID: process.env.PRING_CLIENT_ID || "",
              PRING_CLIENT_SECRET: process.env.PRING_CLIENT_SECRET || "",
              PRING_API_BASE_URL: process.env.PRING_API_BASE_URL || "",
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
