import { ArrowRight, Lightbulb, Database, Settings, CheckCircle2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                BCS Consultoria
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Início</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">Sobre</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Serviços</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contato</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden backdrop-blur-md bg-white/40 border-t border-white/20">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a href="#home" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Início</a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Sobre</a>
              <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Serviços</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Contato</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              className="inline-block mb-6 px-6 py-3 rounded-full backdrop-blur-lg bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-white/30"
              variants={fadeIn}
            >
              <span className="text-gray-700">Transformação Digital para o Futuro</span>
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              BCS Consultoria
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Tecnológica
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
              variants={fadeInUp}
            >
              Impulsionamos a transformação digital da sua organização com soluções inovadoras,
              ativação de dados inteligente e consultoria especializada.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Fale Conosco
                <ArrowRight className="ml-2" size={20} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full backdrop-blur-lg bg-white/40 text-gray-700 hover:bg-white/60 transition-all border border-white/30"
              >
                Nossos Serviços
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-3xl p-8 md:p-12 border border-white/30 shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
          >
            <motion.div 
              className="text-center mb-12"
              variants={fadeInUp}
            >
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Sobre Nós</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            </motion.div>
            
            <motion.div 
              className="max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p className="text-lg text-gray-700 mb-6 leading-relaxed" variants={fadeInUp}>
                A BCS Consultoria Tecnológica é especializada em transformar organizações através da 
                tecnologia e da inteligência de dados. Nossa missão é capacitar empresas a navegarem 
                com sucesso pela era digital, implementando soluções inovadoras que geram resultados 
                mensuráveis.
              </motion.p>
              <motion.p className="text-lg text-gray-700 leading-relaxed" variants={fadeInUp}>
                Com expertise em consultoria estratégica, ativação de dados e desenvolvimento de 
                soluções personalizadas, trabalhamos lado a lado com nossos clientes para criar um 
                futuro digital sustentável e orientado por dados.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Soluções completas para impulsionar a transformação digital da sua organização
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Consultoria em Transformação Digital */}
            <motion.div 
              className="backdrop-blur-xl bg-gradient-to-br from-blue-500/15 to-blue-600/10 rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-2xl transition-all"
              variants={scaleIn}
            >
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
                <Lightbulb className="text-white" size={32} />
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Consultoria em Transformação Digital
              </h4>
              
              <p className="text-gray-700 mb-6">
                Trabalhamos em 4 pilares fundamentais para garantir a evolução digital da sua organização:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold">1</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Mapear</h5>
                    <p className="text-sm text-gray-600">
                      Levantar maturidade digital da organização e principais fluxos de trabalho
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Informatizar</h5>
                    <p className="text-sm text-gray-600">
                      Adquirir recursos e ferramentas que possibilitem a migração para informatização dos fluxos de trabalho
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold">3</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Governar</h5>
                    <p className="text-sm text-gray-600">
                      Garantir segurança do ambiente, controle sobre a informação e gestão do conhecimento
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-700 font-bold">4</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Decidir</h5>
                    <p className="text-sm text-gray-600">
                      Utilizar a estrutura para garantir tomada de decisões assertivas, baseada em dados seguros e confiáveis
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ativação de Dados */}
            <motion.div 
              className="backdrop-blur-xl bg-gradient-to-br from-green-500/15 to-green-600/10 rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-2xl transition-all"
              variants={scaleIn}
            >
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-6">
                <Database className="text-white" size={32} />
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Ativação de Dados
              </h4>
              
              <p className="text-gray-700 mb-6">
                Transforme dados em insights valiosos com nossas soluções avançadas:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Agentes de IA</h5>
                    <p className="text-sm text-gray-600">
                      Desenvolvimento de agentes inteligentes personalizados para automatizar processos e gerar insights
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Servidores MCP com SSE</h5>
                    <p className="text-sm text-gray-600">
                      Infraestrutura robusta para processamento e comunicação de dados em tempo real
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Analytics com Power BI</h5>
                    <p className="text-sm text-gray-600">
                      Dashboards interativos e relatórios inteligentes para visualização de dados
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">Soluções com Databricks</h5>
                    <p className="text-sm text-gray-600">
                      Plataforma de dados unificada para analytics avançado e machine learning
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Serviços Gerenciados */}
            <motion.div 
              className="backdrop-blur-xl bg-gradient-to-br from-blue-500/15 to-green-500/15 rounded-2xl p-8 border border-white/30 shadow-lg hover:shadow-2xl transition-all md:col-span-2 lg:col-span-1"
              variants={scaleIn}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center mb-6">
                <Settings className="text-white" size={32} />
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Serviços Gerenciados (CRM)
              </h4>
              
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-white/40 mb-4">
                <span className="text-sm font-semibold text-gray-700">Em Desenvolvimento</span>
              </div>

              <p className="text-gray-700 mb-6">
                Em breve, ofereceremos soluções completas de CRM gerenciado para otimizar o 
                relacionamento com seus clientes e impulsionar suas vendas.
              </p>

              <p className="text-gray-600">
                Fique atento para novidades sobre gestão de clientes, automação de vendas e 
                análise de comportamento do consumidor.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-3xl p-12 border border-white/30 shadow-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
          >
            <motion.h3 
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={fadeInUp}
            >
              Pronto para Transformar sua Organização?
            </motion.h3>
            <motion.p 
              className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Entre em contato conosco e descubra como podemos impulsionar sua jornada digital
            </motion.p>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-lg"
              variants={fadeInUp}
            >
              Iniciar Conversa
              <ArrowRight className="ml-2" size={24} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-6">
              Preencha o formulário abaixo e nossa equipe entrará em contato em breve
            </p>
          </motion.div>

          <motion.div 
            className="backdrop-blur-xl bg-gradient-to-br from-white/40 to-white/20 rounded-2xl p-8 border border-white/30 shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-lg bg-white/50 border border-white/40 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg backdrop-blur-lg bg-white/50 border border-white/40 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-lg bg-white/50 border border-white/40 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Nome da sua empresa"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-lg bg-white/50 border border-white/40 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  placeholder="Como podemos ajudar sua organização?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Enviar Mensagem
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-green-500/10 border-t border-white/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              BCS Consultoria Tecnológica
            </h2>
            <p className="text-gray-600 mb-6">
              Transformando organizações através da tecnologia e dados
            </p>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} BCS Consultoria Tecnológica. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}