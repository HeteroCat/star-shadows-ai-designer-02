import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import StarShadowsIntro from './components/StarShadowsIntro'
import AIDesignerHome from './components/AIDesignerHome'
import AIClothing from './components/AIClothing'
import AIJewelry from './components/AIJewelry'
import AIMakeup from './components/AIMakeup'
import Gallery from './components/Gallery'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  const handleEnterSite = () => {
    setShowIntro(false)
  }

  if (showIntro) {
    return (
      <div className="app">
        <StarShadowsIntro onEnter={handleEnterSite} />
      </div>
    )
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<AIDesignerHome />} />
          <Route path="/clothing" element={<AIClothing />} />
          <Route path="/jewelry" element={<AIJewelry />} />
          <Route path="/makeup" element={<AIMakeup />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
