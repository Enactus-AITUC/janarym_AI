"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"

type PageType = "home" | "janarym-ai" | "document-reader" | "profile" | "settings" | "get-support"

interface DocumentReaderPageProps {
  onNavigate: (page: PageType) => void
}

export default function DocumentReaderPage({ onNavigate }: DocumentReaderPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
      window.speechSynthesis.cancel()
    }
  }, [])

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      setError("Невозможно получить доступ к камере.")
    }
  }

  const capturePage = () => {
    if (videoRef.current && canvasRef.current) {
      try {
        const context = canvasRef.current.getContext("2d")
        if (context) {
          canvasRef.current.width = videoRef.current.videoWidth
          canvasRef.current.height = videoRef.current.videoHeight
          context.drawImage(videoRef.current, 0, 0)
          const imageData = canvasRef.current.toDataURL("image/jpeg", 0.95)
          setCapturedImage(imageData)
          extractText(imageData)
        }
      } catch (err) {
        setError("Ошибка при захвате документа.")
      }
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        setError("Файл слишком большой. Пожалуйста, выберите меньший файл.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setCapturedImage(imageData)
        setFileName(file.name)
        extractText(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const extractText = async (imageData: string) => {
    setLoading(true)
    setExtractedText("")
    setError(null)

    try {
      const base64Image = imageData.replace(/^data:image\/(jpeg|png|webp|gif);base64,/, "")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyARQyVIj14KqqY8hRS4k_re3wLrMMasxUQ",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Extract and transcribe all the text from this document image. Return only the extracted text in Russian.",
                  },
                  { inline_data: { mime_type: "image/jpeg", data: base64Image } },
                ],
              },
            ],
          }),
          signal: controller.signal,
        },
      )

      clearTimeout(timeoutId)

      if (!response.ok) throw new Error(`API error: ${response.status}`)

      const data = await response.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Текст не найден"
      setExtractedText(text)
      speakText(text)
    } catch (err) {
      setError("Ошибка при извлечении текста.")
      setExtractedText("")
    } finally {
      setLoading(false)
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "ru-RU"
      utterance.rate = 0.9
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setCameraActive(false)
    }
  }

  const reset = () => {
    setCapturedImage(null)
    setExtractedText("")
    setFileName(null)
    setError(null)
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Сканер Документов</h1>

        {error && (
          <Alert className="mb-6 border-0 bg-red-50 rounded-2xl">
            <AlertDescription className="text-red-700 font-semibold">{error}</AlertDescription>
          </Alert>
        )}

        {!capturedImage ? (
          <>
            <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Загрузить Документ</h2>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full gradient-primary text-white font-bold py-4 text-lg rounded-2xl touch-target hover:shadow-lg transition-all"
                aria-label="Загрузить фотографию документа"
              >
                Загрузить Фото
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                aria-label="Ввод файла"
              />
            </Card>

            <div className="text-center text-gray-400 mb-6 font-semibold">или</div>

            <Card className="p-6 border-0 bg-white card-elevated rounded-3xl">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Сканировать Камерой</h2>

              {!cameraActive ? (
                <Button
                  onClick={startCamera}
                  className="w-full gradient-accent text-white font-bold py-4 text-lg rounded-2xl touch-target hover:shadow-lg transition-all"
                  aria-label="Активировать камеру для сканирования"
                >
                  Включить Камеру
                </Button>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-2xl mb-4 border-2 border-gray-200"
                    aria-label="Предпросмотр камеры для сканирования документов"
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={capturePage}
                      disabled={loading}
                      className="gradient-primary text-white font-bold py-4 rounded-2xl touch-target disabled:opacity-50 hover:shadow-lg transition-all"
                      aria-label="Захватить страницу"
                    >
                      {loading ? "Извлечение..." : "Снимок"}
                    </Button>
                    <Button
                      onClick={stopCamera}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-2xl touch-target transition-all"
                      aria-label="Закрыть камеру"
                    >
                      Закрыть
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </>
        ) : (
          <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Извлеченный Текст</h2>
            {fileName && <p className="text-sm text-gray-600 mb-3">Файл: {fileName}</p>}

            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Отсканированный документ"
              className="w-full rounded-2xl mb-4 border-2 border-gray-200 max-h-64 object-cover"
            />

            {loading ? (
              <div className="text-center py-8 flex flex-col items-center gap-4">
                <Spinner className="w-8 h-8" />
                <p className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">Извлечение...</p>
              </div>
            ) : extractedText ? (
              <div className="bg-orange-50 p-4 rounded-2xl mb-4 max-h-80 overflow-y-auto border border-orange-200">
                <p className="text-lg leading-relaxed text-gray-900 whitespace-pre-wrap">{extractedText}</p>
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={reset}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-2xl touch-target transition-all"
                aria-label="Сканировать еще один документ"
              >
                Заново
              </Button>
              {extractedText && !extractedText.includes("Unable") && (
                <Button
                  onClick={() => speakText(extractedText)}
                  disabled={isSpeaking}
                  className="gradient-accent text-white font-bold py-4 rounded-2xl touch-target disabled:opacity-50 hover:shadow-lg transition-all"
                  aria-label={isSpeaking ? "Говорит" : "Читать вслух"}
                >
                  {isSpeaking ? "Говорит..." : "Читать"}
                </Button>
              )}
            </div>
          </Card>
        )}

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
