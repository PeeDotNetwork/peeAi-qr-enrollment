import { useState, useEffect } from 'react'
import Header from './components/Header'
import StickerCampaignInterface from './components/StickerCampaignInterface'
import WalletConnect from './components/WalletConnect'
import { initKonamiCode } from './utils/whimsy'
import { Sparkles, Zap, Gift } from 'lucide-react'

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [tokenBalance, setTokenBalance] = useState(0)
  const [isEligible, setIsEligible] = useState(false)
  const [showSecretMessage, setShowSecretMessage] = useState(false)

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setIsWalletConnected(true)
    // TODO: Fetch actual $peeAI token balance
    // For demo, set random balance
    const demoBalance = Math.floor(Math.random() * 10000) + 500
    setTokenBalance(demoBalance)
    setIsEligible(demoBalance >= 1000) // Minimum 1000 $peeAI tokens
  }

  const handleWalletDisconnect = () => {
    setWalletAddress('')
    setIsWalletConnected(false)
    setTokenBalance(0)
    setIsEligible(false)
  }
  
  // Initialize Konami code easter egg
  useEffect(() => {
    const cleanup = initKonamiCode(() => {
      setShowSecretMessage(true)
      setTimeout(() => setShowSecretMessage(false), 5000)
    })
    
    return cleanup
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-yellow-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '4s' }}></div>
      </div>
      <Header 
        isConnected={isWalletConnected}
        walletAddress={walletAddress}
        onDisconnect={handleWalletDisconnect}
      />
      
      {/* Main Sticker Campaign Interface - Always Visible */}
      <main className={`relative z-10 container mx-auto px-4 py-8 transition-all duration-500 ${!isWalletConnected ? 'blur-sm scale-95' : 'blur-none scale-100'}`}>
        <StickerCampaignInterface 
          walletAddress={walletAddress}
          tokenBalance={tokenBalance}
          isEligible={isEligible}
        />
      </main>

      {/* Wallet Connection Popup Overlay */}
      {!isWalletConnected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-50 animate-fade-in">
          <div className="relative max-w-md mx-4">
            {/* Floating particles */}
            <div className="absolute -top-10 -left-10 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75" />
            <div className="absolute -top-5 -right-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <div className="absolute -bottom-8 -left-6 w-3 h-3 bg-pink-400 rounded-full animate-bounce" />
            <div className="absolute -bottom-5 -right-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            
            {/* Main popup card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-center p-8 transform animate-bounce-in relative overflow-hidden shadow-2xl">
              {/* Sparkle overlay */}
              <div className="absolute inset-0 sparkle-container">
                <Sparkles className="absolute top-4 right-4 w-6 h-6 text-purple-300/50 animate-pulse" />
                <Sparkles className="absolute bottom-6 left-6 w-4 h-4 text-blue-300/60 animate-ping" style={{ animationDelay: '1s' }} />
                <Zap className="absolute top-6 left-4 w-5 h-5 text-pink-300/40 animate-bounce" style={{ animationDelay: '0.7s' }} />
              </div>
              
              {/* Main content */}
              <div className="relative z-10">
                <div className="text-6xl mb-6 animate-float">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center shadow-xl">
                    <Gift className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  CONNECT WALLET
                  <br />
                  <span className="text-2xl md:text-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-extrabold">
                    FOR QR STICKERS
                  </span>
                </h1>
                
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Hold $peeAI tokens to qualify for exclusive QR stickers
                  <br />
                  <span className="text-sm text-white/70">🎁 Free Stickers • 📦 Global Shipping • 🔥 Limited Campaign</span>
                </p>
                
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <WalletConnect onConnect={handleWalletConnect} />
                </div>
                
                <div className="mt-6 flex items-center justify-center space-x-2 text-white/60 text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Token Holders Only • Limited Time • Exclusive</span>
                  <Zap className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Secret Message */}
      {showSecretMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-8 py-4 rounded-full shadow-2xl fade-in-up z-50 border border-white/20 backdrop-blur-sm">
          <p className="font-bold flex items-center">
            🎆 You found the secret! You're a true $peeAi pioneer! 🤖
          </p>
        </div>
      )}
    </div>
  )
}

export default App