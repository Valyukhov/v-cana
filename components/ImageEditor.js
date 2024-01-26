import { useState, useRef, useEffect } from 'react'

import axios from 'axios'
import toast from 'react-hot-toast'

import Resize from 'public/minimize_icon.svg'

function ImageEditor({ selectedFile, id, updateAvatar, t, setSelectedFile }) {
  const canvasRef = useRef(null)
  const parentRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 })
  const [maxCropSize, setMaxCropSize] = useState(300)
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, size: maxCropSize })

  const updateCropArea = (posX, posY) => {
    if (!isDragging || !canvasRef.current) return

    const dx = posX - startDrag.x
    const dy = posY - startDrag.y

    setCropArea((prev) => {
      let newX = Math.max(0, Math.min(prev.x + dx, canvasRef.current.width - prev.size))
      let newY = Math.max(0, Math.min(prev.y + dy, canvasRef.current.height - prev.size))

      return { ...prev, x: newX, y: newY }
    })

    setStartDrag({ x: posX, y: posY })
  }

  const getTouchCoords = (touchEvent) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    }
  }

  const onTouchStart = (e) => {
    const coords = getTouchCoords(e)
    setStartDrag({ x: coords.x, y: coords.y })
    setIsDragging(true)
  }

  const onTouchMove = (e) => {
    e.preventDefault()
    const coords = getTouchCoords(e)
    updateCropArea(coords.x, coords.y)
  }

  const onMouseDown = (e) => {
    setStartDrag({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    setIsDragging(true)
  }

  const onMouseMove = (e) => {
    updateCropArea(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  const onMouseUp = () => {
    setIsDragging(false)
  }

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  const onCropSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10)
    const canvas = canvasRef.current
    if (!canvas) return

    setCropArea((prev) => {
      const maxX = canvas.width - prev.x
      const maxY = canvas.height - prev.y
      const adjustedSize = Math.min(newSize, maxX, maxY)

      return {
        ...prev,
        size: adjustedSize,
      }
    })
  }

  const handleCrop = async () => {
    const canvas = canvasRef.current
    if (!canvas || !cropArea) return

    const croppedCanvas = document.createElement('canvas')
    croppedCanvas.width = cropArea.size
    croppedCanvas.height = cropArea.size
    const croppedCtx = croppedCanvas.getContext('2d')

    croppedCtx.drawImage(
      canvas,
      cropArea.x,
      cropArea.y,
      cropArea.size,
      cropArea.size,
      0,
      0,
      cropArea.size,
      cropArea.size
    )

    const base64Image = croppedCanvas.toDataURL('image/png')
    const formData = new FormData()
    formData.append('file', base64Image)
    formData.append('userId', id)

    try {
      const response = await axios.post('/api/users/avatar_upload', formData)
      if (response.status === 200) {
        const { url } = response.data
        updateAvatar(id, url)
        setSelectedFile(null)
      } else {
        toast.error(t('UploadFailed'))
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
      toast.error(t('UploadFailed'))
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = parentRef.current

    if (canvas && parent && selectedFile) {
      const ctx = canvas.getContext('2d')
      const newImage = new Image()
      newImage.src = URL.createObjectURL(selectedFile)

      newImage.onload = () => {
        let { width, height } = newImage
        const maxCanvasWidth = parent.offsetWidth
        const maxCanvasHeight = parent.offsetHeight

        const scaleX = maxCanvasWidth / width
        const scaleY = maxCanvasHeight / height
        const scale = Math.min(scaleX, scaleY)

        if (scale < 1) {
          width *= scale
          height *= scale
        }

        setMaxCropSize(Math.min(width, height))

        canvas.width = width
        canvas.height = height
        ctx.drawImage(newImage, 0, 0, width, height)
        drawShading(ctx, canvas.width, canvas.height, cropArea)
        drawCropArea(ctx, cropArea)
      }
    }
  }, [cropArea, selectedFile])

  useEffect(() => {
    setCropArea((prev) => ({
      ...prev,
      size: maxCropSize,
    }))
  }, [maxCropSize])

  function drawShading(ctx, canvasWidth, canvasHeight, { x, y, size }) {
    size = Math.round(size)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'

    ctx.fillRect(0, 0, canvasWidth, y)
    ctx.fillRect(0, y + size, canvasWidth, canvasHeight - y - size)
    ctx.fillRect(0, y, x, size)
    ctx.fillRect(x + size, y, canvasWidth - x - size, size)
  }

  function drawCropArea(ctx, { x, y, size }) {
    ctx.strokeRect(x, y, size, size)
  }

  useEffect(() => {
    const rangeSlider = document.getElementById('rangeSlider')
    const updateSliderTrack = () => {
      const percentage =
        ((rangeSlider.value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min)) *
        100
      rangeSlider.style.setProperty('--slider-pos', `${percentage}%`)
    }

    rangeSlider.addEventListener('input', updateSliderTrack)
    updateSliderTrack()

    return () => {
      rangeSlider.removeEventListener('input', updateSliderTrack)
    }
  }, [maxCropSize])

  return (
    <div ref={parentRef} className="overflow-auto">
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black', width: '100%', height: 'auto' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
      <div className="flex justify-between w-full mt-6 gap-5">
        <div className="flex items-center gap-3">
          <Resize className="w-6 h-6 stroke-th-text-primary" />
          <input
            id="rangeSlider"
            type="range"
            min="65"
            max={maxCropSize}
            value={cropArea.size}
            onChange={onCropSizeChange}
          />
        </div>
        <div className="bg-th-secondary-10">
          <button onClick={handleCrop} className="btn-primary">
            {t('Save')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageEditor
