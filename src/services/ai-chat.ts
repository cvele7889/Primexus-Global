import {
  AI_API_KEY,
  AI_API_URL,
  AI_CHAT_ENDPOINT,
  AI_MODEL,
  ChatMessage,
  createSystemPrompt,
} from '../config/ai-chat'
import { getFallbackReply } from './ai-chat-fallback'

type SendChatOptions = {
  messages: ChatMessage[]
  language: string
}

function toApiMessages(messages: ChatMessage[], language: string) {
  const history = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content }))

  return [{ role: 'system' as const, content: createSystemPrompt(language) }, ...history]
}

async function sendViaEndpoint(messages: ChatMessage[], language: string): Promise<string> {
  const response = await fetch(AI_CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      language,
      messages: toApiMessages(messages, language),
    }),
  })

  if (!response.ok) {
    throw new Error(`Chat endpoint error: ${response.status}`)
  }

  const data = (await response.json()) as { reply?: string; message?: string; content?: string }
  const reply = data.reply ?? data.message ?? data.content
  if (!reply?.trim()) {
    throw new Error('Empty reply from chat endpoint')
  }

  return reply.trim()
}

async function sendViaOpenAI(messages: ChatMessage[], language: string): Promise<string> {
  const response = await fetch(AI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: AI_MODEL,
      temperature: 0.6,
      max_tokens: 600,
      messages: toApiMessages(messages, language),
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const reply = data.choices?.[0]?.message?.content?.trim()
  if (!reply) {
    throw new Error('Empty reply from OpenAI')
  }

  return reply
}

export async function sendChatMessage({ messages, language }: SendChatOptions): Promise<string> {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')
  if (!lastUserMessage) {
    throw new Error('No user message')
  }

  try {
    if (AI_CHAT_ENDPOINT) {
      return await sendViaEndpoint(messages, language)
    }

    if (AI_API_KEY) {
      return await sendViaOpenAI(messages, language)
    }
  } catch {
    return getFallbackReply(lastUserMessage.content, language)
  }

  await new Promise((resolve) => setTimeout(resolve, 450 + Math.random() * 350))
  return getFallbackReply(lastUserMessage.content, language)
}

export function isAiConfigured(): boolean {
  return Boolean(AI_CHAT_ENDPOINT || AI_API_KEY)
}
