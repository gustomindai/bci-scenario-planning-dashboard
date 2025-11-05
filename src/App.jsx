import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BCIScenarioPlanning from './BCIScenarioPlanning'
import BCIScenarioPlanningPart1 from './BCIScenarioPlanning_Part1_Final'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mn32041/bci-scenarios-intro" element={<BCIScenarioPlanningPart1 />} />
        <Route path="/mn32041/bci-scenarios-dashboard" element={<BCIScenarioPlanning />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
