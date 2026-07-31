import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "ap-northeast-1" });
const docClient = DynamoDBDocumentClient.from(client);

const PROJECTS_TABLE_NAME = "BackendStack-ProjectsTableAA0A2089-6FTLJRZO7STT";
const PROFILE_TABLE_NAME = "BackendStack-ProfileTable0598D89D-LRR9YLVL2212";

const initialProjects = [
  {
    id: 'project-1',
    title: 'ポートフォリオ',
    description: 'React, AWS CDK, DynamoDB を使用したフルサーバレスなポートフォリオサイト。',
    techStack: ['React', 'TypeScript', 'AWS CDK', 'DynamoDB', 'Lambda'],
    link: 'https://github.com/namahu/portfolio',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'project-2',
    title: 'Communi que~tion',
    description: 'コミュニケーションのきっかけになりそうなツールを提供するサイト',
    techStack: ['React', 'NestJS', 'Prisma', 'PostgreSQL', 'tailwindCss'],
    link: 'https://communi-que.web.app/',
    createdAt: new Date().toISOString(),
  },
];

const initialProfile = {
  id: "profile",
  firstName: "Masami",
  lastName: "Nakaoka",
  kanjiName: "中岡 政巳",
  nickName: "namahu",
  birthDate: "1983/03/26",
  bio: "test",
  skills: ["React", "TypeScript"],
  socials: {
    github: "https://github.com/namahu",
  }
};

async function seed() {
  console.log(`Starting seed to table: ${PROJECTS_TABLE_NAME}`);

  for (const project of initialProjects) {
    try {
      await docClient.send(
        new PutCommand({
          TableName: PROJECTS_TABLE_NAME,
          Item: project,
        })
      );

      console.log(`Inserted: ${project.title} (ID: ${project.id})`);
    } catch(err) {
      console.error(`Failed to insert ${project.id}`, err);
    }
  }

  console.log(`Seeding completed: ${PROJECTS_TABLE_NAME}`);
  console.log(`Starting seed to table: ${PROFILE_TABLE_NAME}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: PROFILE_TABLE_NAME,
        Item: initialProfile,
      })
    );

    console.log(`Seeding completed: ${PROFILE_TABLE_NAME}`);
  } catch(err) {
    console.error(`Failed to seeding  ${PROFILE_TABLE_NAME}`, err);
  }
};

seed();
