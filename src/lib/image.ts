import { del, get, set } from 'idb-keyval'
import { uid } from './util'

function draw(source: CanvasImageSource, w: number, h: number, max: number, quality: number) {
  const scale = Math.min(1, max / Math.max(w, h))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(w * scale)
  canvas.height = Math.round(h * scale)
  canvas.getContext('2d')!.drawImage(source, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', quality)
}

/** Downscale a picked file to a JPEG data URL. */
export async function fileToDataUrl(file: Blob, max = 1280, quality = 0.82): Promise<string> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  try {
    return draw(bitmap, bitmap.width, bitmap.height, max, quality)
  } finally {
    bitmap.close()
  }
}

export function videoFrameToDataUrl(video: HTMLVideoElement, max = 1280, quality = 0.82) {
  return draw(video, video.videoWidth, video.videoHeight, max, quality)
}

export const base64Of = (dataUrl: string) => dataUrl.slice(dataUrl.indexOf(',') + 1)

const key = (id: string) => `photo:${id}`
const cache = new Map<string, string>()

export async function savePhoto(dataUrl: string) {
  const id = uid()
  cache.set(id, dataUrl)
  await set(key(id), dataUrl)
  return id
}

export async function loadPhoto(id: string) {
  const hit = cache.get(id)
  if (hit) return hit
  const data = await get<string>(key(id))
  if (data) cache.set(id, data)
  return data
}

export const cachedPhoto = (id: string) => cache.get(id)

export async function deletePhoto(id: string) {
  cache.delete(id)
  await del(key(id))
}
