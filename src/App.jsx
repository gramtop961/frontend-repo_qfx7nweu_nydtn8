import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | exists | error
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch(`${BACKEND_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing' }),
      })
      const data = await res.json()
      if (data.status === 'ok') {
        setStatus('success')
        setMessage('You’re in! We’ll keep you posted.')
        setEmail('')
      } else if (data.status === 'exists') {
        setStatus('exists')
        setMessage("You're already on the list. 🚀")
      } else {
        setStatus('error')
        setMessage(data.detail || 'Something went wrong')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Network error, please try again')
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Hero Section with Spline */}
      <section className="relative h-[90vh] w-full">
        <div className="absolute inset-0">
          <Spline 
            scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" 
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-300 to-blue-300 drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Blaze toward the stars
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-lg text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Book interplanetary journeys with confidence. Luxury cabins, real-time navigation, and cosmic concierge service.
            </motion.p>

            <motion.div
              className="mt-10 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <form onSubmit={submit} className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to join the waitlist"
                  className="flex-1 bg-transparent outline-none px-4 py-3 text-white placeholder-white/50"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-400 hover:to-indigo-400 transition-colors disabled:opacity-60 font-semibold"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
              {message && (
                <p className={`mt-3 text-sm ${status === 'error' ? 'text-red-400' : 'text-white/80'}`}>
                  {message}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Gradient overlay to improve contrast without blocking interactions */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </section>

      {/* Feature highlights */}
      <section className="relative py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              title: 'Orbital Luxury',
              desc: 'Private suites with panoramic starfields and zero-g lounges.'
            },
            {
              title: 'Astro Navigation',
              desc: 'Live trajectory tracking and AI-guided excursions.'
            },
            {
              title: 'Cosmic Concierge',
              desc: 'Personal crew to curate unforgettable off-world moments.'
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-white/70">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 bg-black/90">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60">
          <p>© {new Date().getFullYear()} NovaVoyage. All rights reserved.</p>
          <a href="#" className="hover:text-white">Privacy</a>
        </div>
      </footer>
    </div>
  )
}

export default App
