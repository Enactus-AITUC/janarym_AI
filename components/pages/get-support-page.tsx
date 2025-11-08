"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Video, Mail, MessageCircle, Phone } from "lucide-react"

type PageType = "home" | "janarym-ai" | "document-reader" | "profile" | "settings" | "get-support"

interface GetSupportPageProps {
  onNavigate: (page: PageType) => void
}

export default function GetSupportPage({ onNavigate }: GetSupportPageProps) {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      setSubmitted(true)
      setTimeout(() => {
        setContactForm({ name: "", email: "", message: "" })
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Поддержка</h1>

        <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">Видео Поддержка</h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            Свяжитесь со специалистом поддержки по видеозвонку для персональной помощи.
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6 border-2 border-blue-200 flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Video size={64} className="text-blue-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">Область предпросмотра видеозвонка</p>
              <p className="text-sm text-gray-600 mt-2">Интеграция с Jitsi Meet или подобным сервисом</p>
            </div>
          </div>

          <Button
            className="w-full gradient-primary text-white font-bold py-4 text-lg rounded-2xl touch-target hover:shadow-lg transition-all disabled:opacity-50"
            aria-label="Начать видеозвонок поддержки"
            disabled
          >
            Видео Поддержка (Скоро)
          </Button>
        </Card>

        <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            Варианты Поддержки
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                <p className="text-sm text-gray-600">support@janarym.ai</p>
              </div>
            </li>
            <li className="flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0">
                <MessageCircle size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Чат</h3>
                <p className="text-sm text-gray-600">Доступно 24/7 на русском</p>
              </div>
            </li>
            <li className="flex gap-4 p-4 bg-pink-50 rounded-2xl border border-pink-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Телефон</h3>
                <p className="text-sm text-gray-600">+7 (XXX) XXX-XX-XX</p>
              </div>
            </li>
          </ul>
        </Card>

        <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Свяжитесь с нами</h2>
          {submitted && (
            <div className="gradient-primary text-white rounded-2xl p-4 mb-4">
              <p className="font-semibold">Спасибо! Ваше сообщение отправлено.</p>
            </div>
          )}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={contactForm.name}
              onChange={handleFormChange}
              className="w-full bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-2xl p-3 font-semibold placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Ваше имя"
            />
            <input
              type="email"
              name="email"
              placeholder="Ваш Email"
              value={contactForm.email}
              onChange={handleFormChange}
              className="w-full bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-2xl p-3 font-semibold placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Ваш email"
            />
            <textarea
              name="message"
              placeholder="Ваше сообщение"
              value={contactForm.message}
              onChange={handleFormChange}
              rows={4}
              className="w-full bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-2xl p-3 font-semibold placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 transition-colors"
              aria-label="Ваше сообщение"
            />
            <Button
              onClick={handleFormSubmit}
              disabled={!contactForm.name || !contactForm.email || !contactForm.message || submitted}
              className="w-full gradient-accent text-white font-bold py-4 rounded-2xl touch-target disabled:opacity-50 hover:shadow-lg transition-all"
              aria-label="Отправить сообщение поддержки"
            >
              {submitted ? "Отправлено!" : "Отправить"}
            </Button>
          </div>
        </Card>

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
