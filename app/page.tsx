'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

// ─── Data ──────────────────────────────────────────────────────────────────────

const methodology = [
  {
    category: 'Diagnóstico',
    title: '01. Mapear',
    desc: 'Identificamos onde a IA gera ganho real na sua operação — processos repetitivos, gargalos de produtividade e oportunidades que passam despercebidas no dia a dia.',
  },
  {
    category: 'Laboratório',
    title: '02. Construir',
    desc: 'Desenvolvemos e testamos soluções práticas de IA nos nossos laboratórios, validando cada aplicação antes de colocá-la para rodar no seu ambiente.',
  },
  {
    category: 'Implantação',
    title: '03. Integrar',
    desc: 'Colocamos a solução dentro da rotina da equipe com treinamento prático, garantindo que a adoção aconteça de forma natural e sem atrito.',
  },
  {
    category: 'Gestão Contínua',
    title: '04. Evoluir',
    desc: 'Monitoramos resultados, ajustamos as soluções e identificamos novas oportunidades. Sua operação fica mais inteligente a cada ciclo.',
  },
];

const services = [
  {
    number: '01',
    title: 'Consultoria em IA',
    desc: 'Mapeamos onde a inteligência artificial gera ganho real no seu negócio. Nada de diagnósticos genéricos — entregamos um plano de ação com prioridades claras, estimativa de impacto e roadmap de implementação sob medida para a sua operação.',
    soon: false,
  },
  {
    number: '02',
    title: 'Laboratórios de IA',
    desc: 'Workshops presenciais e práticos onde sua equipe constrói soluções reais de IA aplicadas ao próprio dia a dia. Sem teoria em excesso: os participantes saem com ferramentas funcionando e autonomia para evoluí-las.',
    soon: false,
  },
  {
    number: '03',
    title: 'EOQ',
    desc: 'O EOQ é um assistente inteligente de estudo que responde dúvidas dos alunos usando exclusivamente os materiais escolhidos pelo professor — textos, apostilas ou artigos.',
    soon: true,
  },
];

const marqueeItems = [
  'Transformação Digital',
  'Ativação de Dados',
  'Inteligência Artificial',
  'Governança',
  'Analytics',
  'Consultoria',
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function CharReveal({ text, baseDelay = 0.1 }: { text: string; baseDelay?: number }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{ animationDelay: `${baseDelay + i * 0.03}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
}

function MarqueeContent({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="marquee-content" aria-hidden={ariaHidden}>
      {marqueeItems.map((item, i) => (
        <>
          <span key={`t${i}`}>{item}</span>
          <span key={`d${i}`} className="dot" />
        </>
      ))}
    </div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
  },
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const { scrollY } = useScroll();

  const shape1Y = useTransform(scrollY, [0, 600], [0, -40]);
  const shape1X = useTransform(scrollY, [0, 600], [0, 20]);
  const shape2Y = useTransform(scrollY, [0, 600], [0, 30]);
  const shape2X = useTransform(scrollY, [0, 600], [0, -15]);
  const shape3Y = useTransform(scrollY, [0, 600], [0, -20]);

  return (
    <div className="bcs-root">
      <CustomCursor />
      <Navigation />

      <main className="main">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section id="home" className="hero">
          <div className="hero-content">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span>Transformação Digital para o Futuro</span>
            </motion.div>

            <h1 className="hero-title">
              <span className="hero-title-line">
                <CharReveal text="BCS" baseDelay={0.2} />
              </span>
              <span className="hero-title-line">
                <CharReveal text="Consultoria &" baseDelay={0.3} />
              </span>
              <span className="hero-title-line accent">
                <CharReveal text="Laboratórios de IA" baseDelay={0.4} />
              </span>
            </h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Consultoria de IA aplicada. Ajudamos empresas e profissionais a ganhar produtividade
              com soluções testadas nos nossos laboratórios e mantidas pela nossa equipe.
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <a href="#contact" className="btn btn-primary">Fale Conosco</a>
              <a href="#services" className="btn btn-secondary">Nossos Serviços</a>
            </motion.div>
          </div>

          <div className="hero-visual">
            <motion.div className="hero-shape shape-1" style={{ y: shape1Y, x: shape1X }} />
            <motion.div className="hero-shape shape-2" style={{ y: shape2Y, x: shape2X }} />
            <motion.div className="hero-shape shape-3" style={{ y: shape3Y }} />
          </div>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <span>Scroll</span>
            <div className="scroll-line" />
          </motion.div>
        </section>

        {/* ── Methodology ─────────────────────────────────────────────────── */}
        <section id="methodology" className="section methodology">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span className="section-label">Nosso Processo</span>
            <h2 className="section-title">Como Trabalhamos</h2>
          </motion.div>

          <div className="projects-grid">
            {methodology.map((item, index) => (
              <motion.article
                key={item.title}
                className="project-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="project-image">
                  <div className="project-overlay">
                    <span className="project-category">{item.category}</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{item.title}</h3>
                  <p className="project-desc">{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="section-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <a href="#services" className="link-arrow">
              <span>Conheça Nossos Serviços</span>
              <svg viewBox="0 0 24 24" className="arrow-icon">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </section>

        {/* ── Services ────────────────────────────────────────────────────── */}
        <section id="services" className="section services">
          <motion.div
            className="services-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span className="section-label">O que Fazemos</span>
            <h2 className="section-title">Nossos Serviços</h2>
            <p className="section-desc">
              Consultoria, laboratórios práticos e soluções gerenciadas. IA que resolve problemas
              reais e entrega produtividade no dia a dia.
            </p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className={`service-card${service.soon ? ' service-card--soon' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="service-number">{service.number}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                {service.soon && <span className="service-badge">Em Breve</span>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── About ───────────────────────────────────────────────────────── */}
        <section id="about" className="section about">
          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="section-label">Sobre Nós</span>
              <h2 className="section-title">Transformando Organizações</h2>
              <p className="about-desc">
                A BCS é uma consultoria de inteligência artificial aplicada, focada em gerar
                produtividade real para empresas e profissionais. Não vendemos promessas —
                desenvolvemos soluções práticas de IA em laboratórios próprios, testadas e
                validadas antes de chegar ao seu negócio.
              </p>
              <p className="about-desc">
                Atuamos como parceiros de longo prazo através de serviços gerenciados: da
                identificação de oportunidades à implementação e evolução contínua. Enquanto outras
                consultorias entregam relatórios, nós entregamos resultados que você mede no dia a
                dia da operação.
              </p>
            </motion.div>

            <motion.div
              className="about-visual"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="about-image">
                <img src="/image_card.jpg" alt="BCS - Tecnologia" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Marquee ─────────────────────────────────────────────────────── */}
        <section className="marquee">
          <div className="marquee-track">
            <MarqueeContent />
            <MarqueeContent ariaHidden />
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────────────────── */}
        <section id="contact" className="section contact">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="contact-title">
              Vamos Transformar<br />sua Organização?
            </h2>
            <p className="contact-desc">
              Pronto para iniciar sua jornada digital? Entre em contato e descubra como podemos
              impulsionar seu negócio.
            </p>
            <a href="#" className="btn btn-primary contact-btn">Iniciar Conversa</a>
            <div className="contact-links">
              <a href="#" className="contact-link">LinkedIn</a>
              <a href="#" className="contact-link">Instagram</a>
              <a href="#" className="contact-link">E-mail</a>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
