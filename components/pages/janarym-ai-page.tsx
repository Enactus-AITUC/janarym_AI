"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"

type PageType = "home" | "janarym-ai" | "document-reader" | "profile" | "settings" | "get-support"

interface JanaryAIPageProps {
  onNavigate: (page: PageType) => void
}

export default function JanaryAIPage({ onNavigate }: JanaryAIPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      const errorMessage = err instanceof Error ? err.message : "Невозможно получить доступ к камере."
      setError(errorMessage)
    }
  }

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      try {
        const context = canvasRef.current.getContext("2d")
        if (context) {
          canvasRef.current.width = videoRef.current.videoWidth
          canvasRef.current.height = videoRef.current.videoHeight
          context.drawImage(videoRef.current, 0, 0)
          const imageData = canvasRef.current.toDataURL("image/jpeg", 0.95)
          setCapturedImage(imageData)
          analyzeImage(imageData)
        }
      } catch (err) {
        setError("Ошибка при захвате изображения.")
      }
    }
  }

  const analyzeImage = async (imageData: string) => {
    setLoading(true)
    setDescription("")
    setError(null)

    try {
      const base64Image = imageData.replace("data:image/jpeg;base64,", "")

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
                    text: "Describe this image in detail in Russian. Be specific about objects, text, colors, and spatial relationships.",
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

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Невозможно проанализировать изображение"
      setDescription(text)
      speakText(text)
    } catch (err) {
      const errorMsg =
        err instanceof Error && err.name === "AbortError" ? "Анализ истек по времени." : "Ошибка анализа."
      setError(errorMsg)
      setDescription("")
    } finally {
      setLoading(false)
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "ru-RU"
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1
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
      setError(null)
    }
  }

  const retakePicture = () => {
    setCapturedImage(null)
    setDescription("")
    setError(null)
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">ИИ Помощник</h1>

        {error && (
          <Alert className="mb-6 border-0 bg-red-50 rounded-2xl">
            <AlertDescription className="text-red-700 font-semibold">{error}</AlertDescription>
          </Alert>
        )}

        {!capturedImage ? (
          <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Сканер Камеры</h2>

            {!cameraActive ? (
              <Button
                onClick={startCamera}
                className="w-full gradient-primary text-white font-bold py-4 text-lg rounded-2xl touch-target hover:shadow-lg transition-all"
                aria-label="Активировать камеру"
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
                  aria-label="Предпросмотр камеры"
                />
                <canvas ref={canvasRef} className="hidden" />

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={takePicture}
                    disabled={loading}
                    className="gradient-accent text-white font-bold py-4 rounded-2xl touch-target disabled:opacity-50 hover:shadow-lg transition-all"
                    aria-label="Сделать снимок"
                  >
                    {loading ? "Анализ..." : "Снимок"}
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
        ) : (
          <Card className="p-6 border-0 bg-white card-elevated rounded-3xl mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Анализ Изображения</h2>

            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Захваченное изображение для анализа"
              className="w-full rounded-2xl mb-4 border-2 border-gray-200 max-h-64 object-cover"
            />

            {loading ? (
              <div className="text-center py-8 flex flex-col items-center gap-4">
                <Spinner className="w-8 h-8" />
                <p className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">Анализ...</p>
              </div>
            ) : description ? (
              <div className="bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-200">
                <p className="text-lg leading-relaxed text-gray-900">{description}</p>
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={retakePicture}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-2xl touch-target transition-all"
                aria-label="Переснять изображение"
              >
                Переснять
              </Button>
              {description && (
                <Button
                  onClick={() => speakText(description)}
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
