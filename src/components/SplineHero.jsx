import { lazy, Suspense, useEffect, useState } from 'react'

// Lazy import to avoid crashing the whole app if WebGL/Spline fails
const LazySpline = lazy(() => import('@splinetool/react-spline').then(mod => ({ default: mod.default })))

function Fallback() {
  return (
    <div className="h-64 w-full bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900" />
  )
}

export default function SplineHero({ scene }){
  const [canRender, setCanRender] = useState(true)

  useEffect(() => {
    try {
      // Basic feature checks to reduce runtime errors on environments without WebGL
      const hasWindow = typeof window !== 'undefined'
      const hasCanvas = hasWindow && !!window.HTMLCanvasElement
      const hasWebGL = hasWindow && (window.WebGLRenderingContext || window.WebGL2RenderingContext)
      if (!hasCanvas || !hasWebGL) {
        setCanRender(false)
      }
    } catch {
      setCanRender(false)
    }
  }, [])

  if (!canRender) return <Fallback />

  return (
    <div className="relative h-64">
      <Suspense fallback={<Fallback />}>
        <LazySpline scene={scene} style={{ width: '100%', height: '100%' }} />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent pointer-events-none" />
    </div>
  )
}
