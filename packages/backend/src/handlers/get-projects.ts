import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async () => {
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*", // CORS対応
  };

  try {
    const command = new ScanCommand({
      TableName: process.env.PROJECTS_TABLE_NAME,
    });

    const response = await docClient.send(command);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.Items ?? []),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
