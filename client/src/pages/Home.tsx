import React, { useState } from 'react';
import { 
  Target, 
  Shield, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X, 
  Lock, 
  Zap,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Send,
  Instagram
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const cryptoPayUrl = (plan: string) =>
    `https://t.me/Gentil3fx?text=${encodeURIComponent(`I want to pay with crypto for Snipe Signals (${plan})`)}`;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#2E8B57] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Snipe Signals" className="h-10 w-auto" />
              <span className="font-bold text-xl tracking-tight hidden sm:block">SnipeSignals</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('features')} className="hover:text-[#4ADE80] transition-colors px-3 py-2 rounded-md text-sm font-medium">Features</button>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#4ADE80] transition-colors px-3 py-2 rounded-md text-sm font-medium">How It Works</button>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-[#4ADE80] transition-colors px-3 py-2 rounded-md text-sm font-medium">Access</button>
                <button onClick={() => scrollToSection('faq')} className="hover:text-[#4ADE80] transition-colors px-3 py-2 rounded-md text-sm font-medium">FAQ</button>
              </div>
            </div>

            <div className="hidden md:block">
              <button 
                onClick={() => scrollToSection('pricing')}
                className="bg-[#2E8B57] hover:bg-[#3CB371] text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(46,139,87,0.3)] hover:shadow-[0_0_25px_rgba(46,139,87,0.5)]"
              >
                Get Access
              </button>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-[#4ADE80] block px-3 py-2 rounded-md text-base font-medium w-full text-left">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-[#4ADE80] block px-3 py-2 rounded-md text-base font-medium w-full text-left">How It Works</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-[#4ADE80] block px-3 py-2 rounded-md text-base font-medium w-full text-left">Access</button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-[#4ADE80] block px-3 py-2 rounded-md text-base font-medium w-full text-left">FAQ</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.jpg" 
            alt="Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
            <span className="text-sm font-mono text-gray-300">SYSTEM STATUS: ONLINE & MONITORING</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 max-w-4xl mx-auto leading-tight">
            High-Precision Crypto Signals Powered by <span className="text-[#4ADE80]">24/7 Automation</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Structured, risk-managed trade signals delivered directly to Telegram. 
            No hype. No guesswork. Just disciplined execution.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="w-full sm:w-auto px-8 py-4 bg-[#2E8B57] hover:bg-[#3CB371] text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(46,139,87,0.4)] hover:shadow-[0_0_30px_rgba(46,139,87,0.6)] flex items-center justify-center gap-2"
            >
              Get Access to Snipe Signals <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-medium text-lg transition-all backdrop-blur-sm"
            >
              How It Works
            </button>
          </div>

          {/* Contact Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a 
              href="https://t.me/Gentil3fx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-lg font-medium transition-all"
            >
              <Send className="w-5 h-5" />
              Message on Telegram
            </a>
            <a 
              href="https://instagram.com/Gentil3fx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white rounded-lg font-medium transition-all"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </a>
          </div>


        </div>
      </section>

      {/* What Is Snipe Signals */}
      <section id="features" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Precision Over Hype</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We don't chase pumps. Our automated system waits for high-probability setups that meet strict criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-[#0B0E11] border border-white/5 hover:border-[#2E8B57]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#2E8B57]/10 flex items-center justify-center mb-6 group-hover:bg-[#2E8B57]/20 transition-colors">
                <Target className="w-8 h-8 text-[#4ADE80]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Pinpoint Accuracy</h3>
              <p className="text-gray-400 leading-relaxed">
                Signals are only triggered when multiple technical indicators align. Quality over quantity is our core philosophy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-[#0B0E11] border border-white/5 hover:border-[#2E8B57]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#2E8B57]/10 flex items-center justify-center mb-6 group-hover:bg-[#2E8B57]/20 transition-colors">
                <Cpu className="w-8 h-8 text-[#4ADE80]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">24/7 Automation</h3>
              <p className="text-gray-400 leading-relaxed">
                Markets never sleep, and neither does our bot. It monitors price action around the clock so you don't have to.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-[#0B0E11] border border-white/5 hover:border-[#2E8B57]/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-[#2E8B57]/10 flex items-center justify-center mb-6 group-hover:bg-[#2E8B57]/20 transition-colors">
                <Shield className="w-8 h-8 text-[#4ADE80]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Risk Defined</h3>
              <p className="text-gray-400 leading-relaxed">
                Every signal comes with a clear Entry, Take Profit, and Stop Loss. We prioritize capital preservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Powered by Logic, Not Emotion</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2E8B57]/20 flex items-center justify-center border border-[#2E8B57]/30">
                    <span className="text-[#4ADE80] font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Real-Time Scanning</h3>
                    <p className="text-gray-400">Our algorithm scans hundreds of pairs simultaneously, looking for specific structural setups and volume anomalies.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2E8B57]/20 flex items-center justify-center border border-[#2E8B57]/30">
                    <span className="text-[#4ADE80] font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Probability Filtering</h3>
                    <p className="text-gray-400">Potential trades pass through a multi-stage filter. If the risk-to-reward ratio isn't optimal, the trade is rejected.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2E8B57]/20 flex items-center justify-center border border-[#2E8B57]/30">
                    <span className="text-[#4ADE80] font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Instant Delivery</h3>
                    <p className="text-gray-400">Valid signals are instantly pushed to our private Telegram channel with full execution details.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#2E8B57]/20 blur-[100px] rounded-full opacity-30"></div>
              <img 
                src="/images/bot-visualization.jpg" 
                alt="Bot Visualization" 
                className="relative z-10 rounded-3xl border border-white/10 shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Trusted by Serious Traders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#0B0E11] border border-white/5 relative">
              <div className="absolute -top-4 left-8 bg-[#2E8B57] p-2 rounded-lg">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-300 mb-6 mt-4 italic">"What I like most is the structure. Every signal has a clear entry, stop loss, and take profit. No guessing."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold">PT</div>
                <div>
                  <p className="font-bold text-white">Private Member</p>
                  <p className="text-xs text-gray-500">Telegram Community</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B0E11] border border-white/5 relative">
              <div className="absolute -top-4 left-8 bg-[#2E8B57] p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-300 mb-6 mt-4 italic">"The automation makes a big difference. Signals only come when conditions are met, not spammed all day."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold">CT</div>
                <div>
                  <p className="font-bold text-white">Crypto Trader</p>
                  <p className="text-xs text-gray-500">Verified User</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B0E11] border border-white/5 relative">
              <div className="absolute -top-4 left-8 bg-[#2E8B57] p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-300 mb-6 mt-4 italic">"You can tell this isn't hype-based. It's disciplined, risk-managed, and constantly improving."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold">SM</div>
                <div>
                  <p className="font-bold text-white">Snipe Signals Member</p>
                  <p className="text-xs text-gray-500">Early Adopter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Access */}
      <section id="pricing" className="py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Access Level</h2>
            <p className="text-gray-400">Crypto only. 10% off list price. Message @Gentil3fx to pay.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Partner — free via BloFin */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-gray-700 to-gray-900">
              <div className="bg-[#0B0E11] rounded-[22px] p-6 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Partnering</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#4ADE80]">FREE</span>
                  </div>
                  <p className="text-gray-400 mt-3 text-sm">BloFin signup (Canada-friendly)</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">SnipeSignalsVIP channel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">SnipeSignalsVIP discussion group</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Send BloFin UID screenshot to @Gentil3fx</span>
                  </li>
                </ul>

                <div className="space-y-3">
                  <a 
                    href="https://blofin.com/register?referral_code=DbJDDh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-[#2E8B57] hover:bg-[#3CB371] text-white rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl text-base"
                  >
                    Sign Up via BloFin →
                  </a>
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-xs text-gray-400 mb-1">Referral code:</p>
                    <span className="font-mono text-[#4ADE80] font-bold text-sm">DbJDDh</span>
                  </div>
                  <p className="text-xs text-gray-400 text-center">Send UID screenshot to @Gentil3fx</p>
                </div>
              </div>
            </div>

            {/* Monthly */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-[#2E8B57] to-[#1a5235]">
              <div className="bg-[#0B0E11] rounded-[22px] p-6 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Monthly</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">$49.99</span>
                    <span className="text-gray-400 text-sm">USD / mo</span>
                  </div>
                  <p className="text-gray-400 mt-3 text-sm">Pay $44.99 in crypto (10% off $49.99)</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">SnipeSignalsVIP channel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">SnipeSignalsVIP discussion group</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">USDT / crypto via Telegram</span>
                  </li>
                </ul>

                <a
                  href={cryptoPayUrl('Monthly — $44.99 crypto')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#2E8B57] hover:bg-[#3CB371] text-white rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl"
                >
                  Pay $44.99 in crypto
                </a>
              </div>
            </div>

            {/* Annual — 25% off */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-[#2E8B57] to-[#1a5235]">
              <div className="bg-[#0B0E11] rounded-[22px] p-6 h-full flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2E8B57] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  25% OFF
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Year up front</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">$449.91</span>
                  </div>
                  <p className="text-gray-400 mt-3 text-sm">Pay $404.92 in crypto (25% + 10% off)</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Same VIP channel + group</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">25% off 12 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">USDT / crypto via Telegram</span>
                  </li>
                </ul>

                <a
                  href={cryptoPayUrl('Annual — $404.92 crypto')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#2E8B57] hover:bg-[#3CB371] text-white rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl"
                >
                  Pay $404.92 in crypto
                </a>
              </div>
            </div>

            {/* VIP 1-on-1 */}
            <div className="p-1 rounded-3xl bg-gradient-to-b from-amber-400 to-[#2E8B57]">
              <div className="bg-[#0B0E11] rounded-[22px] p-6 h-full flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  1-ON-1
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">VIP desk</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">$249.99</span>
                    <span className="text-gray-400 text-sm">USD / mo</span>
                  </div>
                  <p className="text-gray-400 mt-3 text-sm">Pay $224.99 in crypto (10% off $249.99)</p>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Direct 1-on-1 access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Questions answered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Personal entries, TPs, and SLs</span>
                  </li>
                </ul>

                <a
                  href={cryptoPayUrl('VIP 1-on-1 — $224.99 crypto')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#2E8B57] hover:bg-[#3CB371] text-white rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl"
                >
                  Pay $224.99 in crypto
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: "How long does verification take for Partnering (free)?",
                a: "Sign up at BloFin with code DbJDDh, then send a UID screenshot to @Gentil3fx. Access is to SnipeSignalsVIP + the discussion group. Allow up to 24 hours."
              },
              {
                q: "Is this financial advice?",
                a: "No. Snipe Signals provides market analysis and trade setups based on technical indicators. All trading involves risk, and you are responsible for your own financial decisions."
              },
              {
                q: "What markets are covered?",
                a: "We primarily focus on high-volume crypto pairs (BTC, ETH, SOL, etc.) where our algorithm performs best with sufficient liquidity."
              },
              {
                q: "Can beginners use this?",
                a: "Yes. Every signal includes specific Entry, Stop Loss, and Take Profit levels, making it easy to follow. However, we recommend beginners start with small position sizes to learn risk management."
              },
              {
                q: "How do I pay?",
                a: "Paid plans are crypto only (10% off list). Tap Pay in crypto and message @Gentil3fx. Partnering is free with a BloFin signup (code DbJDDh) plus a UID screenshot."
              }
            ].map((item, index) => (
              <div key={index} className="border border-white/10 rounded-xl bg-[#0B0E11] overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white">{item.q}</span>
                  {openFaq === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img src="/images/logo.png" alt="Snipe Signals" className="h-8 w-auto" />
              <span className="font-bold text-lg">SnipeSignals</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="https://t.me/Gentil3fx" className="hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 text-xs text-gray-500 text-center md:text-left leading-relaxed">
            <p className="mb-4">
              <strong>DISCLAIMER:</strong> Trading cryptocurrencies involves a high level of risk and may not be suitable for all investors. 
              Past performance is not indicative of future results. The content provided by Snipe Signals is for educational and informational purposes only 
              and should not be construed as financial advice. Do not trade with money you cannot afford to lose.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Snipe Signals. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
