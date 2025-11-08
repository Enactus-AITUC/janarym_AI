"use client"

import { Button } from "@/components/ui/button"
import { Home, Sparkles, FileText, HelpCircle, User } from "lucide-react"

type PageType = "home" | "janarym-ai" | "document-reader" | "profile" | "settings" | "get-support"

interface NavigationProps {
  currentPage: PageType
  onNavigate: (page: PageType) => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Главная", icon: Home },
    { id: "janarym-ai", label: "ИИ Помощник", icon: Sparkles },
    { id: "document-reader", label: "Документы", icon: FileText },
    { id: "get-support", label: "Поддержка", icon: HelpCircle },
    { id: "profile", label: "Профиль", icon: User },
  ] as const

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200"
      aria-label="Основная навигация"
    >
      <div className="flex gap-2 justify-around w-full px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              onClick={() => onNavigate(item.id as PageType)}
              className={`flex-1 touch-target rounded-2xl border-0 h-auto py-3 font-semibold transition-all duration-300 ${
                currentPage === item.id
                  ? "bg-gradient-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-current={currentPage === item.id ? "page" : undefined}
              aria-label={`${item.label}${currentPage === item.id ? ", текущая страница" : ""}`}
            >
              <span className="flex flex-col items-center gap-1">
                <Icon size={20} className="flex-shrink-0" aria-hidden="true" />
                <span className="text-xs">{item.label}</span>
              </span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
