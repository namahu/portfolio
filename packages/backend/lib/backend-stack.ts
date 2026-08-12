import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import path from "path";

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3バケットの定義
    const portfolioImageBucket = new s3.Bucket(this, "PortfolioImages", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      bucketNamespace: s3.BucketNamespace.ACCOUNT_REGIONAL,
      bucketNamePrefix: "portfolio-images",
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const frontendBucket = new s3.Bucket(this, "FrontendBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      bucketNamespace: s3.BucketNamespace.ACCOUNT_REGIONAL,
      bucketNamePrefix: "portfolio-site",
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // CloudFrontディストリビューション
    const distribution = new cloudfront.Distribution(
      this,
      "FrontendDistribution",
      {
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin:
            origins.S3BucketOrigin.withOriginAccessControl(frontendBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          compress: true,
        },
      },
    );

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
    const getProjectsHandler = new nodejs.NodejsFunction(
      this,
      "GetProjectsHandler",
      {
        runtime: lambda.Runtime.NODEJS_24_X,
        entry: path.join(__dirname, "../src/handlers/get-projects.ts"),
        handler: "handler",
        environment: {
          PROJECTS_TABLE_NAME: projectsTable.tableName,
        },
      },
    );

    const getProfileHandler = new nodejs.NodejsFunction(
      this,
      "GetProfileHandler",
      {
        runtime: lambda.Runtime.NODEJS_24_X,
        entry: path.join(__dirname, "../src/handlers/get-profile.ts"),
        handler: "handler",
        environment: {
          PROFILE_TABLE_NAME: profileTable.tableName,
          S3_BUCKET_NAME: portfolioImageBucket.bucketName,
        },
      },
    );

    // Lambda関数にDynamoDBとS3バケットの読み取り権限を付与
    projectsTable.grantReadData(getProjectsHandler);
    profileTable.grantReadData(getProfileHandler);
    portfolioImageBucket.grantRead(getProfileHandler);

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

    // CloudfrontのURLを出力
    new cdk.CfnOutput(this, "CloudFrontUrl", {
      value: `https://${distribution.distributionDomainName}`,
    });

    // CloudfrontのディストリビューションIDを出力
    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
      description: "CloudFront Distribution ID",
    });
  }
}
