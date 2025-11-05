import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BCIScenarioPlanning from './BCIScenarioPlanning'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mn32041/scenarios" element={<BCIScenarioPlanning />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
