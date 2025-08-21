import { useState } from 'react'
import StarShadowsIntro from './components/StarShadowsIntro'
import AIDesignerHome from './components/AIDesignerHome'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  const handleEnterSite = () => {
    setShowIntro(false)
  }

  return (
    <div className="app">
      {showIntro ? (
        <StarShadowsIntro onEnter={handleEnterSite} />
      ) : (
        <AIDesignerHome />
      )}
    </div>
  )
}

export default App
