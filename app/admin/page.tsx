'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Mail,
  Phone,
  Building2,
  Calendar,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  status: 'pending' | 'contacted' | 'converted';
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

interface LeadsResponse {
  success: boolean;
  data: Lead[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

interface Stats {
  total: number;
  pending: number;
  contacted: number;
  converted: number;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    contacted: 0,
    converted: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted' | 'converted'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const limit = 20;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const statusParam = filter === 'all' ? '' : filter;
      const url = `/api/leads?status=${statusParam}&limit=${limit}&offset=${currentPage * limit}`;
      const response = await fetch(url);
      const data: LeadsResponse = await response.json();

      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [all, pending, contacted, converted] = await Promise.all([
        fetch('/api/leads?limit=1'),
        fetch('/api/leads?status=pending&limit=1'),
        fetch('/api/leads?status=contacted&limit=1'),
        fetch('/api/leads?status=converted&limit=1'),
      ]);

      const [allData, pendingData, contactedData, convertedData] = await Promise.all([
        all.json(),
        pending.json(),
        contacted.json(),
        converted.json(),
      ]);

      setStats({
        total: allData.pagination?.total || 0,
        pending: pendingData.pagination?.total || 0,
        contacted: contactedData.pagination?.total || 0,
        converted: convertedData.pagination?.total || 0,
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [filter, currentPage]);

  const updateStatus = async (leadId: number, newStatus: 'pending' | 'contacted' | 'converted') => {
    try {
      setUpdatingStatus(leadId);
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Atualizar lead localmente
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        ));
        // Atualizar estatísticas
        fetchStats();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status. Tente novamente.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'converted':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'contacted':
        return 'Contatado';
      case 'converted':
        return 'Convertido';
      default:
        return status;
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      lead.name.toLowerCase().includes(search) ||
      lead.email.toLowerCase().includes(search) ||
      lead.phone.includes(search) ||
      (lead.company && lead.company.toLowerCase().includes(search))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Painel de Leads</h1>
              <p className="text-gray-600">Gerencie e acompanhe todos os leads do formulário de demonstração</p>
            </div>
            
            {session?.user && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 backdrop-blur-xl bg-white/60 rounded-xl px-4 py-2 border border-white/40">
                  {session.user.image ? (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-white font-bold">
                      {session.user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                    <p className="text-xs text-gray-600">{session.user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-4 py-2 rounded-xl bg-red-100 text-red-800 hover:bg-red-200 transition-all flex items-center gap-2 font-medium"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/40 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Leads</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="text-blue-600" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/40 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pendentes</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="text-yellow-600" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/40 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Contatados</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.contacted}</p>
                </div>
                <CheckCircle2 className="text-blue-600" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/40 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Convertidos</p>
                  <p className="text-3xl font-bold text-green-600">{stats.converted}</p>
                </div>
                <XCircle className="text-green-600" size={32} />
              </div>
            </motion.div>
          </div>

          {/* Filtros e Busca */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/40 shadow-lg mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Busca */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nome, email, telefone ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl backdrop-blur-lg bg-white/60 border border-white/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Filtros */}
              <div className="flex gap-2 flex-wrap">
                {(['all', 'pending', 'contacted', 'converted'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilter(status);
                      setCurrentPage(0);
                    }}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      filter === status
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-white/50'
                    }`}
                  >
                    {status === 'all' ? 'Todos' : getStatusLabel(status)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Lista de Leads */}
          {loading ? (
            <div className="backdrop-blur-xl bg-white/60 rounded-2xl p-12 border border-white/40 shadow-lg text-center">
              <RefreshCw className="animate-spin text-blue-600 mx-auto mb-4" size={32} />
              <p className="text-gray-600">Carregando leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/60 rounded-2xl p-12 border border-white/40 shadow-lg text-center">
              <Users className="text-gray-400 mx-auto mb-4" size={48} />
              <p className="text-gray-600 text-lg">Nenhum lead encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{lead.name}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail size={16} />
                              <a href={`mailto:${lead.email}`} className="hover:text-blue-600">
                                {lead.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={16} />
                              <a href={`tel:${lead.phone}`} className="hover:text-blue-600">
                                {lead.phone}
                              </a>
                            </div>
                            {lead.company && (
                              <div className="flex items-center gap-2">
                                <Building2 size={16} />
                                <span>{lead.company}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Calendar size={16} />
                              <span>{formatDate(lead.submitted_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(lead.status)}`}
                      >
                        {getStatusLabel(lead.status)}
                      </span>

                      <div className="flex gap-2">
                        {lead.status !== 'pending' && (
                          <button
                            onClick={() => updateStatus(lead.id, 'pending')}
                            disabled={updatingStatus === lead.id}
                            className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-all disabled:opacity-50 text-sm font-medium"
                          >
                            {updatingStatus === lead.id ? '...' : 'Pendente'}
                          </button>
                        )}
                        {lead.status !== 'contacted' && (
                          <button
                            onClick={() => updateStatus(lead.id, 'contacted')}
                            disabled={updatingStatus === lead.id}
                            className="px-3 py-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 transition-all disabled:opacity-50 text-sm font-medium"
                          >
                            {updatingStatus === lead.id ? '...' : 'Contatado'}
                          </button>
                        )}
                        {lead.status !== 'converted' && (
                          <button
                            onClick={() => updateStatus(lead.id, 'converted')}
                            disabled={updatingStatus === lead.id}
                            className="px-3 py-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200 transition-all disabled:opacity-50 text-sm font-medium"
                          >
                            {updatingStatus === lead.id ? '...' : 'Convertido'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Paginação */}
          {!loading && leads.length > 0 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-xl bg-white/60 text-gray-700 hover:bg-white/80 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <ChevronLeft size={20} />
                Anterior
              </button>
              <span className="text-gray-600">
                Página {currentPage + 1}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={leads.length < limit}
                className="px-4 py-2 rounded-xl bg-white/60 text-gray-700 hover:bg-white/80 border border-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                Próxima
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
