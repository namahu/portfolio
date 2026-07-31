import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import path from 'path';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDBのテーブル定義
    const projectsTable = new dynamodb.Table(this, "ProjectsTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // オンデマンド 無料枠あり
      removalPolicy: cdk.RemovalPolicy.DESTROY, // スタックからリソースが削除される際にテーブルも削除
    });

    const profileTable = new dynamodb.Table(this, "ProfileTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda関数の定義
    const getProjectsHandler = new nodejs.NodejsFunction(this, "GetProjectsHandler", {
      runtime: lambda.Runtime.NODEJS_24_X,
      entry: path.join(__dirname, "../src/handlers/get-projects.ts"),
      handler: "handler",
      environment: {
        PROJECTS_TABLE_NAME: projectsTable.tableName,
      },
    });

    const getProfileHandler = new nodejs.NodejsFunction(this, "GetProfileHandler", {
      runtime: lambda.Runtime.NODEJS_24_X,
      entry: path.join(__dirname, "../src/handlers/get-profile.ts"),
      handler: "handler",
      environment: {
        PROFILE_TABLE_NAME: profileTable.tableName,
      },
    });

    // getProjectsHandlerにDynamoDBの読み取り権限を付与
    projectsTable.grantReadData(getProjectsHandler);
    profileTable.grantReadData(getProfileHandler);

    // Api Gatewayの定義
    const api = new apigateway.RestApi(this, "PortfolioApi", {
      restApiName: "Portfolio Service",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS, // フロントエンドからのCORS要求を許可
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // GET /projects エンドポイントの作成
    const projectsResource = api.root.addResource("projects");
    projectsResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProjectsHandler),
    );

    const profileResource = api.root.addResource("profile");
    profileResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProfileHandler),
    );

    // API エンドポイントの出力
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "Api Gateway Endpoint URL",
    });

    // DynamoDBのテーブル名を出力
    new cdk.CfnOutput(this, "projectsTableNameOutput", {
      value: projectsTable.tableName,
      description: "Table name of projects table",
    });

    new cdk.CfnOutput(this, "ProfileTableNameOutput", {
      value: profileTable.tableName,
      description: "Table name of profiles table",
    });
  }
}
