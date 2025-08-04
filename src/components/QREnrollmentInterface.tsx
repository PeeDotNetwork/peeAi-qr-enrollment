import { useState } from 'react'
import { QrCode, Scan, User, Smartphone, Brain, CheckCircle } from 'lucide-react'

interface UserProfile {
  id: string
  name: string
  wallet?: string
}

interface QREnrollmentInterfaceProps {
  userProfile: UserProfile | null
}

const QREnrollmentInterface = ({ userProfile }: QREnrollmentInterfaceProps) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan' | 'profile'>('generate')
  const [qrData, setQrData] = useState('')
  const [enrollmentData, setEnrollmentData] = useState({
    name: '',
    email: '',
    wallet: '',
    preferences: {
      notifications: true,
      aiInsights: true,
      marketingUpdates: false
    }
  })

  const generateQRCode = () => {
    const data = {
      userId: userProfile?.id || 'guest',
      timestamp: Date.now(),
      app: 'peeAi',
      action: 'enrollment'
    }
    setQrData(JSON.stringify(data))
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('preferences.')) {
      const prefField = field.split('.')[1]
      setEnrollmentData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefField]: value
        }
      }))
    } else {
      setEnrollmentData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  if (!userProfile) {
    return (
      <div className="card text-center p-12">
        <div className="animate-pulse">
          <QrCode className="w-24 h-24 mx-auto text-primary-accent/30 mb-6" />
          <h2 className="text-2xl font-bold text-primary-accent/50 mb-4">
            Please enroll to access $peeAi features
          </h2>
          <p className="text-primary-accent/40">
            Scan a QR code or complete enrollment to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="card p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-accent/20 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary-accent">
              Welcome to $peeAi, {userProfile.name}!
            </h1>
            <p className="text-primary-accent/70">
              Your AI-powered enrollment system is ready
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="card p-2">
        <div className="flex space-x-2">
          {[
            { id: 'generate', label: 'Generate QR', icon: QrCode },
            { id: 'scan', label: 'Scan QR', icon: Scan },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-primary-accent text-primary-background'
                  : 'text-primary-accent hover:bg-primary-accent/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="card p-6">
        {activeTab === 'generate' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-primary-accent mb-4">
                Generate Enrollment QR Code
              </h2>
              <p className="text-primary-accent/70 mb-6">
                Create a QR code for others to join your $peeAi network
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              {qrData ? (
                <div className="bg-white p-4 rounded-lg">
                  <div className="w-48 h-48 bg-black/10 border-2 border-dashed border-primary-accent/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 mx-auto text-primary-accent/50 mb-2" />
                      <p className="text-sm text-primary-accent/70">QR Code Generated</p>
                      <p className="text-xs text-primary-accent/50 mt-1">
                        {qrData.substring(0, 30)}...
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-48 h-48 border-2 border-dashed border-primary-accent/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 mx-auto text-primary-accent/30 mb-2" />
                    <p className="text-sm text-primary-accent/50">No QR code generated</p>
                  </div>
                </div>
              )}

              <button
                onClick={generateQRCode}
                className="btn-primary px-8 py-3"
              >
                Generate QR Code
              </button>
            </div>
          </div>
        )}

        {activeTab === 'scan' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-primary-accent mb-4">
                Scan QR Code
              </h2>
              <p className="text-primary-accent/70 mb-6">
                Scan a QR code to enroll new users or verify enrollment
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 border-2 border-dashed border-primary-accent/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Scan className="w-16 h-16 mx-auto text-primary-accent/30 mb-2" />
                  <p className="text-sm text-primary-accent/50">Camera view</p>
                  <p className="text-xs text-primary-accent/40 mt-1">
                    Point camera at QR code
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="btn-primary px-6 py-2">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Open Camera
                </button>
                <button className="btn-secondary px-6 py-2">
                  Upload Image
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-primary-accent mb-4">
                Enrollment Profile
              </h2>
              <p className="text-primary-accent/70 mb-6">
                Manage your $peeAi enrollment settings and preferences
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-accent mb-2">
                    Email Address
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
                    Wallet Address (Optional)
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.wallet}
                    onChange={(e) => handleInputChange('wallet', e.target.value)}
                    className="w-full px-4 py-2 bg-primary-background/50 border border-primary-accent/20 rounded-lg text-primary-accent placeholder-primary-accent/50 focus:border-primary-accent/50 focus:outline-none"
                    placeholder="Connect or enter wallet address"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary-accent flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Preferences
                </h3>
                
                {[
                  { key: 'notifications', label: 'Push Notifications', description: 'Receive important updates and alerts' },
                  { key: 'aiInsights', label: 'AI Insights', description: 'Get personalized AI-powered recommendations' },
                  { key: 'marketingUpdates', label: 'Marketing Updates', description: 'Receive promotional content and news' }
                ].map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-primary-background/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-primary-accent">{label}</h4>
                      <p className="text-sm text-primary-accent/60">{description}</p>
                    </div>
                    <button
                      onClick={() => handleInputChange(`preferences.${key}`, !enrollmentData.preferences[key as keyof typeof enrollmentData.preferences])}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        enrollmentData.preferences[key as keyof typeof enrollmentData.preferences]
                          ? 'bg-primary-accent'
                          : 'bg-primary-accent/20'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        enrollmentData.preferences[key as keyof typeof enrollmentData.preferences]
                          ? 'translate-x-6'
                          : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full btn-primary py-3 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Save Profile Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QREnrollmentInterface