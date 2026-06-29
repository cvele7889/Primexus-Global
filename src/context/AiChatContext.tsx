import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type AiChatContextValue = {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

const AiChatContext = createContext<AiChatContextValue | null>(null)

export function AiChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openChat = useCallback(() => setIsOpen(true), [])
  const closeChat = useCallback(() => setIsOpen(false), [])
  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), [])

  const value = useMemo(
    () => ({ isOpen, openChat, closeChat, toggleChat }),
    [isOpen, openChat, closeChat, toggleChat],
  )

  return <AiChatContext.Provider value={value}>{children}</AiChatContext.Provider>
}

export function useAiChat() {
  const context = useContext(AiChatContext)
  if (!context) {
    throw new Error('useAiChat must be used within AiChatProvider')
  }
  return context
}
