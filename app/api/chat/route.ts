import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import fs from "fs";
import path from "path";

export const maxDuration = 60;

const knowledge = (() => {
  try {
    return fs.readFileSync(
      path.join(process.cwd(), "public/ai/ai-knowledge.md"),
      "utf-8"
    );
  } catch {
    return "";
  }
})();

const deepseek = createOpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const SYSTEM_PROMPT = `你是 MyBrandSite 的 AI 客服助手。请严格根据以下知识库内容回答问题，不要编造知识库中没有的信息。

【知识库】
${knowledge}

【规则】
- 严格根据知识库内容回答，禁止编造、猜测或补充知识库中没有的信息
- 如果问题超出知识库范围，直接说明"这个问题我暂时无法回答，建议联系张老师获取更多信息"，不要尝试编造答案
- 回答要简洁友好，控制在 200 字以内
- 用中文回答`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: deepseek("deepseek-chat"),
      system: SYSTEM_PROMPT,
      messages: messages.slice(-6), // 只保留最近 6 轮对话，控制 token
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("AI API error:", error);
    return new Response(
      JSON.stringify({ error: "AI 服务暂时不可用，请稍后重试" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
