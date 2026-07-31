import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async () => {
  const headers = {
    "Content-type": "application/json",
    "Access-Controll-Allow-Origin": "*",
  };

  try {
    const command = new GetCommand({
      TableName: process.env.PROFILE_TABLE_NAME,
      Key: { id: "profile" },
    });

    const response = await docClient.send(command);

    if (!response.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: "Profile not found"}),
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.Item),
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Internal server error"}),
    };
  }
};
