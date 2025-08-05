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
      <div className="card text-center p-12">
        <div className="animate-pulse">
          <Gift className="w-24 h-24 mx-auto text-primary-accent/30 mb-6" />
          <h2 className="text-2xl font-bold text-primary-accent/50 mb-4">
            Connect your wallet to check eligibility
          </h2>
          <p className="text-primary-accent/40">
            We need to verify your $peeAI token balance for the sticker campaign
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-accent to-primary-hover rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-accent">
                $peeAI QR Sticker Campaign
              </h1>
              <p className="text-primary-accent/70">
                Exclusive stickers for $peeAI token holders
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-primary-accent/60">Limited Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Token Balance Status */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary-accent flex items-center">
            <Coins className="w-5 h-5 mr-2" />
            Token Balance Check
          </h2>
          {isEligible ? (
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500 font-medium">Eligible</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/20 rounded-full">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-500 font-medium">Not Eligible</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-background/30 rounded-lg p-4">
            <p className="text-sm text-primary-accent/60 mb-1">Your Balance</p>
            <p className="text-2xl font-bold text-primary-accent">
              {tokenBalance.toLocaleString()} $peeAI
            </p>
          </div>
          <div className="bg-primary-background/30 rounded-lg p-4">
            <p className="text-sm text-primary-accent/60 mb-1">Required</p>
            <p className="text-2xl font-bold text-primary-accent">
              {minTokensRequired.toLocaleString()} $peeAI
            </p>
          </div>
          <div className="bg-primary-background/30 rounded-lg p-4">
            <p className="text-sm text-primary-accent/60 mb-1">Surplus</p>
            <p className={`text-2xl font-bold ${isEligible ? 'text-green-500' : 'text-red-500'}`}>
              {isEligible ? '+' : ''}{(tokenBalance - minTokensRequired).toLocaleString()} $peeAI
            </p>
          </div>
        </div>

        {!isEligible && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              You need to hold at least {minTokensRequired.toLocaleString()} $peeAI tokens to qualify for free stickers.
              Purchase more tokens and refresh the page to check again.
            </p>
          </div>
        )}
      </div>

      {/* Enrollment Form */}
      {isEligible && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-primary-accent mb-6 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Sticker Delivery Information
          </h2>

          {isEnrolled ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-green-500 mb-2">Enrollment Successful!</h3>
              <p className="text-primary-accent/70 mb-4">
                Thank you for joining the $peeAI sticker campaign! Your exclusive QR stickers will be shipped within 2-3 weeks.
              </p>
              <div className="bg-primary-background/30 rounded-lg p-4 inline-block">
                <p className="text-sm text-primary-accent/60">Delivery to:</p>
                <p className="font-medium text-primary-accent">
                  {enrollmentData.fullName}<br />
                  {enrollmentData.address}<br />
                  {enrollmentData.city}, {enrollmentData.postalCode}<br />
                  {enrollmentData.country}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={enrollmentData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="Enter your street address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="Enter postal code"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="Enter your country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    Telegram (Optional)
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.telegram}
                    onChange={(e) => handleInputChange('telegram', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    Discord (Optional)
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.discord}
                    onChange={(e) => handleInputChange('discord', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="username#1234"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleEnrollment}
                  disabled={!isFormValid() || enrollmentStatus === 'submitting'}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center ${
                    isFormValid() && enrollmentStatus !== 'submitting'
                      ? 'bg-primary-accent text-primary-background hover:bg-primary-hover'
                      : 'bg-primary-accent/30 text-primary-accent/50 cursor-not-allowed'
                  }`}
                >
                  {enrollmentStatus === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Gift className="w-5 h-5 mr-2" />
                      Enroll for Free Stickers
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Your information will only be used for sticker delivery. We respect your privacy and will not share your data.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Campaign Stats */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-primary-accent mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Campaign Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-accent">1,247</p>
            <p className="text-sm text-primary-accent/60">Enrolled</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-accent">5,000</p>
            <p className="text-sm text-primary-accent/60">Total Stickers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-accent">3,753</p>
            <p className="text-sm text-primary-accent/60">Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-accent">23</p>
            <p className="text-sm text-primary-accent/60">Days Left</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StickerCampaignInterface