"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HomePage from "@/components/pages/home-page"
import JanaryAIPage from "@/components/pages/janarym-ai-page"
import DocumentReaderPage from "@/components/pages/document-reader-page"
import ProfilePage from "@/components/pages/profile-page"
import SettingsPage from "@/components/pages/settings-page"
import GetSupportPage from "@/components/pages/get-support-page"

type PageType = "home" | "janarym-ai" | "document-reader" | "profile" | "settings" | "get-support"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")

  useEffect(() => {
    // Announce page changes for screen readers
    const announcement = `${currentPage.replace("-", " ")} page loaded`
    const ariaLive = document.createElement("div")
    ariaLive.setAttribute("aria-live", "polite")
    ariaLive.className = "sr-only"
    ariaLive.textContent = announcement
    document.body.appendChild(ariaLive)
    setTimeout(() => ariaLive.remove(), 1000)
  }, [currentPage])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 flex flex-col overflow-hidden">
        {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === "janarym-ai" && <JanaryAIPage onNavigate={setCurrentPage} />}
        {currentPage === "document-reader" && <DocumentReaderPage onNavigate={setCurrentPage} />}
        {currentPage === "profile" && <ProfilePage onNavigate={setCurrentPage} />}
        {currentPage === "settings" && <SettingsPage onNavigate={setCurrentPage} />}
        {currentPage === "get-support" && <GetSupportPage onNavigate={setCurrentPage} />}
      </main>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  )
}
