import { FormEvent, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useAiChat } from '../context/AiChatContext'
import type { ChatMessage } from '../config/ai-chat'
import { sendChatMessage } from '../services/ai-chat'
import '../styles/ai-chat.css'

const STORAGE_KEY = 'primexus-ai-messages'

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function loadStoredMessages(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ChatMessage[]
    return Array.isArray(parsed) ? parsed.filter((m) => m.role !== 'system') : []
  } catch {
    return []
  }
}

function saveMessages(messages: ChatMessage[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
}

export default function PrimexusAiChat() {
  const { t, i18n } = useTranslation()
  const { isOpen, openChat, closeChat } = useAiChat()
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadStoredMessages())
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const initializedRef = useRef(false)

  const suggestions = [
    t('aiChat.suggestions.services'),
    t('aiChat.suggestions.careers'),
    t('aiChat.suggestions.locations'),
    t('aiChat.suggestions.contact'),
  ]

  useEffect(() => {
    saveMessages(messages)
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0 && !initializedRef.current) {
      initializedRef.current = true
      setMessages([
        {
          id: createId(),
          role: 'assistant',
          content: t('aiChat.greeting'),
          createdAt: Date.now(),
        },
      ])
    }
  }, [isOpen, messages.length, t])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, messages, isTyping])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    setError('')
    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: trimmed,
      createdAt: Date.now(),
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setIsTyping(true)

    try {
      const reply = await sendChatMessage({
        messages: nextMessages,
        language: i18n.language,
      })

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: 'assistant',
          content: reply,
          createdAt: Date.now(),
        },
      ])
    } catch {
      setError(t('aiChat.error'))
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    void sendMessage(input)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage(input)
    }
  }

  return (
    <>
      {!isOpen ? (
        <button
          type="button"
          className="ai-chat-launcher"
          onClick={openChat}
          aria-label={t('aiChat.open')}
        >
          <span className="ai-chat-launcher-icon" aria-hidden="true">🤖</span>
          <span className="ai-chat-launcher-text">{t('aiChat.launcher')}</span>
          <span className="ai-chat-launcher-pulse" aria-hidden="true" />
        </button>
      ) : null}

      <div
        className={`ai-chat-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('aiChat.title')}
        aria-hidden={!isOpen}
      >
        <header className="ai-chat-header">
          <div className="ai-chat-header-info">
            <div className="ai-chat-avatar" aria-hidden="true">
              <span className="ai-chat-avatar-wave">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="ai-chat-avatar-bar" style={{ '--i': i } as CSSProperties} />
                ))}
              </span>
            </div>
            <div>
              <strong>{t('aiChat.title')}</strong>
              <span className="ai-chat-status">
                <span className="ai-chat-status-dot" aria-hidden="true" />
                {t('aiChat.online')}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="ai-chat-close"
            onClick={closeChat}
            aria-label={t('aiChat.close')}
          >
            ✕
          </button>
        </header>

        <div className="ai-chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`ai-chat-message ${message.role === 'user' ? 'user' : 'assistant'}`}
            >
              <div className="ai-chat-bubble">{message.content}</div>
            </div>
          ))}

          {isTyping ? (
            <div className="ai-chat-message assistant">
              <div className="ai-chat-bubble ai-chat-typing">
                <span /><span /><span />
              </div>
            </div>
          ) : null}

          {error ? <p className="ai-chat-error" role="alert">{error}</p> : null}

          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 1 && !isTyping ? (
          <div className="ai-chat-suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="ai-chat-suggestion"
                onClick={() => void sendMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}

        <form className="ai-chat-input-row" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('aiChat.placeholder')}
            rows={1}
            disabled={isTyping}
            aria-label={t('aiChat.placeholder')}
          />
          <button type="submit" className="ai-chat-send" disabled={!input.trim() || isTyping} aria-label={t('aiChat.send')}>
            ➤
          </button>
        </form>

        <p className="ai-chat-footer">{t('aiChat.footer')}</p>
      </div>
    </>
  )
}
