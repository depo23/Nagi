import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { OrganicAudioPlayer } from './components/OrganicAudioPlayer';
import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   Grain texture overlay component
───────────────────────────────────────────── */
function GrainOverlay({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Spiral logo SVG
───────────────────────────────────────────── */
function SpiralIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" stroke="#C8832A" strokeWidth="1" opacity="0.5" />
      <path
        d="M18 18 C18 18, 22 14, 22 10 C22 7, 19 5, 16 6 C12 7, 10 11, 11 15 C12 20, 17 23, 22 22 C27 21, 30 16, 28 11"
        stroke="#C8832A"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<number | null>(null);
  const [currentProductImageIndex, setCurrentProductImageIndex] = useState(0);
  const [currentAccessoryImageIndex, setCurrentAccessoryImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Hand-Painted Drum',
      images: [
        'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800',
        'https://images.unsplash.com/photo-1519865885283-4b3e0d9d6e28?w=800',
        'https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?w=800'
      ],
      price: '180 €',
      description: 'Tamburo artigianale dipinto a mano con pelle naturale. Struttura in legno di Abete, diametro esterno 39 cm, peso 640 g.',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      id: 2,
      name: 'Traditional Drum',
      images: [
        'https://images.unsplash.com/photo-1519865885283-4b3e0d9d6e28?w=800',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
        'https://images.unsplash.com/photo-1595435742656-5272d0b3e1d4?w=800'
      ],
      price: '165 €',
      description: 'Tamburo tradizionale con pelle di Asino conciata a mano. Struttura robusta in legno naturale, diametro 35 cm.',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      id: 3,
      name: 'Ceremonial Drum',
      images: [
        'https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?w=800',
        'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800',
        'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=800'
      ],
      price: '220 €',
      description: 'Tamburo cerimoniale decorato con simboli sacri. Pelle di alta qualità, struttura in legno stagionato, diametro 42 cm.',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      id: 4,
      name: 'Spirit Drum',
      images: [
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        'https://images.unsplash.com/photo-1699532921303-6c51bc2b547d?w=800'
      ],
      price: '195 €',
      description: 'Tamburo spirituale con decorazioni geometriche tradizionali. Legno di Betulla, pelle naturale, diametro 38 cm.',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
    },
    {
      id: 5,
      name: 'Medicine Drum',
      images: [
        'https://images.unsplash.com/photo-1595435742656-5272d0b3e1d4?w=800',
        'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800',
        'https://images.unsplash.com/photo-1519865885283-4b3e0d9d6e28?w=800'
      ],
      price: '210 €',
      description: 'Tamburo medicina con simboli di guarigione. Costruzione artigianale, pelle conciata naturalmente, diametro 40 cm.',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
    },
    {
      id: 6,
      name: 'Powwow Drum',
      images: [
        'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800',
        'https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?w=800',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800'
      ],
      price: '175 €',
      description: 'Tamburo da cerimonia con suono profondo e risonante. Legno massello, pelle resistente, diametro 36 cm.',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
    },
  ];

  const accessories = [
    {
      id: 1,
      name: 'Drum Mallet',
      images: [
        'https://images.unsplash.com/photo-1753633111175-845487605d7a?w=800',
        'https://images.unsplash.com/photo-1764391791965-e57ac12cbb80?w=800'
      ],
      price: '25 €',
      description: 'Battente artigianale in legno con testa imbottita. Perfetto per suoni morbidi e profondi.'
    },
    {
      id: 2,
      name: 'Leather Strap',
      images: [
        'https://images.unsplash.com/photo-1764391791965-e57ac12cbb80?w=800',
        'https://images.unsplash.com/photo-1676859022856-491260383d22?w=800'
      ],
      price: '35 €',
      description: 'Cinghia in pelle conciata a mano, regolabile e resistente. Lavorazione tradizionale.'
    },
    {
      id: 3,
      name: 'Carrying Case',
      images: [
        'https://images.unsplash.com/photo-1676859022856-491260383d22?w=800',
        'https://images.unsplash.com/photo-1753633111175-845487605d7a?w=800'
      ],
      price: '45 €',
      description: 'Custodia protettiva in pelle e tessuto naturale. Imbottitura interna, tracolla regolabile.'
    },
  ];

  const events = [
    {
      id: 1,
      date: '15 Maggio 2026',
      title: 'Inipi',
      location: 'Milano',
      phone: '+39 345 678 9012',
      email: 'info@nagidrum.com'
    },
    {
      id: 2,
      date: '22 Giugno 2026',
      title: 'Cerimonia del Tamburo',
      location: 'Roma',
      phone: '+39 345 678 9012',
      email: 'info@nagidrum.com'
    },
    {
      id: 3,
      date: '10 Luglio 2026',
      title: 'Cerchio di Guarigione',
      location: 'Firenze',
      phone: '+39 345 678 9012',
      email: 'info@nagidrum.com'
    },
    {
      id: 4,
      date: '5 Agosto 2026',
      title: 'Workshop Tradizionale',
      location: 'Torino',
      phone: '+39 345 678 9012',
      email: 'info@nagidrum.com'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (images: string[], currentIndex: number, setIndex: (index: number) => void) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setIndex(currentIndex - 1);
    }
  };

  /* ─── shared inline styles ─── */
  const cormorant: React.CSSProperties = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const montserrat: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" };

  return (
    <div className="min-h-screen scroll-smooth" style={{ background: '#1C1208', ...montserrat }}>

      {/* ── HEADER ───────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-sm'
        }`}
        style={{ background: scrolled ? 'rgba(28,18,8,0.92)' : 'rgba(28,18,8,0.72)', borderBottom: '1px solid rgba(200,131,42,0.12)' }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Desktop nav — left */}
            <div className="hidden md:flex items-center gap-8">
              {[['#tamburi','Tamburi'],['#accessori','Accessori'],['#eventi','Rituali'], ['#chi-sono','Chi Sono'],].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="transition-colors duration-600"
                  style={{ color: '#A09078', letterSpacing: '0.12em', fontSize: '0.78rem', ...montserrat }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8DCC8')} 
                  onMouseLeave={e => (e.currentTarget.style.color = '#A09078')}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Logo — right */}
            <div className="flex items-center gap-3 ml-auto md:ml-0">
              <SpiralIcon />
              <span
                className="tracking-widest uppercase"
                style={{ color: '#E8DCC8', fontSize: '1.05rem', letterSpacing: '0.25em', ...montserrat }}
              >
                <span style={{ color: '#C8832A' }}>NAGI</span> DRUMS
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 ml-4"
              style={{ color: '#E8DCC8' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile nav dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-5 pt-4" style={{ borderTop: '1px solid rgba(200,131,42,0.2)' }}>
              {[['#tamburi','La Voce'],['#accessori','Accompagnamento'],['#eventi','Rituali'],['#chi-sono','Chi Siamo'],['#contattami','Incontraci']].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="transition-colors duration-600"
                  style={{ color: '#A09078', letterSpacing: '0.12em', fontSize: '0.82rem' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background fire image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486059375389-669ced6cbc67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(28,18,8,0.45) 0%, rgba(28,18,8,0.22) 40%, rgba(28,18,8,0.78) 100%)' }} />
        {/* Grain */}
        <GrainOverlay opacity={0.09} />

        <div className="relative text-center px-6 max-w-5xl mx-auto py-24">
          <p
            className="mb-8 tracking-[0.4em] uppercase"
            style={{ color: '#C8832A', fontSize: '0.72rem', ...montserrat }}
          >
            mitákuye oyásʼiŋ — All My Relations
          </p>
          <h1
            className="mb-6"
            style={{
              ...cormorant,
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              color: '#E8DCC8',
              lineHeight: 1.05,
              fontWeight: 300,
              letterSpacing: '-0.01em',
              fontStyle: 'italic',
            }}
          >
            Il Ritmo che Custodisce
          </h1>
          <p
            className="tracking-[0.35em] uppercase"
            style={{ color: '#C8A882', fontSize: '0.75rem', ...montserrat }}
          >
            Tamburi per l'anima e il rituale
          </p>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────── */}
      <section id="tamburi" className="relative py-20 overflow-hidden">
        {/* Sandy parchment background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, #C8A87A 0%, #B8946A 45%, #C4A070 100%)' }} />
        <GrainOverlay opacity={0.07} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <h2
              className="mb-3"
              style={{ ...cormorant, color: '#1C1208', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              Creature di Legno e Pelle
            </h2>
            <p
              className="tracking-[0.28em] uppercase"
              style={{ color: '#4A3020', fontSize: '0.7rem', ...montserrat }}
            >
              Incontra il tuo compagno — ogni tamburo porta una voce unica
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                style={{ transform: index % 2 === 1 ? 'translateY(18px)' : 'translateY(0)' }}
                onClick={() => {
                  setSelectedImage(index);
                  setCurrentProductImageIndex(0);
                }}
              >
                <div
                  className="overflow-hidden transition-all"
                  style={{
                    background: '#1E1208',
                    borderRadius: '20px',
                    border: '1px solid rgba(74,48,32,0.5)',
                    transition: 'transform 700ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 700ms ease, border-color 700ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.025)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 24px 60px rgba(200,131,42,0.18)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,131,42,0.55)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(74,48,32,0.5)';
                  }}
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden relative">
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ transition: 'transform 700ms ease' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    />
                    {/* Hover CTA overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'rgba(28,18,8,0.55)',
                        transition: 'opacity 600ms ease',
                      }}
                    >
                      <span
                        className="px-4 py-2 tracking-widest uppercase"
                        style={{
                          color: '#E8DCC8',
                          fontSize: '0.68rem',
                          border: '1px solid rgba(232,220,200,0.55)',
                          borderRadius: 999,
                          background: 'rgba(28,18,8,0.5)',
                          ...montserrat,
                        }}
                      >
                        Ascolta la sua voce
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <h3
                      className="text-center mb-4"
                      style={{ ...cormorant, color: '#E8DCC8', fontSize: '1.15rem', fontWeight: 400 }}
                    >
                      {product.name}
                    </h3>
                    <OrganicAudioPlayer src={product.audio} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESSORI ────────────────────────────── */}
      <section id="accessori" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, #2E1C0E 0%, #3A2412 50%, #2A180A 100%)' }} />
        <GrainOverlay opacity={0.07} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <h2
              className="mb-3"
              style={{ ...cormorant, color: '#E8DCC8', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              Spiriti d'Accompagnamento
            </h2>
            <p
              className="tracking-[0.28em] uppercase"
              style={{ color: '#C8832A', fontSize: '0.7rem', ...montserrat }}
            >
              Complementi artigianali per la tua esperienza
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accessories.map((accessory, index) => (
              <div
                key={accessory.id}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedAccessory(index);
                  setCurrentAccessoryImageIndex(0);
                }}
              >
                <div
                  className="overflow-hidden"
                  style={{
                    background: '#1C1208',
                    borderRadius: '20px',
                    border: '1px solid rgba(74,48,32,0.4)',
                    transition: 'transform 700ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 700ms ease, border-color 700ms ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.025)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 50px rgba(200,131,42,0.14)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,220,200,0.35)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(74,48,32,0.4)';
                  }}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <ImageWithFallback
                      src={accessory.images[0]}
                      alt={accessory.name}
                      className="w-full h-full object-cover"
                      style={{ transition: 'transform 700ms ease' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                    />
                  </div>
                  <div className="p-5">
                    <h3
                      className="text-center"
                      style={{ ...cormorant, color: '#E8DCC8', fontSize: '1.15rem', fontWeight: 400 }}
                    >
                      {accessory.name}
                    </h3>
                    <p
                      className="text-center mt-2"
                      style={{ color: '#C8832A', fontSize: '0.85rem', ...montserrat }}
                    >
                      {accessory.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTI ───────────────────────────────── */}
      <section id="eventi" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#C8A87A' }} />
        <GrainOverlay opacity={0.07} />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="mb-14">
            <h2
              className="mb-3"
              style={{ ...cormorant, color: '#1C1208', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              Cerchi Sacri
            </h2>
            <p
              className="tracking-[0.28em] uppercase"
              style={{ color: '#4A3020', fontSize: '0.7rem', ...montserrat }}
            >
              Unisciti a noi per cerimonie e workshop tradizionali
            </p>
          </div>

          <div className="space-y-5">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-8 transition-all"
                style={{
                  background: '#1E1208',
                  borderRadius: '16px',
                  border: '1px solid rgba(74,48,32,0.45)',
                  transition: 'box-shadow 700ms ease, border-color 700ms ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(28,18,8,0.35)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,131,42,0.45)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(74,48,32,0.45)';
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <span style={{ color: '#C8832A', fontSize: '0.68rem', letterSpacing: '0.25em', ...montserrat }}>DATA</span>
                      <p style={{ ...cormorant, color: '#E8DCC8', fontSize: '1.25rem' }}>{event.date}</p>
                    </div>
                    <div className="mb-4">
                      <span style={{ color: '#C8832A', fontSize: '0.68rem', letterSpacing: '0.25em', ...montserrat }}>RITUALE</span>
                      <p style={{ ...cormorant, color: '#E8DCC8', fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 300 }}>{event.title}</p>
                    </div>
                    <div>
                      <span style={{ color: '#C8832A', fontSize: '0.68rem', letterSpacing: '0.25em', ...montserrat }}>LUOGO</span>
                      <p style={{ color: '#C8A882', fontSize: '1rem', ...montserrat }}>{event.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <span style={{ color: '#C8832A', fontSize: '0.68rem', letterSpacing: '0.25em', ...montserrat }}>CONTATTO</span>
                    <a href={`tel:${event.phone}`} className="flex items-center gap-3 transition-colors duration-600" style={{ color: '#C8A882' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E8DCC8')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#C8A882')}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span style={{ fontSize: '0.88rem', ...montserrat }}>{event.phone}</span>
                    </a>
                    <a href={`mailto:${event.email}`} className="flex items-center gap-3 transition-colors duration-600" style={{ color: '#C8A882' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E8DCC8')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#C8A882')}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span style={{ fontSize: '0.88rem', ...montserrat }}>{event.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHI SONO ─────────────────────────────── */}
      <section id="chi-sono" className="relative py-20 overflow-hidden">
        <span id="contattami" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #1C1208 0%, #251A0E 50%, #1C1208 100%)' }} />
        <GrainOverlay opacity={0.07} />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <h2
              className="mb-3"
              style={{ ...cormorant, color: '#E8DCC8', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 300, fontStyle: 'italic' }}
            >
              Chi Sono
            </h2>
            <p
              className="tracking-[0.28em] uppercase"
              style={{ color: '#C8832A', fontSize: '0.7rem', ...montserrat }}
            >
              La mia storia e il mio cammino spirituale
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <div className="relative">
                <div
                  className="aspect-[3/4] overflow-hidden"
                  style={{ borderRadius: '20px 40px 20px 40px', border: '1px solid rgba(200,131,42,0.25)' }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1776728016975-45f2197c0d2a?w=800"
                    alt="Ritratto dell'artigiano"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full opacity-15"
                  style={{ background: 'radial-gradient(circle, #C8832A, transparent)' }}
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <div
                className="p-8 md:p-10"
                style={{
                  background: 'rgba(37,26,14,0.7)',
                  borderRadius: '24px',
                  border: '1px solid rgba(200,131,42,0.18)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <h3
                  className="mb-6"
                  style={{ ...cormorant, color: '#E8DCC8', fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 300 }}
                >
                  Marco Nagi
                </h3>

                <div className="space-y-4 mb-8" style={{ color: 'rgba(232,220,200,0.82)', fontSize: '0.9rem', lineHeight: 1.8, ...montserrat }}>
                  <p>
                    Da oltre vent'anni mi dedico alla costruzione artigianale di tamburi tradizionali,
                    seguendo gli insegnamenti delle culture native americane e il profondo rispetto per
                    la natura e i suoi doni.
                  </p>
                  <p>
                    Ogni tamburo che creo è unico, costruito a mano con materiali naturali e decorato
                    seguendo antiche tecniche e simboli sacri. La mia missione è preservare queste
                    tradizioni e condividere la potenza guaritrice del ritmo.
                  </p>
                  <p>
                    Organizzo cerimonie, workshop e cerchi di tamburo dove condivido la mia conoscenza
                    e creo spazi di connessione spirituale attraverso il suono.
                  </p>
                </div>

                <div className="pt-6 space-y-3" style={{ borderTop: '1px solid rgba(200,131,42,0.2)' }}>
                  <p style={{ color: '#C8832A', fontSize: '0.68rem', letterSpacing: '0.28em', ...montserrat }}>CONTATTI</p>
                  {[
                    { href: 'tel:+393456789012', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: '+39 345 678 9012' },
                    { href: 'mailto:marco@nagidrum.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'marco@nagidrum.com' },
                  ].map(({ href, icon, label }) => (
                    <a key={href} href={href} className="flex items-center gap-3 transition-colors duration-600" style={{ color: '#A09078' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E8DCC8')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#A09078')}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                      </svg>
                      <span style={{ fontSize: '0.88rem', ...montserrat }}>{label}</span>
                    </a>
                  ))}
                  <a href="https://instagram.com/nagidrum" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors duration-600" style={{ color: '#A09078' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E8DCC8')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#A09078')}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span style={{ fontSize: '0.88rem', ...montserrat }}>@nagidrum</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ───────────────────────────────── */}
      <div style={{ height: 2, background: 'linear-gradient(to right, transparent, #C8832A, #C8A87A, #C8832A, transparent)' }} />

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="relative py-10" style={{ background: '#1C1208' }}>
        <GrainOverlay opacity={0.05} />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="mb-2" style={{ ...montserrat, fontSize: '0.8rem' }}>
            <a href="mailto:info@nagidrum.com" style={{ color: '#C8832A', letterSpacing: '0.12em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E8DCC8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#C8832A')}
            >
              info@nagidrum.com
            </a>
          </p>
          <p style={{ color: 'rgba(160,144,120,0.55)', fontSize: '0.72rem', letterSpacing: '0.18em', ...montserrat }}>
            © 2026 Nagi Drums — Tutti i diritti riservati
          </p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════
          LIGHTBOX — Products (logic fully preserved)
      ═══════════════════════════════════════════ */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(14,8,2,0.97)', backdropFilter: 'blur(12px)', animation: 'fadeIn 300ms ease' }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center transition-all duration-600"
            style={{ color: '#E8DCC8', fontSize: '2rem', background: 'rgba(200,131,42,0.12)', borderRadius: '50%', border: '1px solid rgba(200,131,42,0.25)' }}
            onClick={() => setSelectedImage(null)}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,131,42,0.3)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,131,42,0.12)')}
          >
            ×
          </button>

          <div className="relative max-w-6xl w-full">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(products[selectedImage].images, currentProductImageIndex, setCurrentProductImageIndex)}
              >
                <ImageWithFallback
                  src={products[selectedImage].images[currentProductImageIndex].replace('w=800', 'w=1600')}
                  alt={products[selectedImage].name}
                  className="w-full h-auto max-h-[70vh] object-contain shadow-2xl"
                  style={{ borderRadius: '16px' }}
                />
                <div className="flex justify-center gap-2 mt-4">
                  {products[selectedImage].images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.stopPropagation(); setCurrentProductImageIndex(index); }}
                      style={{
                        width: index === currentProductImageIndex ? 28 : 10,
                        height: 10,
                        borderRadius: 999,
                        background: index === currentProductImageIndex ? '#C8832A' : 'rgba(200,131,42,0.3)',
                        border: 'none',
                        transition: 'all 600ms ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                className="p-8"
                style={{ background: 'rgba(37,26,14,0.85)', borderRadius: '20px', border: '1px solid rgba(200,131,42,0.2)', backdropFilter: 'blur(8px)' }}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ ...cormorant, color: '#E8DCC8', fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 300 }}>
                      {products[selectedImage].name}
                    </h3>
                    <span style={{ color: '#C8832A', fontSize: '1.6rem', ...cormorant }}>{products[selectedImage].price}</span>
                  </div>
                  <p style={{ color: '#C8832A', fontSize: '0.7rem', letterSpacing: '0.2em', ...montserrat, marginBottom: 8 }}>
                    {selectedImage + 1} / {products.length}
                  </p>
                  <p style={{ color: 'rgba(232,220,200,0.8)', fontSize: '0.88rem', lineHeight: 1.75, ...montserrat }}>
                    {products[selectedImage].description}
                  </p>
                </div>

                <div className="mb-6">
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                    <input type="hidden" name="cmd" value="_xclick" />
                    <input type="hidden" name="business" value="YOUR_PAYPAL_EMAIL@example.com" />
                    <input type="hidden" name="item_name" value={products[selectedImage].name} />
                    <input type="hidden" name="amount" value={products[selectedImage].price.replace(' €', '')} />
                    <input type="hidden" name="currency_code" value="EUR" />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 px-6 transition-all duration-600"
                      style={{
                        background: '#C8832A',
                        borderRadius: '12px',
                        color: '#E8DCC8',
                        border: 'none',
                        letterSpacing: '0.12em',
                        fontSize: '0.82rem',
                        ...montserrat,
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#D49040')}
                      onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#C8832A')}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.76-4.852a.932.932 0 0 1 .922-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.76-4.463z"/>
                      </svg>
                      Acquista con PayPal
                    </button>
                  </form>
                </div>

                <div>
                  <p style={{ color: '#C8832A', fontSize: '0.68rem', letterSpacing: '0.28em', ...montserrat, marginBottom: 12 }}>CONDIVIDI</p>
                  <div className="flex gap-3">
                    {[
                      { href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                      { href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(products[selectedImage].name)}`, label: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                      { href: `https://wa.me/?text=${encodeURIComponent(products[selectedImage].name + ' - ' + window.location.href)}`, label: 'WhatsApp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' },
                    ].map(({ href, label, path }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-600"
                        style={{ background: 'rgba(200,131,42,0.18)', border: '1px solid rgba(200,131,42,0.3)', color: '#C8A882' }}
                        aria-label={`Share on ${label}`}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,131,42,0.35)')}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,131,42,0.18)')}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={path}/></svg>
                      </a>
                    ))}
                    <a
                      href={`mailto:?subject=${encodeURIComponent(products[selectedImage].name)}&body=${encodeURIComponent(window.location.href)}`}
                      className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-600"
                      style={{ background: 'rgba(200,131,42,0.18)', border: '1px solid rgba(200,131,42,0.3)', color: '#C8A882' }}
                      aria-label="Share via Email"
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,131,42,0.35)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,131,42,0.18)')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav prev/next */}
            {selectedImage > 0 && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-600"
                style={{ background: 'rgba(37,26,14,0.85)', color: '#E8DCC8', fontSize: '1.6rem', border: '1px solid rgba(200,131,42,0.25)' }}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage - 1); setCurrentProductImageIndex(0); }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,131,42,0.4)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,26,14,0.85)')}
              >‹</button>
            )}
            {selectedImage < products.length - 1 && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-600"
                style={{ background: 'rgba(37,26,14,0.85)', color: '#E8DCC8', fontSize: '1.6rem', border: '1px solid rgba(200,131,42,0.25)' }}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage + 1); setCurrentProductImageIndex(0); }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,131,42,0.4)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,26,14,0.85)')}
              >›</button>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          LIGHTBOX — Accessori (logic fully preserved)
      ═══════════════════════════════════════════ */}
      {selectedAccessory !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(14,8,2,0.97)', backdropFilter: 'blur(12px)' }}
          onClick={() => setSelectedAccessory(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center transition-all duration-600"
            style={{ color: '#E8DCC8', fontSize: '2rem', background: 'rgba(200,131,42,0.12)', borderRadius: '50%', border: '1px solid rgba(200,131,42,0.25)' }}
            onClick={() => setSelectedAccessory(null)}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,131,42,0.3)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,131,42,0.12)')}
          >×</button>

          <div className="relative max-w-6xl w-full">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(accessories[selectedAccessory].images, currentAccessoryImageIndex, setCurrentAccessoryImageIndex)}
              >
                <ImageWithFallback
                  src={accessories[selectedAccessory].images[currentAccessoryImageIndex].replace('w=800', 'w=1600')}
                  alt={accessories[selectedAccessory].name}
                  className="w-full h-auto max-h-[70vh] object-contain shadow-2xl"
                  style={{ borderRadius: '16px' }}
                />
                <div className="flex justify-center gap-2 mt-4">
                  {accessories[selectedAccessory].images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.stopPropagation(); setCurrentAccessoryImageIndex(index); }}
                      style={{
                        width: index === currentAccessoryImageIndex ? 28 : 10,
                        height: 10,
                        borderRadius: 999,
                        background: index === currentAccessoryImageIndex ? '#C8832A' : 'rgba(200,131,42,0.3)',
                        border: 'none',
                        transition: 'all 600ms ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                className="p-8"
                style={{ background: 'rgba(37,26,14,0.85)', borderRadius: '20px', border: '1px solid rgba(200,131,42,0.2)', backdropFilter: 'blur(8px)' }}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ ...cormorant, color: '#E8DCC8', fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 300 }}>
                      {accessories[selectedAccessory].name}
                    </h3>
                    <span style={{ color: '#C8832A', fontSize: '1.6rem', ...cormorant }}>{accessories[selectedAccessory].price}</span>
                  </div>
                  <p style={{ color: '#C8832A', fontSize: '0.7rem', letterSpacing: '0.2em', ...montserrat, marginBottom: 8 }}>
                    {selectedAccessory + 1} / {accessories.length}
                  </p>
                  <p style={{ color: 'rgba(232,220,200,0.8)', fontSize: '0.88rem', lineHeight: 1.75, ...montserrat }}>
                    {accessories[selectedAccessory].description}
                  </p>
                </div>

                <div className="mb-6">
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                    <input type="hidden" name="cmd" value="_xclick" />
                    <input type="hidden" name="business" value="YOUR_PAYPAL_EMAIL@example.com" />
                    <input type="hidden" name="item_name" value={accessories[selectedAccessory].name} />
                    <input type="hidden" name="amount" value={accessories[selectedAccessory].price.replace(' €', '')} />
                    <input type="hidden" name="currency_code" value="EUR" />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 px-6 transition-all duration-600"
                      style={{ background: '#C8832A', borderRadius: '12px', color: '#E8DCC8', border: 'none', letterSpacing: '0.12em', fontSize: '0.82rem', ...montserrat }}
                      onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = '#D49040')}
                      onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#C8832A')}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.76-4.852a.932.932 0 0 1 .922-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.76-4.463z"/>
                      </svg>
                      Acquista con PayPal
                    </button>
                  </form>
                </div>

                <div>
                  <p style={{ color: '#C8832A', fontSize: '0.68rem', letterSpacing: '0.28em', ...montserrat, marginBottom: 12 }}>CONDIVIDI</p>
                  <div className="flex gap-3">
                    {[
                      { href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                      { href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(accessories[selectedAccessory].name)}`, label: 'Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                      { href: `https://wa.me/?text=${encodeURIComponent(accessories[selectedAccessory].name + ' - ' + window.location.href)}`, label: 'WhatsApp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' },
                    ].map(({ href, label, path }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-600"
                        style={{ background: 'rgba(200,131,42,0.18)', border: '1px solid rgba(200,131,42,0.3)', color: '#C8A882' }}
                        aria-label={`Share on ${label}`}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,131,42,0.35)')}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,131,42,0.18)')}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={path}/></svg>
                      </a>
                    ))}
                    <a
                      href={`mailto:?subject=${encodeURIComponent(accessories[selectedAccessory].name)}&body=${encodeURIComponent(window.location.href)}`}
                      className="w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-600"
                      style={{ background: 'rgba(200,131,42,0.18)', border: '1px solid rgba(200,131,42,0.3)', color: '#C8A882' }}
                      aria-label="Share via Email"
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,131,42,0.35)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,131,42,0.18)')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav prev/next */}
            {selectedAccessory > 0 && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-600"
                style={{ background: 'rgba(37,26,14,0.85)', color: '#E8DCC8', fontSize: '1.6rem', border: '1px solid rgba(200,131,42,0.25)' }}
                onClick={(e) => { e.stopPropagation(); setSelectedAccessory(selectedAccessory - 1); setCurrentAccessoryImageIndex(0); }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,131,42,0.4)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,26,14,0.85)')}
              >‹</button>
            )}
            {selectedAccessory < accessories.length - 1 && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-600"
                style={{ background: 'rgba(37,26,14,0.85)', color: '#E8DCC8', fontSize: '1.6rem', border: '1px solid rgba(200,131,42,0.25)' }}
                onClick={(e) => { e.stopPropagation(); setSelectedAccessory(selectedAccessory + 1); setCurrentAccessoryImageIndex(0); }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,131,42,0.4)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,26,14,0.85)')}
              >›</button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
