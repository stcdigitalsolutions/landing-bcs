'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Trash2, Download, Edit, XCircle, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function DataRequestPage() {
  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState<'access' | 'correction' | 'deletion' | 'portability' | 'revocation'>('access');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; data?: any } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/data-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, requestType, message }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success && requestType === 'portability' && data.data) {
        // Criar download do JSON
        const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meus-dados-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Erro ao processar solicitação. Tente novamente ou entre em contato.',
      });
    } finally {
      setLoading(false);
    }
  };

  const requestTypes = [
    { value: 'access', label: 'Acessar meus dados', icon: Eye, description: 'Ver quais dados temos sobre você' },
    { value: 'correction', label: 'Corrigir dados', icon: Edit, description: 'Solicitar correção de informações' },
    { value: 'deletion', label: 'Excluir meus dados', icon: Trash2, description: 'Solicitar exclusão completa' },
    { value: 'portability', label: 'Portabilidade de dados', icon: Download, description: 'Baixar meus dados em formato JSON' },
    { value: 'revocation', label: 'Revogar consentimento', icon: XCircle, description: 'Retirar consentimento para processamento' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Exercer Seus Direitos LGPD
            </h1>
            <p className="text-gray-600">
              Solicite acesso, correção, exclusão ou portabilidade dos seus dados pessoais
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 border border-white/40 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Seu E-mail*
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-lg bg-white/60 border border-white/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="seu@email.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use o mesmo email que você usou ao preencher o formulário
                </p>
              </div>

              {/* Tipo de Solicitação */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tipo de Solicitação*
                </label>
                <div className="space-y-3">
                  {requestTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <label
                        key={type.value}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          requestType === type.value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 bg-white/60 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="requestType"
                          value={type.value}
                          checked={requestType === type.value}
                          onChange={(e) => setRequestType(e.target.value as any)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon size={20} className={requestType === type.value ? 'text-blue-600' : 'text-gray-400'} />
                            <span className="font-semibold text-gray-900">{type.label}</span>
                          </div>
                          <p className="text-xs text-gray-600">{type.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Mensagem Opcional */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensagem Adicional (Opcional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-lg bg-white/60 border border-white/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  placeholder="Adicione informações adicionais sobre sua solicitação..."
                />
              </div>

              {/* Resultado */}
              {result && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  result.success
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  {result.success ? (
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  ) : (
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-semibold mb-1 ${
                      result.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {result.success ? 'Sucesso!' : 'Erro'}
                    </p>
                    <p className={`text-sm ${
                      result.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.message}
                    </p>
                    {result.data && Array.isArray(result.data) && result.data.length > 0 && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Seus dados:</p>
                        <pre className="text-xs text-gray-600 overflow-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <FileText size={20} />
                    Enviar Solicitação
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Ao enviar, você confirma que é o titular dos dados associados ao email informado.
                <br />
                Para mais informações, consulte nossa{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </a>
                .
              </p>
            </form>
          </motion.div>

          {/* Informações Adicionais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 backdrop-blur-xl bg-white/60 rounded-3xl p-6 border border-white/40 shadow-xl"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Precisa de Ajuda?</h3>
            <p className="text-gray-700 mb-4">
              Se você tiver dúvidas ou não conseguir usar este formulário, entre em contato diretamente:
            </p>
            <div className="flex items-center gap-2 text-blue-600">
              <Mail size={20} />
              <a href="mailto:privacidade@bcs.com" className="font-semibold hover:underline">
                privacidade@bcs.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
