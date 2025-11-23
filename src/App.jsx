import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BCIScenarioPlanning from './bci/BCIScenarioPlanning'
import BCIScenarioPlanningPart1 from './bci/BCIScenarioPlanning_Part1_Final'
import DigitalWarRoom from './financial/digital_war_room'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* University Course Assets */}
        <Route path="/mn32041/bci-scenarios-intro" element={<BCIScenarioPlanningPart1 />} />
        <Route path="/mn32041/bci-scenarios-dashboard" element={<BCIScenarioPlanning />} />

        {/* Business Assets */}
        <Route path="/financial-dashboard" element={<DigitalWarRoom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
