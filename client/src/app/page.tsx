export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl">TempChat</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              <button className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="text-xs text-gray-300">✨ No Registration Required</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Instant Private Chats
              <span className="block text-gray-400">
                No Strings Attached
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Create temporary chat rooms in seconds. No login, no tracking, no commitment. 
              Just pure, private conversations that disappear when you're done.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="px-8 py-4 rounded-2xl bg-white text-black font-semibold text-lg hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                🚀 Create Room Now
              </button>
              <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                📖 Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">0s</div>
                <div className="text-sm text-gray-500">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-500">Privacy Focused</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">∞</div>
                <div className="text-sm text-gray-500">Free Rooms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose TempChat?
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need for seamless temporary conversations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10 4v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Login Required</h3>
              <p className="text-gray-400">Start chatting instantly without creating an account or providing any personal information.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Temporary Rooms</h3>
              <p className="text-gray-400">Rooms automatically disappear after inactivity. No data stored, no traces left behind.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10 4v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">End-to-End Encrypted</h3>
              <p className="text-gray-400">Your conversations are private and secure with military-grade encryption.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Instant room creation and real-time messaging with zero lag.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cross-Platform</h3>
              <p className="text-gray-400">Works on any device with a modern browser. No app installation needed.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Anonymous Chat</h3>
              <p className="text-gray-400">Use any username you like. No email, phone number, or personal data required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Three simple steps to start chatting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-black mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Choose a Username</h3>
              <p className="text-gray-400">Pick any nickname you like - no registration required</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-black mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Create or Join Room</h3>
              <p className="text-gray-400">Create a new room or enter an existing room code</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-black mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Start Chatting</h3>
              <p className="text-gray-400">Connect with others instantly in your temporary room</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Got questions? We've got answers
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">How long do rooms last?</h3>
              <p className="text-gray-400">Rooms automatically expire after 24 hours of inactivity. Active rooms with participants will stay alive.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Is my data stored?</h3>
              <p className="text-gray-400">No! We don't store any messages or personal information. Everything is temporary and deleted when rooms expire.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Do I need to create an account?</h3>
              <p className="text-gray-400">No account needed! Just choose a username and start chatting immediately.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">Is it really free?</h3>
              <p className="text-gray-400">Yes, completely free with no hidden costs or premium features. Just pure, simple chat rooms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">TempChat</span>
              </div>
              <p className="text-gray-400 text-sm">
                Instant temporary chat rooms. No login required.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TempChat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}