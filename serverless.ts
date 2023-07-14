import type { AWS } from "@serverless/typescript";
import * as dotenv from "dotenv";

import {
  createCustomer,
  readCustomer,
  updateCustomer,
} from "@routes/customers";

dotenv.config({ path: __dirname + "/.env.development" });

const apiName = process.env.API_NAME;

const serverlessConfiguration: AWS = {
  service: apiName,
  useDotenv: true,
  frameworkVersion: "3",
  plugins: [
    "serverless-auto-swagger",
    "serverless-webpack",
    "serverless-offline",
    "serverless-dynamodb-local",
    "serverless-dotenv-plugin",
    "serverless-layers",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: process.env.DEPLOYMENT_BUCKET,
    },
    architecture: "arm64",
    timeout: 900,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:*",
              "cognito-idp:*",
              "s3:*",
              "secretsmanager:*",
              "lambda:*",
            ],
            Resource: ["*"],
          },
        ],
      },
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
    autoswagger: {
      title: apiName.charAt(0).toUpperCase() + apiName.substring(1),
      generateSwaggerOnDeploy: true,
      apiKeyHeaders: ["Authorization"],
      useStage: true,
      host: process.env.API_HOST,
      basePath: "/" + process.env.STAGE,
      schemes: ["https"],
      typefiles: ["./src/swaggerConfig/index.ts"],
    },
    dotenv: {
      path: "./.env.development",
    },
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
      useChildProcesses: true,
    },
    layers: {
      dependenciesPath: "./package.json",
    },
  },
};

module.exports = serverlessConfiguration;
