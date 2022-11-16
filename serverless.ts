import type { AWS } from "@serverless/typescript";
import * as dotenv from "dotenv";

import {
  createCustomer,
  readCustomer,
  updateCustomer,
} from "@routes/customers";

dotenv.config({ path: __dirname + "/.env.development" });

const serverlessConfiguration: AWS = {
  service: process.env.API_NAME,
  useDotenv: true,
  frameworkVersion: "3",
  plugins: [
    "serverless-offline",
    "serverless-dynamodb-local",
    "serverless-webpack",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    timeout: 300,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  functions: {
    createCustomer,
    readCustomer,
    updateCustomer,
  },
  package: {
    individually: true,
    excludeDevDependencies: true,
    patterns: [
      "!.git/**",
      "!.vscode/**",
      "!.test/**",
      "!.env.development",
      "!.env.production",
    ],
  },
  custom: {
    dotenv: {
      path: "./.env.development",
    },
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
      useChildProcesses: true,
    },
  },
};

module.exports = serverlessConfiguration;
