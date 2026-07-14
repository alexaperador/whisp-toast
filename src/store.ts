import type { ReactNode } from 'react'

export type WhispType = 'success' | 'error' | 'info' | 'alert' | 'default'

export interface WhispItem {
  id: number
  message: string
  type: WhispType
  icon?: ReactNode
  closing?: boolean
}

export interface WhispOptions {
  duration?: number
  icon?: ReactNode
}

type Listener = (whisps: WhispItem[]) => void

let whisps: WhispItem[] = []
let listeners: Listener[] = []
let idCounter = 0

function emit() {
  listeners.forEach((listener) => listener(whisps))
}

function normalizeOptions(options?: number | WhispOptions): WhispOptions {
  if (typeof options === 'number') return { duration: options }
  return options ?? {}
}

function addWhisp(message: string, type: WhispType = 'default', options?: number | WhispOptions) {
  const { duration = 3000, icon } = normalizeOptions(options)
  const id = idCounter++
  whisps = [{ id, message, type, icon }]
  emit()

  if (duration > 0) {
    setTimeout(() => removeWhisp(id), duration)
  }

  return id
}

function removeWhisp(id: number) {
  const whisp = whisps.find(w => w.id === id)

  if (!whisp || whisp.closing) return

  whisps = whisps.map(w =>
    w.id === id ? { ...w, closing: true } : w
  )

  emit()

  setTimeout(() => {
    whisps = whisps.filter(w => w.id !== id)
    emit()
  }, 250)
}

function subscribe(listener: Listener) {
  listeners.push(listener)
  listener(whisps)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

export const whisp = Object.assign(
  (message: string, options?: number | WhispOptions) => addWhisp(message, 'default', options),
  {
    success: (message: string, options?: number | WhispOptions) => addWhisp(message, 'success', options),
    error: (message: string, options?: number | WhispOptions) => addWhisp(message, 'error', options),
    info: (message: string, options?: number | WhispOptions) => addWhisp(message, 'info', options),
    alert: (message: string, options?: number | WhispOptions) => addWhisp(message, 'alert', options),
  }
)

export const whispStore = { subscribe, removeWhisp }