"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type PageType = "home" | "janarym-ai" | "document-reader" | "profile" | "settings" | "get-support"

interface SettingsPageProps {
  onNavigate: (page: PageType) => void
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    language: "ru",
    voiceSpeed: 1,
    highContrast: true,
    largeText: true,
  })

  const [savedNotification, setSavedNotification] = useState(false)

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }))
    showSaveNotification()
  }

  const handleChange = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
    showSaveNotification()
  }

  const showSaveNotification = () => {
    setSavedNotification(true)
    setTimeout(() => setSavedNotification(false), 2000)
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Настройки</h1>

        {savedNotification && (
          <div className="mb-6 gradient-primary text-white rounded-2xl p-4">
            <p className="font-semibold">Настройки сохранены</p>
          </div>
        )}

        <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Доступность</h2>

          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="highContrast" className="font-semibold text-gray-900">
                  Режим Высокого Контраста
                </label>
                <button
                  id="highContrast"
                  onClick={() => handleToggle("highContrast")}
                  className={`w-14 h-8 rounded-full transition-colors touch-target ${
                    settings.highContrast ? "bg-orange-500" : "bg-gray-300"
                  }`}
                  aria-label={`Режим высокого контраста ${settings.highContrast ? "включен" : "отключен"}`}
                  role="switch"
                  aria-checked={settings.highContrast}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white transition-transform ${
                      settings.highContrast ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-gray-600">Увеличьте контраст для лучшей видимости</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="largeText" className="font-semibold text-gray-900">
                  Большой Текст
                </label>
                <button
                  id="largeText"
                  onClick={() => handleToggle("largeText")}
                  className={`w-14 h-8 rounded-full transition-colors touch-target ${
                    settings.largeText ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  aria-label={`Большой текст ${settings.largeText ? "включен" : "отключен"}`}
                  role="switch"
                  aria-checked={settings.largeText}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white transition-transform ${
                      settings.largeText ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-gray-600">Использовать больший размер шрифта</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Параметры Звука</h2>

          <div className="space-y-4">
            <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200">
              <label htmlFor="language" className="font-semibold text-gray-900 mb-2 block">
                Язык
              </label>
              <select
                id="language"
                value={settings.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="w-full bg-white text-gray-900 border-2 border-pink-300 rounded-2xl p-3 font-semibold touch-target focus:outline-none focus:border-pink-500"
                aria-label="Выберите язык"
              >
                <option value="ru">Русский (Russian)</option>
                <option value="en">English</option>
                <option value="kk">Қазақ (Kazakh)</option>
              </select>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
              <label htmlFor="voiceSpeed" className="font-semibold text-gray-900 mb-4 block">
                Скорость голоса: {settings.voiceSpeed.toFixed(1)}x
              </label>
              <input
                id="voiceSpeed"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.voiceSpeed}
                onChange={(e) => handleChange("voiceSpeed", Number.parseFloat(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-orange-500 via-blue-500 to-pink-600 rounded-lg appearance-none cursor-pointer"
                aria-label="Отрегулировать скорость голоса"
              />
              <p className="text-sm text-gray-600 mt-2">Медленнее: 0.5x — Нормально: 1.0x — Быстрее: 2.0x</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">О приложении</h2>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="text-gray-600">Версия приложения</span>
              <span className="font-bold text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="text-gray-600">Сборка</span>
              <span className="font-bold text-gray-900">Beta</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="text-gray-600">Языковой пакет</span>
              <span className="font-bold text-gray-900">Русский (RU)</span>
            </div>
          </div>
        </Card>

        <Button
          onClick={() => onNavigate("profile")}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-2xl transition-all"
          aria-label="Вернуться в профиль"
        >
          Вернуться в Профиль
        </Button>
      </div>
    </div>
  )
}
