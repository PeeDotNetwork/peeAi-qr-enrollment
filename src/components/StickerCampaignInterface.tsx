import { useState } from 'react'
import { Gift, Coins, MapPin, Mail, CheckCircle, AlertCircle, Trophy, Users } from 'lucide-react'

interface StickerCampaignInterfaceProps {
  walletAddress: string | null
  tokenBalance: number
  isEligible: boolean
}

const StickerCampaignInterface = ({ walletAddress, tokenBalance, isEligible }: StickerCampaignInterfaceProps) => {
  const [enrollmentData, setEnrollmentData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    telegram: '',
    discord: ''
  })
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrollmentStatus, setEnrollmentStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const minTokensRequired = 1000

  const handleInputChange = (field: string, value: string) => {
    setEnrollmentData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEnrollment = async () => {
    if (!isEligible) return
    
    setEnrollmentStatus('submitting')
    
    // Simulate API call
    setTimeout(() => {
      setEnrollmentStatus('success')
      setIsEnrolled(true)
    }, 2000)
  }

  const isFormValid = () => {
    return enrollmentData.fullName && 
           enrollmentData.email && 
           enrollmentData.address && 
           enrollmentData.city && 
           enrollmentData.country &&
           enrollmentData.postalCode
  }

  if (!walletAddress) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-center p-12 shadow-2xl">
        <div className="animate-pulse">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-blue-400/30 rounded-full flex items-center justify-center mb-6">
            <Gift className="w-12 h-12 text-white/60" />
          </div>
          <h2 className="text-2xl font-bold text-white/90 mb-4">
            Connect your wallet to check eligibility
          </h2>
          <p className="text-white/70">
            We need to verify your $peeAI token balance for the sticker campaign
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                $peeAI QR Sticker Campaign
              </h1>
              <p className="text-white/80 text-lg">
                Exclusive stickers for $peeAI token holders
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 px-4 py-2 rounded-full border border-yellow-400/30">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-white/90 font-medium">Limited Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Token Balance Status */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-3">
              <Coins className="w-4 h-4 text-white" />
            </div>
            Token Balance Check
          </h2>
          {isEligible ? (
            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full border border-green-400/40">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Eligible</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full border border-red-400/40">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-semibold">Not Eligible</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300">
            <p className="text-sm text-blue-300 mb-2 font-medium">Your Balance</p>
            <p className="text-3xl font-bold text-white">
              {tokenBalance.toLocaleString()} 
              <span className="text-lg text-blue-300 ml-1">$peeAI</span>
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300">
            <p className="text-sm text-purple-300 mb-2 font-medium">Required</p>
            <p className="text-3xl font-bold text-white">
              {minTokensRequired.toLocaleString()}
              <span className="text-lg text-purple-300 ml-1">$peeAI</span>
            </p>
          </div>
          <div className={`bg-gradient-to-br backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
            isEligible 
              ? 'from-green-500/20 to-emerald-500/20 border-green-400/30 hover:border-green-400/50' 
              : 'from-red-500/20 to-pink-500/20 border-red-400/30 hover:border-red-400/50'
          }`}>
            <p className={`text-sm mb-2 font-medium ${isEligible ? 'text-green-300' : 'text-red-300'}`}>
              {isEligible ? 'Surplus' : 'Deficit'}
            </p>
            <p className={`text-3xl font-bold ${isEligible ? 'text-green-400' : 'text-red-400'}`}>
              {isEligible ? '+' : ''}{(tokenBalance - minTokensRequired).toLocaleString()}
              <span className={`text-lg ml-1 ${isEligible ? 'text-green-300' : 'text-red-300'}`}>$peeAI</span>
            </p>
          </div>
        </div>

        {!isEligible && (
          <div className="mt-6 p-6 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-400/30 rounded-2xl backdrop-blur-sm">
            <p className="text-red-300 flex items-center">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>
                You need to hold at least <span className="font-bold text-red-400">{minTokensRequired.toLocaleString()} $peeAI tokens</span> to qualify for free stickers.
                Purchase more tokens and refresh the page to check again.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Enrollment Form */}
      {isEligible && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-3">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            Sticker Delivery Information
          </h2>

          {isEnrolled ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-green-400 mb-4">Enrollment Successful!</h3>
              <p className="text-white/80 mb-8 text-lg">
                Thank you for joining the $peeAI sticker campaign! Your exclusive QR stickers will be shipped within 2-3 weeks.
              </p>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-6 inline-block backdrop-blur-sm">
                <p className="text-sm text-green-300 mb-3 font-medium">Delivery to:</p>
                <p className="font-medium text-white text-left">
                  {enrollmentData.fullName}<br />
                  {enrollmentData.address}<br />
                  {enrollmentData.city}, {enrollmentData.postalCode}<br />
                  {enrollmentData.country}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={enrollmentData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your street address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    City *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter postal code"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-3">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-3">
                    Telegram (Optional)
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.telegram}
                    onChange={(e) => handleInputChange('telegram', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-3">
                    Discord (Optional)
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.discord}
                    onChange={(e) => handleInputChange('discord', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="username#1234"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleEnrollment}
                  disabled={!isFormValid() || enrollmentStatus === 'submitting'}
                  className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                    isFormValid() && enrollmentStatus !== 'submitting'
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transform hover:scale-105 shadow-xl hover:shadow-purple-500/25'
                      : 'bg-white/10 text-white/50 cursor-not-allowed'
                  }`}
                >
                  {enrollmentStatus === 'submitting' ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Gift className="w-6 h-6 mr-3" />
                      Enroll for Free Stickers
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-2xl backdrop-blur-sm">
                <p className="text-blue-300 flex items-center">
                  <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>Your information will only be used for sticker delivery. We respect your privacy and will not share your data.</span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Campaign Stats */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mr-3">
            <Users className="w-4 h-4 text-white" />
          </div>
          Campaign Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300">
            <p className="text-3xl font-bold text-green-400 mb-2">1,247</p>
            <p className="text-sm text-green-300 font-medium">Enrolled</p>
          </div>
          <div className="text-center bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-2xl p-6 hover:border-blue-400/50 transition-all duration-300">
            <p className="text-3xl font-bold text-blue-400 mb-2">5,000</p>
            <p className="text-sm text-blue-300 font-medium">Total Stickers</p>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300">
            <p className="text-3xl font-bold text-purple-400 mb-2">3,753</p>
            <p className="text-sm text-purple-300 font-medium">Remaining</p>
          </div>
          <div className="text-center bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-2xl p-6 hover:border-orange-400/50 transition-all duration-300">
            <p className="text-3xl font-bold text-orange-400 mb-2">23</p>
            <p className="text-sm text-orange-300 font-medium">Days Left</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StickerCampaignInterface