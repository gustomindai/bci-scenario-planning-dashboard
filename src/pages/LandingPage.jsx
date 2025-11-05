import { Link } from 'react-router-dom'
import { Lightbulb, Lock } from 'lucide-react'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Lightbulb className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">
            GustoMind AI Lab
          </h1>
          <p className="text-xl text-purple-200 mb-2">
            MBA-Level AI Strategy, Simplified
          </p>
          <p className="text-lg text-purple-300">
            Practical AI-powered business tools and frameworks
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-purple-300 mr-3" />
            <h2 className="text-2xl font-bold text-white">Access Tools</h2>
          </div>

          <p className="text-purple-200 mb-8">
            Welcome to the GustoMind Innovation Lab. Access requires authorization.
          </p>

          <div className="space-y-4">
            <div className="bg-purple-800/30 p-6 rounded-xl border border-purple-400/40 hover:bg-purple-800/50 transition-all">
              <h3 className="text-xl font-bold text-purple-100 mb-2">
                🎓 Student Tools
              </h3>
              <p className="text-purple-300 mb-4 text-sm">
                University of Bath MN32041 Strategic Management
              </p>
              <Link
                to="/mn32041/scenarios"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Access BCI Scenario Planning →
              </Link>
            </div>

            <div className="bg-blue-800/30 p-6 rounded-xl border border-blue-400/40 opacity-60">
              <h3 className="text-xl font-bold text-blue-100 mb-2">
                💼 Business Tools
              </h3>
              <p className="text-blue-300 mb-4 text-sm">
                Professional demos and AI-powered business frameworks
              </p>
              <div className="inline-block bg-gray-600 text-gray-300 font-bold py-3 px-6 rounded-lg cursor-not-allowed">
                Coming Soon
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-purple-400/30">
            <p className="text-purple-300 text-sm">
              For access to business tools, contact:{' '}
              <a href="mailto:contact@gustomind.ai" className="text-purple-200 hover:text-white underline">
                contact@gustomind.ai
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="https://www.gustomind.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-white transition-colors"
          >
            ← Back to gustomind.ai
          </a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
