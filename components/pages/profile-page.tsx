"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { UserCircle } from "lucide-react"

type PageType = "home" | "janarym-ai" | "document-reader" | "profile" | "settings" | "get-support"

interface ProfilePageProps {
  onNavigate: (page: PageType) => void
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Профиль</h1>

        <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
          <div className="flex gap-6 mb-6">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-white flex-shrink-0">
              <UserCircle size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Имя пользователя</h2>
              <p className="text-gray-600">user@email.com</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
              <p className="text-sm text-gray-600 mb-2">Участник с</p>
              <p className="text-lg font-semibold text-gray-900">Ноябрь 2024</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">Предпочитаемый язык</p>
              <p className="text-lg font-semibold text-gray-900">Русский (Русский)</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200">
              <p className="text-sm text-gray-600 mb-2">Режим Доступности</p>
              <p className="text-lg font-semibold text-gray-900">Включен</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
          <h2 className="text-xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">Статистика</h2>
          <ul className="space-y-3">
            <li className="flex justify-between p-3 bg-orange-50 rounded-2xl border border-orange-200">
              <span className="text-gray-600">Документов Отсканировано</span>
              <span className="font-bold text-gray-900">42</span>
            </li>
            <li className="flex justify-between p-3 bg-blue-50 rounded-2xl border border-blue-200">
              <span className="text-gray-600">Изображений Проанализировано</span>
              <span className="font-bold text-gray-900">156</span>
            </li>
            <li className="flex justify-between p-3 bg-pink-50 rounded-2xl border border-pink-200">
              <span className="text-gray-600">Звонков Поддержки</span>
              <span className="font-bold text-gray-900">8</span>
            </li>
          </ul>
        </Card>

        <Button
          onClick={() => onNavigate("settings")}
          className="w-full gradient-primary text-white font-bold py-4 rounded-2xl touch-target hover:shadow-lg transition-all mb-4"
          aria-label="Перейти к настройкам"
        >
          Редактировать Профиль
        </Button>

        <Button
          onClick={() => onNavigate("home")}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-2xl transition-all"
          aria-label="Вернуться домой"
        >
          Домой
        </Button>
      </div>
    </div>
  )
}
