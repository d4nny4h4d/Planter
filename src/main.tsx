import '@fontsource-variable/figtree'
import '@fontsource-variable/fraunces'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useStore } from './lib/store'

void useStore.getState().hydrate()
// Ask the browser not to evict the collection and photos under storage pressure.
void navigator.storage?.persist?.()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
