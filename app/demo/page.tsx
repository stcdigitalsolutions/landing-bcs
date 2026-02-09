'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Building2, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { config } from '@/lib/config';

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneCode: '+55',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/submit-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        // Limpar formulário
        setFormData({
          name: '',
          email: '',
          phone: '',
          phoneCode: '+55',
          company: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Erro ao enviar formulário. Tente novamente.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Erro ao enviar formulário. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Montar mensagem do WhatsApp com dados do formulário
  const whatsappMessage = encodeURIComponent(
    `${config.whatsappDefaultMessage}\n\n` +
    `Nome: ${formData.name || '[Não informado]'}\n` +
    `Email: ${formData.email || '[Não informado]'}\n` +
    `Telefone: ${formData.phoneCode} ${formData.phone || '[Não informado]'}\n` +
    `Empresa: ${formData.company || '[Não informado]'}`
  );
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${whatsappMessage}`;
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Experiência a plataforma da{' '}
                <span className="text-blue-600">BCS Consultoria</span>{' '}
                em ação!
              </h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Preencha o formulário para agendar uma demonstração personalizada e 
                descubra como ajudamos você a transformar dados em insights para decisões mais rápidas, 
                maior retenção e operações mais eficientes.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-lg">✓</span>
                  </div>
                  <p className="text-gray-700">
                    Apresentação personalizada das soluções BCS
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <p className="text-gray-700">
                    Análise inicial da maturidade digital da sua organização
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 text-lg">✓</span>
                  </div>
                  <p className="text-gray-700">
                    Consultoria sobre os próximos passos da sua jornada digital
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right side - Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
            >
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/60 to-white/30 rounded-3xl p-8 border border-white/40 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Mensagem de sucesso/erro */}
                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
                      <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      <p className="text-sm text-green-800">{submitMessage}</p>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                      <p className="text-sm text-red-800">{submitMessage}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome*
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl backdrop-blur-lg bg-white/60 border border-white/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="Seu nome completo"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mail comercial*
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl backdrop-blur-lg bg-white/60 border border-white/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefone*
                    </label>
                    <div className="flex gap-3">
                      <select 
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handleChange}
                        className="w-24 px-3 py-3.5 rounded-xl backdrop-blur-lg bg-white/60 border border-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      >
                        <option value="+55">🇧🇷 +55</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+351">🇵🇹 +351</option>
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-3.5 rounded-xl backdrop-blur-lg bg-white/60 border border-white/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Sua empresa é**
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <select
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl backdrop-blur-lg bg-white/60 border border-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none transition-all cursor-pointer"
                      >
                        <option value="">Selecione</option>
                        <option value="startup">Startup</option>
                        <option value="pequena">Pequena Empresa</option>
                        <option value="media">Média Empresa</option>
                        <option value="grande">Grande Empresa</option>
                        <option value="corporacao">Corporação</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 pt-2">
                    <p>
                      Se você concordar em ser contatado por nós, marque abaixo:
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Enviando...
                      </>
                    ) : (
                      'Agendar demonstração'
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-gray-500">ou</span>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-8 py-4 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all shadow-lg hover:shadow-xl font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    Falar no WhatsApp
                  </a>

                  <p className="text-xs text-gray-500 text-center">
                    * Campos obrigatórios. Ao enviar, você concorda com nossa política de privacidade.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
