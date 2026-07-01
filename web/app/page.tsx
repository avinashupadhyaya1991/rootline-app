'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Brand tokens ───────────────────────────────────────────────────────────
const C = {
  dark:    '#0D4A28',
  mid:     '#1A6B3C',
  light:   '#E8F4ED',
  lighter: '#F2FAF5',
  gold:    '#9A6B00',
  goldBg:  '#FDF3DC',
}

// ── Scroll-triggered fade-up wrapper ──────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ── Logo (actual Rootline SVG) ────────────────────────────────────────────
function Logo({ height = 28, light = false }: { height?: number; light?: boolean }) {
  const w = height * (182 / 48)
  const text = light ? '#FFFFFF' : C.dark
  return (
    <svg width={w} height={height} viewBox="0 0 182 48" fill="none" aria-label="Rootline">
      <g transform="translate(0,1) scale(0.96)">
        <path d="M11 39 L22 28.2" stroke={C.mid} strokeWidth="4.4" strokeLinecap="round" />
        <path d="M22 28.2 L31 19.4" stroke={C.mid} strokeWidth="4.4" strokeLinecap="round" />
        <circle cx="11" cy="39" r="3.6" fill={C.dark} />
        <circle cx="22" cy="28.2" r="3.4" fill={C.mid} />
        <path d="M31 19.4 C29.3 11 34 5 41.8 3.6 C40.7 11.6 37.4 17.2 31 19.4 Z" fill={C.gold} />
        <path d="M33.2 16.6 L40 6.4" stroke="#6E4D00" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      </g>
      <text x="50" y="33"
        fontFamily="'Hanken Grotesk', system-ui, sans-serif"
        fontSize="31" fontWeight="700" letterSpacing="-0.8" fill={text}>
        rootline
      </text>
    </svg>
  )
}

// ── Green check badge ─────────────────────────────────────────────────────
function Check({ accent = false }: { accent?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="8" fill={accent ? C.gold : C.mid} />
      <path d="M4.5 8 L6.5 10 L11.5 5.5" stroke="white" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// NAVBAR
// ══════════════════════════════════════════════════════════════════════════
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['How It Works', '#how'],
    ['Features', '#features'],
    ['Pricing', '#pricing'],
  ]
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top"><Logo height={26} /></a>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-[#1A6B3C] transition-colors">{label}</a>
          ))}
          <a href="#access"
            className="ml-2 px-5 py-2 rounded-full bg-[#1A6B3C] text-white hover:bg-[#0D4A28] transition-colors shadow-sm">
            Request Early Access →
          </a>
        </div>
        {/* Hamburger */}
        <button className="md:hidden p-1 space-y-1.5" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-5 flex flex-col gap-4 text-sm font-semibold">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-gray-600" onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="#access" onClick={() => setOpen(false)}
            className="px-4 py-2.5 rounded-full bg-[#1A6B3C] text-white text-center">
            Request Early Access →
          </a>
        </div>
      )}
    </nav>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// HERO
// ══════════════════════════════════════════════════════════════════════════
const TIERS = [
  { icon: '🌱', label: 'Farm',               sub: 'Sunrise Valley Farm, Wenatchee WA',  badge: 'Certified Organic ✓' },
  { icon: '❄️', label: 'Cold Storage',        sub: 'Seattle, WA · Lot RL-2026-0847',     badge: '34 °F maintained ✓' },
  { icon: '🚛', label: 'Transport',           sub: 'PNW Freight, Oregon Route',           badge: '35 °F — within spec ✓' },
  { icon: '📦', label: 'Distribution',        sub: 'Portland, OR',                        badge: 'Received & verified ✓' },
  { icon: '🏪', label: 'GreenLeaf Grocers',  sub: 'San Francisco, CA',                   badge: 'Arrived Oct 7 ✓' },
]

function SupplyChainCard() {
  return (
    <div className="bg-[#F4FAF6] rounded-2xl border border-[#C8E6D2] p-5 shadow-xl shadow-green-900/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1A6B3C] mb-0.5">Lot RL-2026-0847</p>
          <p className="text-sm font-bold text-[#0D4A28]">Organic Fuji Apples</p>
        </div>
        <span className="flex items-center gap-1.5 bg-[#1A6B3C] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
        </span>
      </div>
      <div className="space-y-2.5">
        {TIERS.map((t, i) => (
          <div key={i} className="relative">
            {i < TIERS.length - 1 && (
              <div className="absolute left-[18px] top-[38px] w-px h-2.5 bg-[#C8E6D2]" />
            )}
            <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-[#E8F4ED]">
              <span className="text-lg w-8 text-center flex-shrink-0">{t.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#0D4A28] leading-tight">{t.label}</p>
                <p className="text-[10px] text-gray-400 truncate">{t.sub}</p>
              </div>
              <span className="text-[10px] font-semibold text-[#1A6B3C] whitespace-nowrap hidden sm:block">{t.badge}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-[#E8F4ED] flex items-center justify-between text-xs">
        <span className="text-gray-400">Chain complete · 3 days farm to shelf</span>
        <button className="font-bold text-[#1A6B3C] hover:underline">Generate QR →</button>
      </div>
    </div>
  )
}

function Hero() {
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
  return (
    <section id="top" className="bg-white pt-20 pb-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4ED] text-[#1A6B3C] text-[11px] font-black uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1A6B3C] animate-pulse" />
            Now accepting early access applications
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-[#0D4A28] mb-6">
            Farm to shelf.<br />Every step,<br />
            <span className="text-[#1A6B3C]">verified.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-lg text-gray-500 mb-8 leading-relaxed max-w-md">
            Rootline gives regional premium grocery retailers a verified supply chain story — no hardware, no IT team, live in 14 days.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-3">
            <a href="#access"
              className="px-6 py-3.5 rounded-full bg-[#1A6B3C] text-white font-bold text-sm hover:bg-[#0D4A28] transition-colors text-center shadow-lg shadow-green-900/20">
              Request Early Access →
            </a>
            <a href="#how"
              className="px-6 py-3.5 rounded-full border-2 border-[#1A6B3C] text-[#1A6B3C] font-bold text-sm hover:bg-[#E8F4ED] transition-colors text-center">
              See how it works
            </a>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 text-xs text-gray-400">
            First 10 retailers onboard free for 90 days · FSMA 204 compliant from day one
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}>
          <SupplyChainCard />
        </motion.div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// PROOF BAR
// ══════════════════════════════════════════════════════════════════════════
const STATS = [
  { num: '41%',    label: 'of consumers now pay a premium for traceable food' },
  { num: '60 sec', label: 'to log a supply chain handoff on any smartphone' },
  { num: '14 days',label: 'from sign-up to your first verified consumer QR' },
]

function ProofBar() {
  return (
    <div className="bg-[#0D4A28] py-12 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-green-800">
        {STATS.map((s, i) => (
          <FadeUp key={i} delay={i * 0.1} className="text-center px-6 pt-6 md:pt-0">
            <p className="text-4xl font-black text-white mb-1">{s.num}</p>
            <p className="text-sm text-green-300 leading-snug">{s.label}</p>
          </FadeUp>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// TRUST GAP
// ══════════════════════════════════════════════════════════════════════════
const PAINS = [
  { icon: '📋', heading: 'Zero visibility',
    body: 'You charge 10–25% more for organic and provenance claims you cannot independently verify. One supplier misrepresentation ends your brand overnight.' },
  { icon: '⏱️', heading: '40 hours a week',
    body: 'One full-time employee chasing paper logs, WhatsApp photos, and email attachments — every single week. Manual, error-prone, and invisible to your consumers.' },
  { icon: '📅', heading: 'July 2028',
    body: 'FSMA Section 204 mandates structured Key Data Elements for every high-risk food supply chain. Paper logs won\'t qualify. The deadline is three years away.' },
]

function TrustGap() {
  return (
    <section className="bg-[#F2FAF5] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-14">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#9A6B00] mb-3">The Problem</p>
          <h2 className="text-4xl font-black text-[#0D4A28] mb-4 leading-tight">
            Premium pricing with<br />nothing to back it up.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Regional premium grocers are caught in a trust gap. Your consumers demand proof. Your suppliers send WhatsApp messages.
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {PAINS.map((p, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="bg-white rounded-2xl p-7 border border-[#E8F4ED] shadow-sm h-full">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-bold text-[#0D4A28] mb-2">{p.heading}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// HOW IT WORKS
// ══════════════════════════════════════════════════════════════════════════
const STEPS = [
  {
    num: '01', heading: 'Set up your supply chain in 20 minutes',
    body: 'Add your products, name each participant tier, and click Send Invites. Every supplier gets an SMS link — no email address, no app download, no IT team required.',
    details: ['Add products and define supplier tiers', 'Participants receive SMS invitation links', 'Brand your account with your logo and colours'],
  },
  {
    num: '02', heading: 'Suppliers log every handoff in under 60 seconds',
    body: 'From any mid-range Android, on any connectivity. Photo, temperature, GPS, and certification number — four screens, one tap to submit. Offline-first: submissions sync automatically.',
    details: ['No app download — opens in mobile browser', 'Works offline; syncs when back in range', 'Timestamp is submission time, not sync time'],
  },
  {
    num: '03', heading: 'Your consumers scan a QR and see the verified story',
    body: 'A clean, white-labeled journey page under your brand. Farm photo, organic cert status, cold chain history, arrival date — all verified. Rootline never appears.',
    details: ['Your logo, your colours, your domain', 'Green checkmark only when the full chain is logged', 'Shareable URL that works on every smartphone'],
  },
]

function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#1A6B3C] mb-3">How It Works</p>
          <h2 className="text-4xl font-black text-[#0D4A28]">Three steps from WhatsApp to verified.</h2>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-10">
          {STEPS.map((s, i) => (
            <FadeUp key={i} delay={i * 0.14}>
              <p className="text-8xl font-black text-[#E8F4ED] leading-none mb-1 select-none">{s.num}</p>
              <h3 className="text-base font-bold text-[#0D4A28] mb-3 -mt-6">{s.heading}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.body}</p>
              <ul className="space-y-2">
                {s.details.map((d, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                    <Check /><span>{d}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// CONSUMER QR MOCK
// ══════════════════════════════════════════════════════════════════════════
function PhoneMock() {
  return (
    <div className="mx-auto max-w-[240px]">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/50 overflow-hidden border-[5px] border-[#1A3A1E]">
        {/* Notch */}
        <div className="bg-white pt-3 px-4">
          <div className="bg-gray-200 rounded-full w-14 h-1 mx-auto" />
        </div>
        {/* Browser bar */}
        <div className="mx-3 mt-2 bg-gray-100 rounded-xl px-3 py-1.5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A6B3C] flex-shrink-0" />
          <span className="text-[9px] text-gray-400 truncate">verify.greenleafgrocers.com</span>
        </div>
        {/* App */}
        <div className="bg-white pb-8 mt-1">
          {/* Store header */}
          <div className="bg-[#1A6B3C] px-4 pt-3 pb-5">
            <p className="text-[9px] text-green-200 font-semibold mb-0.5">GreenLeaf Grocers</p>
            <p className="text-white font-bold text-sm leading-tight">Organic Fuji Apples</p>
            <p className="text-green-300 text-[9px] mt-0.5">Lot RL-2026-0847</p>
          </div>
          {/* Verdict pill */}
          <div className="px-3 py-2.5 bg-[#E8F4ED] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#1A6B3C] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6 L4.5 8.5 L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#0D4A28]">Chain Verified</p>
              <p className="text-[8px] text-[#1A6B3C]">All 5 stages logged &amp; verified</p>
            </div>
          </div>
          {/* Timeline */}
          <div className="px-3 pt-3 space-y-3">
            {[
              { icon: '🌱', title: 'Harvested',  detail: 'Oct 4 · Sunrise Valley Farm, WA', note: 'USDA Organic ✓' },
              { icon: '❄️', title: 'Cold Chain', detail: '33–36 °F maintained throughout',   note: 'Within spec ✓' },
              { icon: '🏪', title: 'Arrived',    detail: 'Oct 7 · 3 days from harvest',      note: 'GreenLeaf SF' },
            ].map((item, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#E8F4ED] flex items-center justify-center text-xs flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-[9px] font-bold text-[#0D4A28]">{item.title}</p>
                  <p className="text-[8px] text-gray-400">{item.detail}</p>
                  <p className="text-[8px] font-semibold text-[#1A6B3C]">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[7px] text-gray-300 mt-4 px-3">
            Powered by Rootline · Verified Jul 1, 2026
          </p>
        </div>
      </div>
    </div>
  )
}

function ConsumerSection() {
  return (
    <section className="bg-[#0D4A28] py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <p className="text-[11px] font-black uppercase tracking-widest text-[#9A6B00] mb-4">The Consumer Experience</p>
          <h2 className="text-4xl font-black text-white mb-5 leading-tight">
            What your consumers see<br />when they scan.
          </h2>
          <p className="text-green-300 leading-relaxed mb-7 text-sm">
            Your brand. Your story. Every claim verified. Rootline is invisible to your consumers — the trust relationship belongs entirely to you.
          </p>
          <ul className="space-y-3">
            {[
              'Green verified badge only when the full chain is logged',
              'Farm photo, origin, and organic certification status',
              'Cold chain history with exact temperatures at each stage',
              'USDA Organic certificate cross-referenced automatically',
              'Custom retailer domain — verify.yourgrocers.com',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-green-200">
                <Check accent /><span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeUp>
        <FadeUp delay={0.15}>
          <PhoneMock />
        </FadeUp>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// FEATURES
// ══════════════════════════════════════════════════════════════════════════
const FEATURES = [
  { icon: '📊', title: 'Live lot dashboard',
    body: 'Green / amber / red status across your full supply chain. See every active lot in real time — which stage it\'s at, who\'s next, what\'s overdue.' },
  { icon: '🌡️', title: 'Cold chain alerts',
    body: 'A temperature deviation triggers an SMS alert within 30 seconds of submission. Know before the lot reaches your shelf.' },
  { icon: '📱', title: 'White-label consumer QR',
    body: 'Your logo, your brand colours, your domain. The verified journey page shows only your brand — Rootline is invisible to your consumers.' },
  { icon: '📄', title: 'FSMA 204 one-click export',
    body: 'Every handoff is automatically structured as an FDA Key Data Element. One click generates a compliant PDF and CSV for any lot.' },
  { icon: '📶', title: 'Offline-first supplier mobile',
    body: 'Suppliers log from rural farms with zero connectivity. Submissions queue in the browser and sync automatically when connectivity returns.' },
  { icon: '✅', title: 'USDA cert auto-verification',
    body: 'Organic certification numbers cross-referenced against the USDA Organic Integrity Database automatically on every submission.' },
]

function Features() {
  return (
    <section id="features" className="bg-[#F2FAF5] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-14">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#1A6B3C] mb-3">Features</p>
          <h2 className="text-4xl font-black text-[#0D4A28]">Everything you need.<br />Nothing you don&apos;t.</h2>
        </FadeUp>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="bg-white rounded-2xl p-6 border border-[#E8F4ED] shadow-sm h-full hover:shadow-md hover:border-[#C8E6D2] transition-all duration-200">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#0D4A28] mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// FSMA
// ══════════════════════════════════════════════════════════════════════════
function FsmaSection() {
  return (
    <section className="bg-[#FDF3DC] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp>
          <span className="inline-block px-3 py-1 rounded-full border border-[#9A6B00] text-[#9A6B00] text-[10px] font-black uppercase tracking-widest mb-5">
            Regulatory
          </span>
          <h2 className="text-4xl font-black text-[#0D4A28] mb-5 leading-tight">
            FSMA 204 compliant<br />before you even think about it.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10 text-sm">
            Full enforcement of FDA Food Safety Modernization Act Section 204 begins July 2028 — covering every entity in high-risk food supply chains: produce, seafood, dairy, and eggs. Every retailer Rootline serves is already covered.
          </p>
          <div className="grid md:grid-cols-3 gap-5 text-left">
            {[
              { heading: 'Automatic KDE structure',
                body: 'Every handoff log is formatted as an FSMA Key Data Element from the moment of submission. No manual formatting, no configuration.' },
              { heading: '24-hour export',
                body: 'Produce a complete structured audit trail for any lot in one click. Designed to meet the FDA\'s 24-hour response window.' },
              { heading: 'Already precedent-set',
                body: 'Walmart mandated KDE Advanced Shipping Notices from all suppliers in August 2025 — three years ahead of FDA. The standard is here.' },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-5 border border-[#F0DCA0] h-full">
                  <p className="font-bold text-[#0D4A28] mb-2 text-sm">{item.heading}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// PRICING
// ══════════════════════════════════════════════════════════════════════════
const PLANS = [
  {
    name: 'Entry',
    tagline: 'For retailers getting started with traceability.',
    suppliers: 'Up to 25 supplier accounts',
    primary: false,
    tag: null,
    features: [
      'Supplier mobile web portal (offline-first)',
      'Live lot dashboard with green/amber/red status',
      'Cold chain alerts via SMS',
      'White-label consumer QR generation',
      'FSMA 204 one-click PDF + CSV export',
      'USDA Organic cert auto-verification',
      'SMS supplier invitations',
    ],
  },
  {
    name: 'Growth',
    tagline: 'For retailers scaling across multiple stores and supplier networks.',
    suppliers: 'Up to 100 supplier accounts',
    primary: true,
    tag: 'Most popular',
    features: [
      'Everything in Entry',
      'Volume pricing for multi-store networks',
      'Custom consumer QR domain',
      'Priority onboarding support',
      'Dedicated account manager',
      'Early access to AI verification features',
      'Quarterly supply chain health report',
    ],
  },
]

function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeUp className="text-center mb-14">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#1A6B3C] mb-3">Pricing</p>
          <h2 className="text-4xl font-black text-[#0D4A28] mb-3">Simple tiers.<br />Priced for your scale.</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            No per-SKU, per-scan, or per-QR-view charges. All features included from day one.
            Contact us for pricing — we work with each retailer directly.
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className={`rounded-2xl p-8 border-2 h-full flex flex-col ${
                plan.primary ? 'border-[#1A6B3C] bg-[#0D4A28]' : 'border-[#E8F4ED] bg-white'}`}>
                {plan.tag && (
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#9A6B00] text-white text-[10px] font-black mb-4 w-fit uppercase tracking-wide">
                    {plan.tag}
                  </span>
                )}
                <p className={`text-[11px] font-black uppercase tracking-widest mb-2 ${plan.primary ? 'text-green-300' : 'text-[#1A6B3C]'}`}>
                  {plan.name}
                </p>
                <p className={`text-sm leading-snug mb-2 font-medium ${plan.primary ? 'text-white' : 'text-[#0D4A28]'}`}>
                  {plan.tagline}
                </p>
                <p className={`text-xs mb-6 ${plan.primary ? 'text-green-300' : 'text-gray-400'}`}>{plan.suppliers}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
                        <circle cx="7" cy="7" r="7" fill={plan.primary ? '#1A6B3C' : '#E8F4ED'} />
                        <path d="M4 7 L6 9 L10 5" stroke={plan.primary ? '#9AE6B4' : '#1A6B3C'}
                          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={plan.primary ? 'text-green-100' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="mailto:hello@rootline.io"
                  className={`block py-3.5 rounded-full font-bold text-sm text-center transition-colors ${
                    plan.primary
                      ? 'bg-white text-[#0D4A28] hover:bg-green-100'
                      : 'bg-[#1A6B3C] text-white hover:bg-[#0D4A28]'}`}>
                  Contact us for pricing →
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp>
          <p className="text-center text-xs text-gray-400 mt-8">
            Volume pricing available for networks with 10+ store locations · 14-day onboarding guarantee included
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// TESTIMONIAL
// ══════════════════════════════════════════════════════════════════════════
function Testimonial() {
  return (
    <section className="bg-[#E8F4ED] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <FadeUp>
          <div className="text-6xl text-[#1A6B3C] mb-4 leading-none font-serif select-none">&ldquo;</div>
          <blockquote className="text-2xl font-semibold text-[#0D4A28] leading-snug mb-6 italic">
            We do not have a reasonable way to verify the claims are accurate.<br className="hidden md:block" />
            We have to believe whatever the suppliers tell us.
          </blockquote>
          <p className="text-sm text-gray-500 font-semibold">
            Chief Procurement Officer · Regional Premium Grocery Chain
          </p>
          <p className="text-xs text-gray-400 mt-1">Primary research interview, 2025</p>
        </FadeUp>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// EARLY ACCESS CTA
// ══════════════════════════════════════════════════════════════════════════
function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <section id="access" className="bg-[#0D4A28] py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <FadeUp>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Join the retailers who can<br />finally prove what they sell.
          </h2>
          <p className="text-green-300 mb-10 leading-relaxed text-sm">
            First 10 retailers onboard free for 90 days. We work with you directly to get your first verified consumer QR live within 14 days of sign-up.
          </p>
          {!done ? (
            <form
              onSubmit={e => { e.preventDefault(); if (email) setDone(true) }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-green-500 focus:outline-none focus:border-white/60 text-sm" />
              <button type="submit"
                className="px-6 py-3.5 rounded-full bg-[#9A6B00] text-white font-bold text-sm hover:bg-[#7A5500] transition-colors whitespace-nowrap shadow-lg">
                Apply Now →
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 rounded-2xl px-8 py-7 border border-white/20 max-w-md mx-auto">
              <div className="text-3xl mb-3">🌱</div>
              <p className="text-white font-bold text-lg mb-1">You&apos;re on the list.</p>
              <p className="text-green-300 text-sm">We&apos;ll be in touch at <span className="text-white font-medium">{email}</span> within 2 business days.</p>
            </motion.div>
          )}
          <p className="mt-7 text-xs text-green-600">
            Eligibility: 5+ supplier relationships across 2+ supply chain tiers
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="bg-[#071910] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo height={22} light />
        <div className="flex flex-wrap justify-center gap-6 text-xs text-green-700">
          {[['How It Works','#how'],['Features','#features'],['Pricing','#pricing']].map(([l,h]) => (
            <a key={h} href={h} className="hover:text-green-400 transition-colors">{l}</a>
          ))}
          <a href="mailto:hello@rootline.io" className="hover:text-green-400 transition-colors">hello@rootline.io</a>
        </div>
        <div className="text-xs text-green-900 text-center md:text-right leading-relaxed">
          <p>© {new Date().getFullYear()} Rootline · FSMA 204 compliant</p>
          <p>Farm-to-table traceability for premium grocers</p>
        </div>
      </div>
    </footer>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProofBar />
      <TrustGap />
      <HowItWorks />
      <ConsumerSection />
      <Features />
      <FsmaSection />
      <Pricing />
      <Testimonial />
      <EarlyAccess />
      <Footer />
    </>
  )
}
