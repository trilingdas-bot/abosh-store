"use client"

import { useState, useEffect, useRef } from "react"

interface IntroVideoProps {
  onVideoEnd: () => void
}

export function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      // Start fade out animation
      setIsFadingOut(true)

      // After fade animation completes, hide component and notify parent
      setTimeout(() => {
        setIsVisible(false)
        onVideoEnd()
      }, 800) // 800ms matches the fade transition duration
    }

    // Set up video event listeners
    video.addEventListener("ended", handleVideoEnd)
    video.addEventListener("loadeddata", () => {
      // Ensure video plays automatically once loaded
      video.play().catch(console.error)
    })

    const fallbackTimer = setTimeout(handleVideoEnd, 4000)

    return () => {
      video.removeEventListener("ended", handleVideoEnd)
      clearTimeout(fallbackTimer)
    }
  }, [onVideoEnd])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-800 ease-out ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "white" }} // Force white background on the entire overlay
    >
      <video
        ref={videoRef}
        className="w-auto h-auto max-w-md max-h-md object-contain bg-white"
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: "white",
        }}
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20video%20-%20Made%20with%20Clipchamp%20%281%29-Er6IQSm7GTxdLrbTJcAKBjQJWFsxU4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        onClick={() => {
          setIsFadingOut(true)
          setTimeout(() => {
            setIsVisible(false)
            onVideoEnd()
          }, 800)
        }}
        className="absolute bottom-8 right-8 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors duration-300 bg-gray-100/80 hover:bg-gray-200/90 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-300 shadow-sm"
      >
        Skip intro
      </button>
    </div>
  )
}
