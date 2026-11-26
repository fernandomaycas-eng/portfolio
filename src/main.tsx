import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts are bundled locally (no third-party font requests). Latin subsets only load when used.
import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/barlow-condensed/latin-800.css'
import '@fontsource-variable/inter-tight/index.css'
import './styles/global.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
