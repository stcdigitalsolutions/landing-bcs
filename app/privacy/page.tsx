'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Trash2, FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PrivacyPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="text-blue-600" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Política de Privacidade
                </h1>
                <p className="text-gray-600">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 md:p-12 border border-white/40 shadow-xl space-y-8"
          >
            {/* Introdução */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={24} />
                1. Introdução
              </h2>
              <p className="text-gray-700 leading-relaxed">
                A BCS Consultoria Tecnológica (&quot;nós&quot;, &quot;nosso&quot; ou &quot;empresa&quot;) respeita sua privacidade e está comprometida 
                em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos 
                e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            {/* Dados Coletados */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye size={24} />
                2. Dados Pessoais Coletados
              </h2>
              <p className="text-gray-700 mb-4">Coletamos os seguintes dados pessoais através do formulário de demonstração:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Nome completo</strong> - Para identificação e contato personalizado</li>
                <li><strong>E-mail comercial</strong> - Para comunicação e envio de informações</li>
                <li><strong>Telefone</strong> - Para contato direto e agendamento</li>
                <li><strong>Tipo de empresa</strong> - Para personalização do atendimento</li>
              </ul>
            </section>

            {/* Base Legal */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock size={24} />
                3. Base Legal e Finalidade
              </h2>
              <p className="text-gray-700 mb-4">
                O processamento dos seus dados pessoais é baseado no <strong>consentimento</strong> (Art. 7º, I da LGPD), 
                que você fornece ao preencher e enviar o formulário.
              </p>
              <p className="text-gray-700 mb-4">Utilizamos seus dados para as seguintes finalidades:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Contato comercial e agendamento de demonstrações</li>
                <li>Envio de informações sobre produtos e serviços</li>
                <li>Melhoria da experiência do cliente</li>
                <li>Cumprimento de obrigações legais e regulatórias</li>
              </ul>
            </section>

            {/* Compartilhamento */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Compartilhamento de Dados
              </h2>
              <p className="text-gray-700 mb-4">
                Seus dados pessoais podem ser compartilhados com os seguintes prestadores de serviços:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Neon Database</strong> - Armazenamento seguro de dados em servidores PostgreSQL</li>
                <li><strong>Vercel</strong> - Hospedagem e infraestrutura da aplicação</li>
                <li><strong>Google</strong> - Autenticação via OAuth (apenas para área administrativa)</li>
                <li><strong>WhatsApp</strong> - Apenas se você autorizar explicitamente o contato via WhatsApp</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Todos os prestadores de serviços são contratados sob acordos de confidencialidade e estão em conformidade 
                com a LGPD. Não vendemos ou alugamos seus dados pessoais para terceiros.
              </p>
            </section>

            {/* Retenção */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Retenção de Dados
              </h2>
              <p className="text-gray-700">
                Mantemos seus dados pessoais pelo período necessário para cumprir as finalidades descritas nesta política, 
                ou pelo período exigido por lei. Em geral, os dados são mantidos por <strong>2 (dois) anos</strong> após o 
                último contato, salvo se houver obrigação legal ou necessidade comercial legítima para retenção por período maior.
              </p>
            </section>

            {/* Direitos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Seus Direitos (LGPD)
              </h2>
              <p className="text-gray-700 mb-4">
                Conforme a LGPD, você tem os seguintes direitos:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Confirmação e acesso</strong> - Saber se tratamos seus dados e acessá-los</li>
                <li><strong>Correção</strong> - Solicitar correção de dados incompletos ou desatualizados</li>
                <li><strong>Anonimização, bloqueio ou eliminação</strong> - Solicitar exclusão de dados desnecessários</li>
                <li><strong>Portabilidade</strong> - Receber seus dados em formato estruturado</li>
                <li><strong>Revogação do consentimento</strong> - Retirar seu consentimento a qualquer momento</li>
                <li><strong>Informação sobre compartilhamento</strong> - Saber com quem compartilhamos seus dados</li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-gray-700 font-semibold mb-2">
                  Para exercer seus direitos, entre em contato:
                </p>
                <p className="text-gray-700">
                  E-mail: <a href="mailto:privacidade@bcs.com" className="text-blue-600 hover:underline">privacidade@bcs.com</a>
                </p>
                <p className="text-gray-700 mt-2">
                  Ou use nosso{' '}
                  <Link href="/data-request" className="text-blue-600 hover:underline font-semibold">
                    formulário de solicitação de dados
                  </Link>
                </p>
              </div>
            </section>

            {/* Segurança */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Segurança dos Dados
              </h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas técnicas e administrativas para proteger seus dados pessoais:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Criptografia de dados em trânsito (HTTPS/TLS)</li>
                <li>Criptografia de dados em repouso no banco de dados</li>
                <li>Controle de acesso baseado em autenticação</li>
                <li>Backup seguro e regular</li>
                <li>Monitoramento de segurança contínuo</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Cookies e Tecnologias Similares
              </h2>
              <p className="text-gray-700">
                Utilizamos cookies essenciais para autenticação e sessão. Não utilizamos cookies de rastreamento 
                ou publicitários sem seu consentimento explícito.
              </p>
            </section>

            {/* Alterações */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Alterações nesta Política
              </h2>
              <p className="text-gray-700">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações 
                significativas através do nosso site ou por e-mail. A data da última atualização está indicada no topo desta página.
              </p>
            </section>

            {/* Contato */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Contato e Dúvidas
              </h2>
              <p className="text-gray-700 mb-4">
                Para questões sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-700 font-semibold mb-2">BCS Consultoria Tecnológica</p>
                <p className="text-gray-700">E-mail: <a href="mailto:privacidade@bcs.com" className="text-blue-600 hover:underline">privacidade@bcs.com</a></p>
                <p className="text-gray-700 mt-2">
                  Encarregado de Proteção de Dados (DPO): disponível através do e-mail acima
                </p>
              </div>
            </section>

            {/* Voltar */}
            <div className="pt-8 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Voltar para a página inicial
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
