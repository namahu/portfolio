import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { CloudFormationClient, ListStackResourcesCommand } from "@aws-sdk/client-cloudformation";
import type { ProfileWithAvatarKey, Project } from "@portfolio/types";

const client = new DynamoDBClient({ region: "ap-northeast-1" });
const docClient = DynamoDBDocumentClient.from(client);

const cfnClient = new CloudFormationClient({ region: "ap-northeast-1"});

async function getTableNameByLogicalId(stackName: string, logicalId: string) {
  const command = new ListStackResourcesCommand({ StackName: stackName});
  const response = await cfnClient.send(command);
  const resource = response.StackResourceSummaries?.find(
    r => r.LogicalResourceId === logicalId
  );
  if (!resource?.PhysicalResourceId) {
    throw new Error(`Physical Resource ID not found for ${logicalId}`);
  }
  return resource.PhysicalResourceId;
};

const initialProjects: Project[] = [
  {
    id: "project-1",
    title: "ポートフォリオ",
    type: "personal",
    description:
      "このサイト。React, AWS CDK, DynamoDB を使用したフルサーバレスなポートフォリオサイト。",
    techStack: ["React", "TypeScript", "AWS CDK", "DynamoDB", "Lambda"],
    link: "https://github.com/namahu/portfolio",
    repository: {
      name: "namahu/portfolio",
      ownerName: "namahu",
      issues: null,
      url: "https://github.com/namahu/portfolio",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-2",
    title: "Communi que~tion",
    type: "personal",
    description:
      "コミュニケーションのきっかけになりそうなツールを提供するサイト",
    techStack: ["React", "NestJS", "Prisma", "PostgreSQL", "tailwindCss"],
    link: "https://communi-que.web.app/",
    repository: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-3",
    title: "添削作業をAIでチェックするChrome拡張機能の開発",
    type: "business",
    description: `アンケート添削業務の品質チェック効率化のため、
    社内メンバーでのチェックからAIでのチェックに移行するための検証用としてのChrome拡張機能の新規開発。`,
    techStack: [
      "TypeScript",
      "Gemini API",
      "Node.js",
      "Vite",
      "crxjs",
      "GitHub",
    ],
    link: null,
    repository: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-4",
    title: "サイト会員向けメルマガの設定を効率化するツールの開発",
    type: "business",
    description: `サイト会員へ送信するメルマガの設定を効率化するため、
    都道府県毎の送信内容作成と基幹システムへの設定を自動で行うツールの開発。`,
    techStack: [
      "TypeScript",
      "Google Apps Script",
      "Node.js",
      "Firebase Functions",
      "GitHub",
    ],
    link: null,
    repository: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-5",
    title: "SlackBotの開発",
    type: "business",
    description: `Slackのシングルチャンネルゲストとして登録している外部スタッフへ一斉に連絡するためのSlackBotの開発。`,
    techStack: [
      "TypeScript",
      "Google Apps Script",
      "Node.js",
      "clasp",
      "slack",
      "GitHub",
    ],
    link: null,
    repository: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-6",
    title: "業務サイトの新規構築",
    type: "business",
    description: `外部スタッフが行ったデータ入力結果を、日時の古い順に並べてWチェックを行うサイトの構築‧追加機能の開発`,
    techStack: [
      "TypeScript",
      "React",
      "Node.js",
      "Firebase Authentication",
      "Firebase Hosting",
      "PostgreSQL",
      "GitHub",
    ],
    link: null,
    repository: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-7",
    title: "外部スタッフの報酬計算を行うツールの開発",
    type: "business",
    description: `外部スタッフの作業実績を収集し計算、報酬のリスト化、各スタッフへ配布するPDFの作成を行うツールの新規開発・保守`,
    techStack: [
      "TypeScript",
      "Google Apps Script",
      "Node.js",
      "clasp",
      "PostgreSQL",
      "GitHub",
    ],
    link: null,
    repository: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-8",
    title: "問い合わせ対応業務をサポートするChrome拡張機能の開発",
    type: "business",
    description: `サイト会員や外部スタッフからの問い合わせに対応する業務の効率化を目的としたChrome拡張機能の開発‧追加機能の開発‧保守`,
    techStack: [
      "JavaScrippt",
      "TypeScript",
      "Google Apps Script",
      "HTML",
      "CSS",
      "Node.js",
      "Firestore",
      "clasp",
      "crxjs",
      "GitHub",
    ],
    link: null,
    repository: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-9",
    title: "データ入力業務をサポートするChrome拡張機能",
    type: "business",
    description: `外部スッタフがレシートのデータ入力業務を行う際の、
    業務効率化やミス削減を目的としたChrome拡張機能の新規開発‧追加機能の開発‧保守`,
    techStack: [
      "JavaScrippt",
      "TypeScript",
      "Google Apps Script",
      "HTML",
      "CSS",
      "Node.js",
      "Firestore",
      "clasp",
      "crxjs",
      "Vite",
      "GitHub",
    ],
    link: null,
    repository: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-10",
    title: "添削業務をサポートするChrome拡張機能",
    type: "business",
    description: `添削業務を行う外部スタッフを補助し、
    業務の効率化やミスの削減を目的としたChrome拡張機能の新規開発‧追加機能の開発‧保守`,
    techStack: [
      "JavaScrippt",
      "TypeScript",
      "Google Apps Script",
      "HTML",
      "CSS",
      "Node.js",
      "clasp",
      "crxjs",
      "Vite",
      "GitHub",
    ],
    link: null,
    repository: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-11",
    title: null,
    type: "oss",
    description: `A retro RPG themed expense tracker for managing income, expenses, savings, and recurring finances`,
    techStack: ["TypeScript", "Next.js", "Express", "SQLight"],
    link: null,
    repository: {
      name: "ali-ahnaf/pocket_pixel",
      ownerName: "ali-ahnaf",
      issues: [
        { number: 93, title: "Import Export Data Backup - Backend API" },
        { number: 33, title: "Add unit tests for RecurringService" },
        { number: 32, title: "Add unit tests for PromptService" },
        { number: 131, title: "Add unit tests for DebtsService" },
        {
          number: 53,
          title:
            "add per-user disableAiPrompt setting (entity, DTO, service, route)",
        },
        { number: 49, title: "store a monthly budget amount per vault" },
        { number: 70, title: "Desktop sidebar doesn't fill the full screen" },
      ],
      url: "https://github.com/ali-ahnaf/pocket_pixel/",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-12",
    title: null,
    type: "oss",
    description: `Web-Based Biochemical Kinetics Editor`,
    techStack: ["TypeScript", "React", "Hono", "Supabase"],
    link: null,
    repository: {
      name: "MarkAStevens04/cloudflare-kinetics-editor",
      ownerName: "MarkAStevens04",
      issues: [{ number: 72, title: "Download CSV of data" }],
      url: "https://github.com/MarkAStevens04/cloudflare-kinetics-editor/",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-13",
    title: null,
    type: "oss",
    description: `A smart tool to compare developers by real impact in open-source — not just stars and followers`,
    techStack: ["TypeScript", "Next.js", "TailwindCSS", "Express"],
    link: null,
    repository: {
      name: "O2sa/DevImpact",
      ownerName: "O2sa",
      issues: [
        {
          number: 158,
          title: "refactor Move GithubLink from ThemeToggle to AppHeader",
        },
      ],
      url: "https://github.com/O2sa/DevImpact/",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-14",
    title: null,
    type: "oss",
    description: `This is a beginner-friendly open-source React project open for contributions. Feel free to fork the repo, pick any Good First Issue or Help Wanted task, and submit a pull request. UI improvements, features, bug fixes, and docs updates are welcome. Let’s build and learn`,
    techStack: ["React", "React Router", "TailwindCSS", "Vite"],
    link: null,
    repository: {
      name: "shamilahmdt/devtasks",
      ownerName: "shamilahmdt",
      issues: [
        {
          number: 219,
          title: "Add HTML-CSS-JS Code Sandbox to Dev Utilities Sandbox",
        },
        {
          number: 189,
          title: "Implement Resource Hub Delete History Functionality",
        },
        { number: 166, title: "Build Add Resource Page Functionality" },
        { number: 152, title: "Improve JSON Formatter Page UI" },
        {
          number: 143,
          title: "bug Snippet edit page is not functioning properly",
        },
        {
          number: 131,
          title: "Fix Snippet Copy Functionality & Implement Edit Feature",
        },
      ],
      url: "https://github.com/shamilahmdt/devtasks/",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "project-15",
    title: null,
    type: "oss",
    description: `The best place on the internet for anyone learning a programming language. An AI-powered platform for mastering programming through curated challenges and instant mentorship. Inspired by RareCode.ai.`,
    techStack: ["TypeScript", "Next.js", "TailwindCSS", "Supabase"],
    link: null,
    repository: {
      name: "notcodesid/learn-to-code",
      ownerName: "notcodesid",
      issues: [
        { number: 3, title: "Add dark-light theme toggle for user preference" },
      ],
      url: "https://github.com/notcodesid/learn-to-code/",
    },
    createdAt: new Date().toISOString(),
  },
];

const initialProfile: ProfileWithAvatarKey = {
  id: "profile",
  firstName: "Masami",
  lastName: "Nakaoka",
  kanjiName: "中岡 政巳",
  nickName: "namahu",
  birthDate: "1983-03-26",
  bio: `WEBサービスの運営企業にて、カスタマーサポートや添削運用業務に従事する中で現場の業務課題に着目し、
  非エンジニア職ながら独学でプログラミングの学習を開始。
  CSや運用実務を並行して行いながら、
  現場の課題特定からツール・Chrome拡張機能の企画・要件定義・設計・開発・保守までを主体的に手掛け、
  多数の業務効率化や品質向上を実現。
  2025年12月よりシステムエンジニアへ転身。`,
  skills: [
    "JavaScript",
    "TypeScript",
    "Google Apps Script",
    "React",
    "HTML",
    "CSS",
    "Firebase",
    "Node.js",
    "TailWindCss",
    "NestJS",
    "Prisma",
    "PostgreSQL",
  ],
  socials: {
    github: "https://github.com/namahu",
    zenn: "https://zenn.dev/namahu",
  },
  avatarKey: "profile/profile-image.png",
};

async function seed() {
  const profileTableName = await getTableNameByLogicalId("BackendStack", "ProfileTable0598D89D");
  const projectsTableName = await getTableNameByLogicalId("BackendStack", "ProjectsTableAA0A2089");

  console.log(`Starting seed to table: ${projectsTableName}`);

  for (const project of initialProjects) {
    try {
      await docClient.send(
        new PutCommand({
          TableName: projectsTableName,
          Item: project,
        }),
      );

      console.log(`Inserted: ${project.title} (ID: ${project.id})`);
    } catch (err) {
      console.error(`Failed to insert ${project.id}`, err);
    }
  }

  console.log(`Seeding completed: ${projectsTableName}`);
  console.log(`Starting seed to table: ${profileTableName}`);

  try {
    await docClient.send(
      new PutCommand({
        TableName: profileTableName,
        Item: initialProfile,
      }),
    );

    console.log(`Seeding completed: ${profileTableName}`);
  } catch (err) {
    console.error(`Failed to seeding  ${profileTableName}`, err);
  }
}

seed();
