# whisp-toast

<p align="center">
  <b>Lightweight toast notifications for React and Next.js.</b>
  <br />
  Zero dependencies. Global API. Fully customizable.
</p>

<p align="center">

![npm version](https://img.shields.io/npm/v/whisp-toast)
![npm downloads](https://img.shields.io/npm/dm/whisp-toast)
![license](https://img.shields.io/npm/l/whisp-toast)
![typescript](https://img.shields.io/badge/TypeScript-supported-blue)

</p>

---

## Overview

**whisp-toast** is a lightweight toast notification library built for modern React and Next.js applications.

Trigger notifications from anywhere with a simple global API:

```tsx
whisp.success("Saved successfully")
```

No providers.
No hooks.
No refs.
No configuration.

Just mount `Whisper` once and start sending notifications.

---

# Features

* 🪶 **Zero dependencies**

  * Minimal bundle size and simple integration.

* 🌐 **Global API**

  * Trigger notifications from components, utilities, async functions, and event handlers.

* ⚡ **React & Next.js optimized**

  * Works seamlessly with modern application architectures.

* 🔒 **First-class TypeScript support**

  * Fully typed API and exported types.

* 🎨 **CSS variable customization**

  * Easily adapt colors, radius, borders, and themes.

* 🖼️ **Custom icons**

  * Use emojis, SVGs, or any React node.

* 📍 **Flexible positioning**

  * Six different screen positions.

* 🌙 **Dark mode friendly**

  * Built to work with custom themes.

---

# Installation

```bash
npm install whisp-toast
```

or:

```bash
pnpm add whisp-toast
```

or:

```bash
yarn add whisp-toast
```

---

# Quick Start

## 1. Add `Whisper`

Mount the component once in your application root.

### Next.js App Router

```tsx
// app/layout.tsx

import { Whisper } from "whisp-toast"

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

## 2. Trigger notifications

Use `whisp` anywhere.

```tsx
"use client"

import { whisp } from "whisp-toast"

export default function Button() {
  const handleClick = async () => {
    try {
      await saveData()

      whisp.success("Changes saved")
    } catch {
      whisp.error("Something went wrong")
    }
  }

  return (
    <button onClick={handleClick}>
      Save
    </button>
  )
}
```

No CSS imports required. Styles are bundled automatically.

---

# API

## Default toast

Create a simple notification:

```ts
whisp("Hello world")
```

With options:

```ts
whisp("Hello world", {
  duration: 5000,
})
```

---

# Toast Types

Built-in variants:

```ts
whisp.success("Operation completed")

whisp.error("Request failed")

whisp.info("New notification")

whisp.alert("Attention required")
```

---

# Options

Every toast accepts:

* duration number
* options object

## Duration shorthand

```ts
whisp.success(
  "Saved",
  5000
)
```

## Options object

```ts
whisp.success(
  "Saved",
  {
    duration: 5000,
    icon: "🎉",
  }
)
```

---

## Available options

| Option     | Type        | Default       | Description      |
| ---------- | ----------- | ------------- | ---------------- |
| `duration` | `number`    | `3000`        | Auto close delay |
| `icon`     | `ReactNode` | Built-in icon | Custom icon      |

Set:

```ts
duration: 0
```

to keep the toast visible permanently.

All notifications can also be dismissed manually by clicking them.

---

# Whisper Component

`Whisper` renders and manages all toast notifications.

It should only be mounted once.

## Props

| Prop       | Values                                                                                | Default      |
| ---------- | ------------------------------------------------------------------------------------- | ------------ |
| `position` | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right` | `top-center` |

Example:

```tsx
<Whisper position="top-right" />
```

---

# Custom Icons

Every toast type includes a default SVG icon.

You can replace it:

## Emoji

```ts
whisp.info(
  "Uploading...",
  {
    icon: "⏳",
  }
)
```

## Custom React component

```tsx
whisp.success(
  "Completed",
  {
    icon: <CheckIcon />,
  }
)
```

## Disable icons

```ts
whisp.success(
  "No icon",
  {
    icon: null,
  }
)
```

---

# Custom Styling

whisp-toast uses CSS variables for complete customization.

Example:

```css
:root {
  --whisp-bg: #ffffff;
  --whisp-text: #111111;
  --whisp-border: rgba(0,0,0,.1);
  --whisp-radius: 12px;

  --whisp-success-bg: #22c55e;
  --whisp-error-bg: #ef4444;
  --whisp-info-bg: #3b82f6;
  --whisp-alert-bg: #f59e0b;
}
```

---

# CSS Variables Reference

| Variable                | Description        |
| ----------------------- | ------------------ |
| `--whisp-bg`            | Toast background   |
| `--whisp-text`          | Text color         |
| `--whisp-border`        | Border color       |
| `--whisp-radius`        | Border radius      |
| `--whisp-success-bg`    | Success background |
| `--whisp-success-color` | Success foreground |
| `--whisp-error-bg`      | Error background   |
| `--whisp-error-color`   | Error foreground   |
| `--whisp-info-bg`       | Info background    |
| `--whisp-info-color`    | Info foreground    |
| `--whisp-alert-bg`      | Alert background   |
| `--whisp-alert-color`   | Alert foreground   |

---

# Dark Mode

Example:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --whisp-bg: #18181b;
    --whisp-text: #fafafa;
    --whisp-border: rgba(255,255,255,.1);
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
} from "whisp-toast"
```

---

# Comparison

| Library         | Zero Dependencies | Provider Required | Global API |
| --------------- | ----------------- | ----------------- | ---------- |
| whisp-toast     | ✅                 | ❌                 | ✅          |
| Sonner          | ✅                 | ❌                 | ✅          |
| React Hot Toast | ✅                 | ❌                 | ❌          |
| React Toastify  | ❌                 | ✅                 | ❌          |

---

# Contributing

Contributions, issues, and feature requests are welcome.

Feel free to open a discussion or submit a pull request.

---

# License

MIT © whisp-toast contributors
