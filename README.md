# whisp-toast

A lightweight toast notification library for React and Next.js. Zero dependencies, simple global API — trigger notifications from anywhere using `whisp.success('message')` without hooks, refs, or providers.

## Features

- 🪶 **Zero dependencies** — lightweight and framework-friendly
- 🌐 **Global API** — trigger toasts from components, event handlers, async functions, utilities, and more
- 🎨 **CSS variable customization** — fully customizable colors, borders, and appearance
- 🖼️ **Custom icons** — built-in icons by type or custom icons per toast
- 📍 **Flexible positioning** — 6 screen positions supported
- 🔒 **TypeScript support** — fully typed API and components
- ⚡ **React / Next.js optimized**

---

## Installation

```bash
npm install whisp-toast
```

---

## Basic Usage

### 1. Mount the `Whisper` component once

Add `Whisper` to your root layout:

```tsx
// app/layout.tsx
import { Whisper } from 'whisp-toast'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Whisper position="bottom-right" />
      </body>
    </html>
  )
}
```

---

### 2. Trigger notifications anywhere

Use `whisp` from client components, handlers, async functions, or utilities:

```tsx
'use client'

import { whisp } from 'whisp-toast'

export default function Form() {
  const handleSubmit = async () => {
    try {
      await fetch('/api/save', { method: 'POST' })
      whisp.success('Saved successfully!')
    } catch {
      whisp.error('Something went wrong')
    }
  }

  return (
    <button onClick={handleSubmit}>
      Save
    </button>
  )
}
```

No additional CSS imports are required. Styles are bundled automatically with the component.

---

# API

## `whisp(message, options?)`

Creates a default toast notification.

```tsx
whisp('Simple message')

whisp('Custom duration', {
  duration: 5000,
})
```

---

## Toast variants

```tsx
whisp.success('Successfully saved!')

whisp.error('Something went wrong')

whisp.info('You have a new notification')

whisp.alert('Attention required')
```

---

## Options

Every toast method accepts either:

- a number (duration in milliseconds)
- an options object

```tsx
// Duration shorthand
whisp.success('Done', 5000)

// Full options
whisp.success('Done', {
  duration: 5000,
  icon: '🎉',
})
```

### Available options

| Option | Type | Description |
|---|---|---|
| `duration` | `number` | Time before automatic dismissal. `0` disables auto close. Default: `3000` |
| `icon` | `ReactNode` | Custom icon for this specific toast |

All notifications can also be manually dismissed by clicking them.

---

# `<Whisper />`

The `Whisper` component should be mounted once in your application root.

## Props

| Prop | Values | Default |
|---|---|---|
| `position` | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right` | `top-center` |

Example:

```tsx
<Whisper position="top-left" />
```

---

# Custom Icons

Each toast type includes a default SVG icon with no external dependencies.

You can override icons per notification using any valid `ReactNode`:

- Emoji
- Strings
- SVG elements
- Icon libraries

Example:

```tsx
whisp('Uploading file...', {
  icon: '⏳',
})
```

Custom SVG:

```tsx
whisp.success('Deployed!', {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 7 17l-5-5" />
    </svg>
  ),
})
```

Disable the default icon:

```tsx
whisp.success('Without icon', {
  icon: null,
})
```

---

# Customization

whisp-toast exposes CSS variables for complete styling control.

Override them globally in your application:

```css
:root {
  --whisp-bg: #ffffff;
  --whisp-text: #111111;
  --whisp-border: rgba(0, 0, 0, 0.1);
  --whisp-radius: 12px;

  --whisp-success-bg: #10b981;
  --whisp-success-color: #052e16;

  --whisp-error-bg: #dc2626;
  --whisp-error-color: #450a0a;

  --whisp-info-bg: #6366f1;
  --whisp-info-color: #1e1b4b;

  --whisp-alert-bg: #eab308;
  --whisp-alert-color: #451a03;
}
```

No configuration is required. Default values are included out of the box.

---

## CSS Variables Reference

| Variable | Description | Default |
|---|---|---|
| `--whisp-bg` | Toast background | `#1a1a1a` |
| `--whisp-text` | Text color | `#f5f5f5` |
| `--whisp-border` | Toast border | `rgba(255,255,255,0.08)` |
| `--whisp-radius` | Border radius | `10px` |
| `--whisp-success-bg` / `--whisp-success-color` | Success icon colors | `#22c55e` / `#052e16` |
| `--whisp-error-bg` / `--whisp-error-color` | Error icon colors | `#ef4444` / `#450a0a` |
| `--whisp-info-bg` / `--whisp-info-color` | Info icon colors | `#3b82f6` / `#172554` |
| `--whisp-alert-bg` / `--whisp-alert-color` | Alert icon colors | `#f59e0b` / `#451a03` |

---

## Dark / Light mode example

```css
@media (prefers-color-scheme: light) {
  :root {
    --whisp-bg: #ffffff;
    --whisp-text: #111111;
    --whisp-border: rgba(0, 0, 0, 0.08);
  }
}
```

---

# TypeScript

All public types are exported:

```tsx
import type {
  WhispType,
  WhispItem,
  WhispOptions,
  WhisperProps,
} from 'whisp-toast'
```

---

# License

MIT © whisp-toast contributors
