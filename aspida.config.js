module.exports = [
  { input: "src/service/apis/gmopg" },
  {
    input: "src/service/apis/pring",
    baseURL: "/external/client/connected",
    openapi: {
      inputFile:
        "https://app.swaggerhub.com/apiproxy/registry/pring/ex_connected_payments/1.0.5?resolved=true",
    },
  },
];
