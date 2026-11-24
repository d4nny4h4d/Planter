import { useSyncExternalStore } from 'react'

export interface Route {
  path: string
  parts: string[]
  query: URLSearchParams
}

let lastNav: 'push' | 'pop' = 'pop'
let pending = false

function read(): string {
  return window.location.hash.slice(1) || '/'
}

function subscribe(cb: () => void) {
  const on = () => {
    lastNav = pending ? 'push' : 'pop'
    pending = false
    cb()
  }
  window.addEventListener('hashchange', on)
  return () => window.removeEventListener('hashchange', on)
}

export function useRoute(): Route {
  const raw = useSyncExternalStore(subscribe, read)
  const [path, search = ''] = raw.split('?')
  return { path, parts: path.split('/').filter(Boolean), query: new URLSearchParams(search) }
}

export function navigate(to: string, opts: { replace?: boolean } = {}) {
  if (read() === to) return
  pending = true
  if (opts.replace) window.location.replace(`#${to}`)
  else window.location.hash = to
}

export function back(fallback = '/') {
  if (window.history.length > 1) window.history.back()
  else navigate(fallback, { replace: true })
}

export const wasPop = () => lastNav === 'pop'
