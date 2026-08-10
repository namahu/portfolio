import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import type {
  ProfileWithAvatarKey,
  ProfileResponseDTO,
} from "@portfolio/types";

const dbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dbClient);

const s3Client = new S3Client({});

export const handler: APIGatewayProxyHandler = async () => {
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
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
        body: JSON.stringify({ message: "Profile not found" }),
      };
    }

    const responseItem = response.Item as ProfileWithAvatarKey;

    const s3Command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: responseItem.avatarKey,
    });

    const presignedUrl = await getSignedUrl(s3Client, s3Command, {
      expiresIn: 3600,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: responseItem.id,
        firstName: responseItem.firstName,
        lastName: responseItem.lastName,
        nickName: responseItem.nickName,
        kanjiName: responseItem.kanjiName,
        birthDate: responseItem.birthDate,
        skills: responseItem.skills,
        socials: responseItem.socials,
        bio: responseItem.bio,
        avatarUrl: presignedUrl,
      } as ProfileResponseDTO),
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
