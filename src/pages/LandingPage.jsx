import { Lightbulb } from 'lucide-react'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-purple-400/30 shadow-2xl">
          <Lightbulb className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-white mb-4">
            GustoMind AI Lab
          </h1>
          <p className="text-xl text-purple-200 mb-3">
            MBA-Level AI Strategy, Simplified
          </p>
          <p className="text-lg text-purple-300 mb-8">
            AI-powered business frameworks and strategic tools
          </p>

          <div className="border-t border-purple-400/30 pt-8">
            <p className="text-purple-200 text-lg mb-2">
              Access requires a direct link
            </p>
            <p className="text-purple-300 text-sm">
              If you were provided with a tool link, please use it to access your specific resource.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-purple-400/30">
            <p className="text-purple-300 text-sm mb-4">
              For inquiries about GustoMind AI solutions:
            </p>
            <a
              href="https://www.gustomind.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all"
            >
              Visit gustomind.ai →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
