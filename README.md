# $peeAI QR Sticker Campaign

**Exclusive Marketing Campaign for $peeAI Token Holders**

A modern React application designed for $peeAI token holders to enroll in an exclusive marketing campaign and receive free QR code stickers. Users must hold a minimum amount of $peeAI tokens to qualify for the limited-time sticker giveaway.

## 🚀 Features

### Core Functionality
- **💰 Token Verification**: Automatic $peeAI token balance checking
- **🎁 Sticker Enrollment**: Campaign enrollment for qualified token holders
- **📦 Delivery Management**: Shipping address collection and validation
- **📊 Campaign Stats**: Real-time enrollment and availability tracking
- **🔐 Wallet Integration**: Secure wallet connection for token verification

### Technical Features
- **⚡ Modern Stack**: React 18 + TypeScript + Vite
- **🎨 Responsive Design**: Mobile-first with Tailwind CSS
- **🔐 Secure**: Privacy-focused data collection
- **🚀 Fast**: Optimized performance with code splitting
- **📱 Mobile Optimized**: Touch-friendly interface for mobile users

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React icons
- **Wallet Integration**: Web3 wallet connection
- **Build Tools**: Vite, ESLint, PostCSS
- **Deployment**: GitHub Pages / Vercel ready

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Web3 wallet (MetaMask, Phantom, etc.)
- $peeAI tokens for campaign eligibility

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

### For Token Holders
1. **Connect Wallet**: Connect your Web3 wallet to verify $peeAI balance
2. **Check Eligibility**: App automatically verifies you hold minimum 1,000 $peeAI tokens
3. **Enroll**: Fill out delivery information if eligible
4. **Receive Stickers**: Free QR stickers shipped globally within 2-3 weeks

### Campaign Requirements
- **Minimum Balance**: 1,000 $peeAI tokens
- **Limited Time**: Campaign runs for limited period
- **Global Shipping**: Worldwide delivery available
- **Privacy First**: Personal data only used for shipping

## 🎯 User Flow

```
Landing Page → Connect Wallet → Token Check → Sticker Enrollment → Confirmation
     ↓              ↓              ↓              ↓                 ↓
  Campaign      Wallet Auth    Balance Check   Delivery Info     Success
```

## 🔧 Configuration

### Environment Variables
```bash
# Create .env.local
VITE_API_BASE_URL=https://api.peeai.com
VITE_MIN_TOKEN_BALANCE=1000
VITE_PEEAI_TOKEN_ADDRESS=0x...
VITE_CAMPAIGN_ENABLED=true
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