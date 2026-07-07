'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Star,
  Menu,
  X,
  ArrowUp,
  Clock,
  CheckCircle,
} from 'lucide-react';

/* ────────────────────────────────────────────
   NAVIGATION DATA
   ──────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Signalétique', href: '#services' },
  { label: 'Enseignes déployantes', href: '#services' },
  { label: 'Habillage & Covering', href: '#services' },
  { label: 'Aménagement', href: '#services' },
  { label: 'Stores & Bannes', href: '#services' },
  { label: 'Identification', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

/* ────────────────────────────────────────────
   SERVICES DATA
   ──────────────────────────────────────────── */
const WORK_IMAGES = [
  '/work-1.jpeg',
  '/work-2.jpeg',
  '/work-3.jpeg',
  '/work-4.jpeg',
  '/work-5.jpeg',
  '/work-6.jpeg',
];

const SERVICES = [
  {
    title: 'Signalétique & Enseignes',
    desc: "Conception, fabrication et pose d'enseignes professionnelles sur mesure pour donner vie à votre identité de marque.",
    img: '/work-1.jpeg',
    tag: 'Enseignes',
  },
  {
    title: 'Enseignes Déployantes',
    desc: "Des enseignes à bras déployant, légères et résistantes, idéales pour capter l'attention en toute circonstance.",
    img: '/work-2.jpeg',
    tag: 'Déployantes',
  },
  {
    title: 'Habillage Véhicule',
    desc: 'Transformez vos véhicules en supports publicitaires mobiles grâce à nos solutions de covering haute définition.',
    img: '/work-3.jpeg',
    tag: 'Covering',
  },
  {
    title: 'Habillage Mural & Façade',
    desc: 'Mettez en valeur vos surfaces avec des habillages muraux percutants qui renforcent votre présence locale.',
    img: '/work-4.jpeg',
    tag: 'Mural',
  },
  {
    title: 'Stores & Bannes',
    desc: 'Stores commerciaux et bannes publicitaires personnalisés, alliant esthétique et protection solaire.',
    img: '/work-5.jpeg',
    tag: 'Stores',
  },
  {
    title: 'Plaques & Identification',
    desc: 'Plaques professionnelles, signalétique intérieure et extérieure pour une identification claire et durable.',
    img: '/work-6.jpeg',
    tag: 'Identification',
  },
  {
    title: "Aménagement d'Espaces",
    desc: "Agencement de stands, vitrines et espaces commerciaux pour sublimer votre activité et attirer la clientèle.",
    img: '/work-1.jpeg',
    tag: 'Aménagement',
  },
  {
    title: 'Stand & Événementiel',
    desc: 'Conception et montage de stands pour salons, foires et événements professionnels avec un rendu soigné.',
    img: '/work-2.jpeg',
    tag: 'Événementiel',
  },
];

/* ────────────────────────────────────────────
   REVIEWS DATA
   ──────────────────────────────────────────── */
const REVIEWS = [
  {
    name: 'Karim B.',
    text: "Excellent travail sur la signalétique de mon commerce. L'équipe est réactive, à l'écoute et le résultat dépasse mes attentes. Je recommande vivement art&fact !",
    rating: 5,
  },
  {
    name: 'Sara M.',
    text: 'Habillage véhicule impeccable avec une finition de qualité. Le rendu est fidèle au projet et la pose a été réalisée dans les délais convenus.',
    rating: 5,
  },
  {
    name: 'Yacine L.',
    text: "Nous avons fait appel à art&fact pour l'aménagement de notre stand à la foire de Tipaza. Un travail soigné, professionnel et un suivi impeccable.",
    rating: 5,
  },
  {
    name: 'Amina H.',
    text: 'La plaque professionnelle réalisée par art&fact est magnifique. Matériaux de qualité, gravure précise et livraison rapide. Merci pour ce travail !',
    rating: 5,
  },
  {
    name: 'Mehdi R.',
    text: 'Très satisfaite de mon enseigne lumineuse. L\'effet de nuit est superbe et l\'installation a été faite proprement. Service au top !',
    rating: 5,
  },
  {
    name: 'Nadia F.',
    text: 'Art&fact a transformé la façade de notre boutique avec un habillage mural moderne et élégant. Nos clients remarquent la différence !',
    rating: 5,
  },
];

/* ────────────────────────────────────────────
   FOOTER SERVICE LINKS
   ──────────────────────────────────────────── */
const FOOTER_SERVICES = [
  "Création d'enseigne",
  'Installation store commerce',
  'Enseigne de magasin',
  'Habillage mural',
  'Enseigne lumineuse',
  'Habillage véhicule',
  'Enseigne sur mesure',
  'Habillage commerce',
  'Enseigne déployante',
  'Aménagement de stand',
  'Création plaque professionnelle',
  'Création store sur mesure',
  'Installation enseigne',
  'Signalétique intérieure',
];

/* ────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────── */
export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeReviewPage, setActiveReviewPage] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewPage((p) => (p + 1) % Math.ceil(REVIEWS.length / 3));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(REVIEWS.length / reviewsPerPage);
  const currentReviews = REVIEWS.slice(
    activeReviewPage * reviewsPerPage,
    activeReviewPage * reviewsPerPage + reviewsPerPage
  );

  return (
    <div ref={topRef} className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ═══════════ STICKY NAV ═══════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/logo-artfact.png"
                alt="art&fact logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-red-600">
                art<span className="text-gray-800">&amp;fact</span>
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 tracking-wide uppercase">
                Communication visuelle
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="tel:+213555123456"
            className="hidden lg:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Phone className="w-4 h-4" />
            Nous appeler
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <ul className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 border-t border-gray-100">
                <a
                  href="tel:+213555123456"
                  className="flex items-center gap-2 justify-center bg-red-600 text-white py-3 rounded-lg text-sm font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Nous appeler
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section
        id="accueil"
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          />
        </div>

        {/* Red accent bar top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
          {/* Single Logo */}
          <div className="flex items-center justify-center mb-10">
            <div className="w-28 h-28 sm:w-36 sm:h-36 relative">
              <Image
                src="/logo-artfact.png"
                alt="art&fact logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            ENSEIGNES, HABILLAGE{' '}
            <span className="text-red-500">ET</span> COMMUNICATION VISUELLE
          </h1>

          <p className="text-lg sm:text-xl text-red-400 font-semibold mb-4 tracking-wide">
            KOLÉA ET LA RÉGION DE TIPAZA
          </p>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed mb-10">
            art&amp;fact conçoit, fabrique et pose des solutions de signalétique
            pour renforcer la visibilité de votre entreprise, avec un rendu
            durable, professionnel et soigné.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+213555123456"
              className="flex items-center gap-2 border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all text-base"
            >
              <Phone className="w-5 h-5" />
              +213 555 123 456
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-base"
            >
              <Mail className="w-5 h-5" />
              Nous contacter
            </a>
          </div>

          {/* Scroll indicator */}
          <a
            href="#about"
            className="inline-flex flex-col items-center mt-16 text-gray-400 hover:text-white transition-colors animate-bounce"
          >
            <span className="text-xs mb-1">Découvrir</span>
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Red top bar */}
          <div className="w-full h-1.5 bg-red-600 mb-12 rounded-full" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600 mb-3 leading-tight">
                VOTRE PARTENAIRE POUR UNE VISIBILITÉ LOCALE DURABLE
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mb-6 font-medium">
                Des réalisations sur mesure, pensées pour attirer et rassurer.
              </p>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                <p>
                  Une façade bien identifiée, un message clair et une identité
                  cohérente font toute la différence. art&amp;fact vous accompagne
                  de la conception à la pose pour créer une présence visuelle
                  efficace, adaptée à votre activité et à votre environnement.
                  Notre approche privilégie la lisibilité, la qualité des
                  finitions et l&apos;impact, afin que vos supports deviennent de
                  véritables outils de conversion.
                </p>
                <p>
                  Que vous lanciez votre commerce, modernisiez votre devanture
                  ou prépariez un événement, nous vous orientons vers la
                  solution la plus pertinente selon votre budget, vos
                  contraintes et vos objectifs. Chaque projet est unique et
                  mérite une attention particulière.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                {['Qualité premium', 'Pose incluse', 'Sur mesure'].map(
                  (item) => (
                    <span
                      key={item}
                      className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-full"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/work-1.jpeg"
                alt="Réalisation art&fact - Enseigne professionnelle"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                  NOS RÉALISATIONS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              NOS <span className="text-red-600">DOMAINES</span>{' '}
              D&apos;EXPERTISE
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
              Découvrez l&apos;ensemble de nos services de signalétique et
              communication visuelle, conçus pour répondre à tous vos besoins.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-600/90 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded">
                      {s.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              POURQUOI <span className="text-red-600">CHOISIR</span> ART&amp;FACT ?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Expertise locale',
                desc: 'Basés à Koléa, nous connaissons les spécificités du marché local et les exigences de la région de Tipaza.',
              },
              {
                icon: '🔧',
                title: 'Fabrication sur mesure',
                desc: "Chaque projet est conçu et fabriqué selon vos besoins précis, avec des matériaux de haute qualité.",
              },
              {
                icon: '🚀',
                title: 'De la conception à la pose',
                desc: "Nous prenons en charge l'intégralité du processus, de l'idée initiale jusqu'à l'installation finale sur site.",
              },
              {
                icon: '⏱️',
                title: 'Respect des délais',
                desc: 'Nous nous engageons à livrer vos projets dans les délais convenus, sans compromis sur la qualité.',
              },
              {
                icon: '💰',
                title: 'Tarifs compétitifs',
                desc: 'Des prix justes et transparents, adaptés à votre budget sans sacrifier la qualité du rendu.',
              },
              {
                icon: '🤝',
                title: 'Suivi personnalisé',
                desc: 'Un interlocuteur unique vous accompagne tout au long de votre projet pour une communication fluide.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PORTFOLIO GALLERY ═══════════ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              NOS <span className="text-red-600">RÉALISATIONS</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
              Découvrez quelques-unes de nos réalisations récentes en signalétique, enseignes et communication visuelle.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {WORK_IMAGES.map((img, i) => (
              <div
                key={i}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]"
              >
                <Image
                  src={img}
                  alt={`Réalisation art&fact ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs font-medium">
                    Réalisation {i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-blue-600 font-semibold text-sm sm:text-base">
                Avis clients
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">({REVIEWS.length})</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              CE QUE DISENT{' '}
              <span className="text-red-600">NOS CLIENTS</span>
            </h2>
          </div>

          {/* Review cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {currentReviews.map((r, i) => (
              <div
                key={`r-${activeReviewPage}-${i}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">
                      {r.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {r.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReviewPage(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === activeReviewPage
                    ? 'bg-red-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA BAND ═══════════ */}
      <section className="bg-red-600 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            UN PROJET EN TÊTE ?
          </h2>
          <p className="text-red-100 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour un devis gratuit et
            personnalisé. Notre équipe se fera un plaisir de vous accompagner
            dans la réalisation de votre projet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors text-base"
            >
              Demander un devis
            </a>
            <a
              href="tel:+213555123456"
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-lg font-bold transition-all text-base"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                +213 555 123 456
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ HOURS BAND ═══════════ */}
      <div className="bg-red-700 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-white text-sm font-medium">
          <Clock className="w-4 h-4" />
          <span>Horaires : Dimanche — Jeudi, 9h — 18h</span>
        </div>
      </div>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-20 sm:py-28 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              CONTACTEZ-<span className="text-red-500">NOUS</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              N&apos;hésitez pas à nous joindre pour toute question ou demande de
              devis. Nous sommes à votre écoute.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Address */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-gray-300 uppercase tracking-wider">
                Adresse
              </h3>
              <p className="text-gray-400 text-sm">Koléa, Tipaza, Algérie</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-gray-300 uppercase tracking-wider">
                Téléphone
              </h3>
              <p className="text-gray-400 text-sm">+213 555 123 456</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-gray-300 uppercase tracking-wider">
                E-mail
              </h3>
              <p className="text-gray-400 text-sm">contact@artfact.dz</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-gray-950 text-gray-400">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1 - Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo-artfact.png"
                    alt="art&fact"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-white">
                  art<span className="text-red-500">&amp;fact</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Votre partenaire de confiance pour tous vos projets de
                signalétique, enseignes et communication visuelle à Koléa et
                dans la région de Tipaza.
              </p>
              <p className="text-xs text-gray-500">
                Koléa, Tipaza, Algérie
              </p>
            </div>

            {/* Col 2 - Navigation */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="hover:text-red-400 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 - Services */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Nos services
              </h4>
              <ul className="space-y-2 text-sm">
                {FOOTER_SERVICES.slice(0, 7).map((s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="hover:text-red-400 transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 - More services */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Expertises
              </h4>
              <ul className="space-y-2 text-sm">
                {FOOTER_SERVICES.slice(7).map((s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="hover:text-red-400 transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Service links band */}
        <div className="border-t border-gray-800 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap justify-center gap-3">
              {FOOTER_SERVICES.map((s) => (
                <a
                  key={s}
                  href="#services"
                  className="text-xs font-medium bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-full transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span>
              &copy; {new Date().getFullYear()} art&amp;fact — Tous droits
              réservés
            </span>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                Mentions légales
              </a>
              <a
                href="#"
                className="hover:text-red-400 transition-colors"
              >
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════ SCROLL TO TOP ═══════════ */}
      {showTop && (
        <button
          onClick={() =>
            topRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}