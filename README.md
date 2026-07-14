# whisp-toast

Toasts ligeros para React / Next.js. Cero dependencias, API global — llamá `whisp.success('mensaje')` desde cualquier parte de tu código, sin hooks ni refs ni providers.

- 🪶 Sin dependencias externas
- 🌐 API global — funciona fuera de componentes React (handlers, fetch, utils)
- 🎨 Colores personalizables por CSS variables
- 🖼️ Íconos personalizables, por tipo o por toast individual
- 📍 6 posiciones en pantalla
- 🔒 Tipado con TypeScript

## Instalación

```bash
npm install whisp-toast
```

## Uso básico

**1. Montá el componente `Whisper`** una sola vez, en tu layout raíz:

```tsx
// app/layout.tsx
import { Whisper } from 'whisp-toast'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Whisper position="bottom-right" />
      </body>
    </html>
  )
}
```

**2. Llamá `whisp` desde cualquier componente cliente, handler, o función async:**

```tsx
'use client'
import { whisp } from 'whisp-toast'

export default function Formulario() {
  const handleSubmit = async () => {
    try {
      await fetch('/api/guardar', { method: 'POST' })
      whisp.success('¡Guardado con éxito!')
    } catch {
      whisp.error('Algo salió mal')
    }
  }

  return <button onClick={handleSubmit}>Guardar</button>
}
```

No hace falta ningún import de estilos por separado — los estilos ya vienen incluidos al importar el componente.

## API

### `whisp(message, options?)`

Dispara un toast neutro (sin ícono por defecto).

```tsx
whisp('Mensaje simple')
whisp('Con duración custom', { duration: 5000 })
```

### Variantes por tipo

```tsx
whisp.success('¡Guardado con éxito!')
whisp.error('Algo salió mal')
whisp.info('Tenés una notificación nueva')
whisp.alert('¡Atención urgente!')
```

### Opciones

Cada función acepta un segundo argumento, que puede ser un número (duración en ms, para mantener compatibilidad) o un objeto de opciones:

```tsx
whisp.success('Listo', 5000) // duración directa

whisp.success('Listo', {
  duration: 5000,     // ms antes de cerrarse. 0 = no se cierra solo. Default: 3000
  icon: '🎉',         // ícono custom para este toast puntual
})
```

Todos los toasts se pueden cerrar antes de tiempo haciendo click sobre ellos.

## Componente `<Whisper />`

Se monta una sola vez en el layout raíz de tu app.

| Prop | Valores | Default |
|---|---|---|
| `position` | `'top-center'` \| `'top-left'` \| `'top-right'` \|`'bottom-right'` \| `'bottom-left'`\| `'bottom-center'`  | `'top-center'` |

```tsx
<Whisper position="top-left" />
```

## Personalizar íconos

### Ícono por defecto de un tipo

Cada tipo (`success`, `error`, `info`, `alert`) trae un ícono SVG incluido, sin dependencias externas.

### Ícono en un toast puntual

Sobrescribe el ícono por defecto solo para esa llamada. Acepta cualquier `ReactNode`: emoji, string, SVG propio, o un componente de ícono de tu librería favorita.

```tsx
whisp('Subiendo archivo...', { icon: '⏳' })

whisp.success('¡Lanzado!', {
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 7 17l-5-5" />
    </svg>
  ),
})

// Sin ícono, aunque el tipo tenga uno por defecto
whisp.success('Sin ícono', { icon: null })
```

## Personalizar colores

whisp-toast expone CSS variables con valores por defecto (dark, estilo Sonner). Sobrescribilas donde quieras: `globals.css`, un `<style>` inline, o dentro de un selector específico.

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

Si no definís nada, se usan los valores por defecto — cero configuración obligatoria.

### Tabla de variables

| Variable | Controla | Default |
|---|---|---|
| `--whisp-bg` | Fondo de la card | `#1a1a1a` |
| `--whisp-text` | Color del texto | `#f5f5f5` |
| `--whisp-border` | Borde de la card | `rgba(255,255,255,0.08)` |
| `--whisp-radius` | Radio de esquinas | `10px` |
| `--whisp-success-bg` / `--whisp-success-color` | Círculo del ícono de éxito | `#22c55e` / `#052e16` |
| `--whisp-error-bg` / `--whisp-error-color` | Círculo del ícono de error | `#ef4444` / `#450a0a` |
| `--whisp-info-bg` / `--whisp-info-color` | Círculo del ícono de info | `#3b82f6` / `#172554` |
| `--whisp-alert-bg` / `--whisp-alert-color` | Círculo del ícono de alerta | `#f59e0b` / `#451a03` |

### Ejemplo: dark/light mode automático

```css
@media (prefers-color-scheme: light) {
  :root {
    --whisp-bg: #ffffff;
    --whisp-text: #111111;
    --whisp-border: rgba(0, 0, 0, 0.08);
  }
}
```

## TypeScript

Todos los tipos están exportados:

```tsx
import type { WhispType, WhispItem, WhispOptions, WhisperProps } from 'whisp-toast'
```

## Licencia

MIT