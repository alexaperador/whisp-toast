'use client'

import { ReactNode, useEffect, useState } from 'react'
import { whispStore, WhispItem, WhispType } from './store'
import './styles.css'
import { icon } from './icons/icons'

const defaultIcons: Record<WhispType, ReactNode> = {
  success: icon.success,
  error: icon.error,
  info: icon.info,
  alert: icon.alert,
  default: null,
}

export interface WhisperProps {
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'
}

export function Whisper({ position = 'top-center' }: WhisperProps) {
  const [whisps, setWhisps] = useState<WhispItem[]>([])

  useEffect(() => {
    const unsubscribe = whispStore.subscribe(setWhisps)
    return unsubscribe
  }, [])

  const [vertical, horizontal] = position.split('-')

  return (
    <div
      className="whisp-container"
      data-vertical={vertical}
      data-horizontal={horizontal}
    >
      {whisps.map((w) => {
        const iconToShow = w.icon ?? defaultIcons[w.type]

        return (
          <div
            key={w.id}
            className={`whisp-card whisp-${w.type} ${w.closing ? 'whisp-out' : ''}`}
            onClick={() => whispStore.removeWhisp(w.id)}
          >
            {iconToShow && <span className="whisp-icon">{iconToShow}</span>}
            <span className="whisp-message">{w.message}</span>
          </div>
        )
      })}
    </div>
  )
}