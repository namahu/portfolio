#!/usr/bin/env node
import "dotenv/config";
import * as cdk from "aws-cdk-lib/core";
import { BackendStack } from "../lib/backend-stack";

const app = new cdk.App();

new BackendStack(app, "BackendStack", {
  env: { account: process.env.AWS_ACCOUNT_ID, region: process.env.AWS_REGION },
});
