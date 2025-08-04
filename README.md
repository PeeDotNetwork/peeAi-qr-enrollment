# $peeAi QR Code Enrollment

**AI-Powered QR Code Enrollment System for the $peeAi Ecosystem**

A modern React application built for seamless user enrollment through QR code scanning and generation. This app serves as the entry point for users joining the $peeAi community with AI-powered features and secure enrollment processes.

## 🚀 Features

### Core Functionality
- **🔍 QR Code Scanning**: Camera-based QR code scanning for user enrollment
- **📱 QR Code Generation**: Create enrollment invitation QR codes
- **👤 User Profiles**: Comprehensive enrollment with preferences
- **🤖 AI Integration**: Personalized AI-powered recommendations
- **📊 Analytics Dashboard**: Track enrollment metrics and user engagement

### Technical Features
- **⚡ Modern Stack**: React 18 + TypeScript + Vite
- **🎨 Responsive Design**: Mobile-first with Tailwind CSS
- **🔐 Secure**: Privacy-focused enrollment process
- **🚀 Fast**: Optimized performance with code splitting
- **📱 PWA Ready**: Progressive Web App capabilities

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React icons
- **QR Processing**: qrcode, qrcode-generator, react-qr-scanner
- **Build Tools**: Vite, ESLint, PostCSS
- **Deployment**: GitHub Pages / Vercel ready

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Camera access for QR scanning

### Installation
```bash
# Clone repository
git clone git@github.com:PeeDotNetwork/peeAi-qr-enrollment.git
cd peeAi-qr-enrollment

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📱 Usage

### For Users
1. **Enrollment**: Click "Start QR Enrollment" to begin
2. **Profile Setup**: Complete your enrollment profile
3. **QR Scanning**: Use camera to scan invitation QR codes
4. **AI Preferences**: Configure your AI-powered experience

### For Developers
1. **Generate QR**: Create enrollment invitations
2. **Scan QR**: Process enrollment requests
3. **Manage Profiles**: Admin user management interface

## 🎯 User Flow

```
Landing Page → QR Enrollment → Profile Setup → Dashboard
     ↓              ↓              ↓           ↓
  Welcome      Camera/Upload   Preferences   Features
```

## 🔧 Configuration

### Environment Variables
```bash
# Create .env.local
VITE_API_BASE_URL=https://api.peeai.com
VITE_QR_SCAN_TIMEOUT=10000
VITE_AI_FEATURES_ENABLED=true
```

### Deployment
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is part of the $peeAi ecosystem by PeeDotNetwork.

## 🔗 Links

- **Organization**: [PeeDotNetwork](https://github.com/PeeDotNetwork)
- **Website**: [peeai.com](https://peeai.com)
- **Community**: [Discord](https://discord.gg/peeai)
- **Documentation**: [docs.peeai.com](https://docs.peeai.com)

## 🐛 Bug Reports & Feature Requests

Please use [GitHub Issues](https://github.com/PeeDotNetwork/peeAi-qr-enrollment/issues) for bug reports and feature requests.

---

**Built with ❤️ by the PeeDotNetwork community**