"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Sparkles, Wand2, Zap, Eye } from "lucide-react"

type PageType = "home" | "janarym-ai" | "document-reader" | "profile" | "settings" | "get-support"

interface HomePageProps {
  onNavigate: (page: PageType) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-6 md:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <Image
            src="/janarym.png"
            alt="Janarym AI Logo"
            width={120}
            height={120}
            className="drop-shadow-lg"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-orange-500 via-blue-600 to-pink-600 bg-clip-text text-transparent">
          Janarym AI
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">Помощник для слепых и слабовидящих</p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Janarym AI Card */}
          <Card className="p-6 border-0 bg-white card-elevated hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-3xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-full -mr-16 -mt-16" />
            <h2 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">ИИ Помощник</h2>
            <p className="mb-4 text-gray-700 leading-relaxed text-sm">
              Сфотографируйте предметы и получите голосовое описание с помощью ИИ.
            </p>
            <Button
              onClick={() => onNavigate("janarym-ai")}
              className="w-full gradient-primary text-white font-bold py-3 rounded-2xl touch-target hover:shadow-lg transition-all"
              aria-label="Откройте ИИ помощник"
            >
              Запустить ИИ
            </Button>
          </Card>

          {/* Document Reader Card */}
          <Card className="p-6 border-0 bg-white card-elevated hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-3xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-pink-600 opacity-10 rounded-full -mr-16 -mt-16" />
            <h2 className="text-2xl font-bold mb-2 bg-gradient-secondary bg-clip-text text-transparent">
              Сканер Документов
            </h2>
            <p className="mb-4 text-gray-700 leading-relaxed text-sm">
              Сканируйте документы и извлекайте текст с помощью OCR.
            </p>
            <Button
              onClick={() => onNavigate("document-reader")}
              className="w-full gradient-secondary text-white font-bold py-3 rounded-2xl touch-target hover:shadow-lg transition-all"
              aria-label="Откройте сканер документов"
            >
              Сканировать
            </Button>
          </Card>
        </div>

        {/* Features Grid */}
        <Card className="p-6 border-0 bg-gradient-to-br from-white to-blue-50 card-elevated rounded-3xl mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Возможности</h2>
          <ul className="space-y-4">
            <li className="flex gap-4 p-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white flex-shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Голосовое управление</h3>
                <p className="text-sm text-gray-600">Говорите команды и получайте голосовые ответы</p>
              </div>
            </li>
            <li className="flex gap-4 p-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center text-white flex-shrink-0">
                <Wand2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Камера</h3>
                <p className="text-sm text-gray-600">Распознавание объектов в реальном времени</p>
              </div>
            </li>
            <li className="flex gap-4 p-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white flex-shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Сканирование</h3>
                <p className="text-sm text-gray-600">Извлечение текста и голосовое чтение</p>
              </div>
            </li>
            <li className="flex gap-4 p-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white flex-shrink-0">
                <Eye size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Доступность</h3>
                <p className="text-sm text-gray-600">Разработано для людей с нарушением зрения</p>
              </div>
            </li>
          </ul>
        </Card>

        {/* Quick Action */}
        <Button
          onClick={() => onNavigate("get-support")}
          className="w-full gradient-accent text-white font-bold py-4 text-lg rounded-2xl touch-target hover:shadow-lg transition-all"
          aria-label="Получить живую поддержку"
        >
          Получить поддержку
        </Button>
      </div>
    </div>
  )
}
