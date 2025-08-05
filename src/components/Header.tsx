import { useState } from 'react'
import { LogOut, Wallet, Copy, CheckCircle, Zap, Moon, Sun } from 'lucide-react'
import { playHapticFeedback, createSparkle, addBounceEffect } from '../utils/whimsy'

interface HeaderProps {
  isConnected: boolean
  walletAddress: string
  onDisconnect: () => void
}

export default function Header({ isConnected, walletAddress, onDisconnect }: HeaderProps) {
  const [copied, setCopied] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  
  const formatAddress = (address: string) => {
    if (address.length < 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
  
  const copyAddress = async () => {
    if (!walletAddress) return
    
    await navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    playHapticFeedback()
    
    // Add bounce effect to the address container
    const addressEl = document.querySelector('.address-container') as HTMLElement
    if (addressEl) {
      addBounceEffect(addressEl)
      createSparkle(addressEl)
    }
    
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="bg-primary-secondary/20 backdrop-blur-sm border-b border-primary-accent/20">
      <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => {
          const logoEl = event?.currentTarget as HTMLElement
          if (logoEl) createSparkle(logoEl)
        }}>
          <Wallet className="w-6 h-6 text-primary-accent wiggle-hover" />
          <h1 className="text-xl font-bold text-primary-accent group-hover:scale-105 transition-transform">
            StakeVault
            <Zap className="w-3 h-3 inline ml-1 text-primary-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </h1>
        </div>
        
        {isConnected && (
          <div className="flex items-center space-x-3">
            <button
              onClick={copyAddress}
              className="address-container bg-primary-background/50 px-3 py-1.5 rounded-lg border border-primary-accent/30 hover:bg-primary-background/70 transition-all group cursor-pointer tooltip"
            >
              <span className="text-primary-accent font-mono text-xs flex items-center">
                {formatAddress(walletAddress)}
                {copied ? (
                  <CheckCircle className="w-3 h-3 ml-1.5 text-green-400 success-animation" />
                ) : (
                  <Copy className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </span>
              <div className="tooltip-content">
                {copied ? 'Copied!' : 'Click to copy'}
              </div>
            </button>
            {/* Theme Toggle (fun extra) */}
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
                playHapticFeedback()
                const button = event?.currentTarget as HTMLElement
                if (button) addBounceEffect(button)
              }}
              className="p-1.5 rounded-lg hover:bg-primary-accent/10 transition-colors tooltip"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-primary-accent wiggle-hover" />
              ) : (
                <Sun className="w-4 h-4 text-primary-accent wiggle-hover" />
              )}
              <div className="tooltip-content">
                Toggle theme (coming soon!)
              </div>
            </button>
            
            <button
              onClick={() => {
                onDisconnect()
                playHapticFeedback()
              }}
              className="btn-secondary flex items-center space-x-1.5 group text-sm px-3 py-1.5"
            >
              <LogOut className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Disconnect</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">👋</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}