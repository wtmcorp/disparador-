import { useState, useEffect } from 'react'
import { ArrowLeft, Users, Send, Filter, Download, Trash2, MessageSquare, Mail, CheckCircle, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Lead {
  nome: string
  email: string
  telefone: string
  empresa: string
  regiao: string
  tipoSite: string
  dataCaptura: string
  status: 'novo' | 'contatado' | 'proposta' | 'convertido' | 'perdido'
}

export default function AdminPanel() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])
  const [filters, setFilters] = useState({
    regiao: '',
    tipoSite: '',
    status: ''
  })
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageConfig, setMessageConfig] = useState({
    tipo: 'whatsapp',
    mensagem: 'Olá {nome}! Obrigado pelo interesse na WTM Corps. Gostaríamos de conversar sobre seu projeto de {tipoSite}. Quando podemos agendar uma conversa?'
  })
  const [sendStatus, setSendStatus] = useState<{ success: boolean; message: string } | null>(null)

  useEffect(() => {
    loadLeads()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, leads])

  const loadLeads = () => {
    const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')
    setLeads(storedLeads)
    setFilteredLeads(storedLeads)
  }

  const applyFilters = () => {
    let filtered = [...leads]

    if (filters.regiao) {
      filtered = filtered.filter(lead =>
        lead.regiao.toLowerCase().includes(filters.regiao.toLowerCase())
      )
    }

    if (filters.tipoSite) {
      filtered = filtered.filter(lead => lead.tipoSite === filters.tipoSite)
    }

    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status)
    }

    setFilteredLeads(filtered)
  }

  const toggleLeadSelection = (index: number) => {
    setSelectedLeads(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const selectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(filteredLeads.map((_, idx) => idx))
    }
  }

  const updateLeadStatus = (index: number, status: Lead['status']) => {
    const updatedLeads = [...leads]
    const leadToUpdate = filteredLeads[index]
    const originalIndex = leads.findIndex(l =>
      l.email === leadToUpdate.email && l.dataCaptura === leadToUpdate.dataCaptura
    )

    if (originalIndex !== -1) {
      updatedLeads[originalIndex].status = status
      localStorage.setItem('leads', JSON.stringify(updatedLeads))
      setLeads(updatedLeads)
    }
  }

  const deleteLead = (index: number) => {
    if (confirm('Deseja realmente excluir este lead?')) {
      const leadToDelete = filteredLeads[index]
      const updatedLeads = leads.filter(l =>
        !(l.email === leadToDelete.email && l.dataCaptura === leadToDelete.dataCaptura)
      )
      localStorage.setItem('leads', JSON.stringify(updatedLeads))
      setLeads(updatedLeads)
      setSelectedLeads([])
    }
  }

  const exportLeads = () => {
    const leadsToExport = selectedLeads.length > 0
      ? selectedLeads.map(idx => filteredLeads[idx])
      : filteredLeads

    const csv = [
      ['Nome', 'Email', 'Telefone', 'Empresa', 'Região', 'Tipo de Site', 'Data', 'Status'],
      ...leadsToExport.map(lead => [
        lead.nome,
        lead.email,
        lead.telefone,
        lead.empresa,
        lead.regiao,
        lead.tipoSite,
        new Date(lead.dataCaptura).toLocaleDateString('pt-BR'),
        lead.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-wtm-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const sendMessages = () => {
    const leadsToContact = selectedLeads.length > 0
      ? selectedLeads.map(idx => filteredLeads[idx])
      : filteredLeads

    if (leadsToContact.length === 0) {
      setSendStatus({ success: false, message: 'Nenhum lead selecionado' })
      return
    }

    leadsToContact.forEach((lead, idx) => {
      const originalIndex = leads.findIndex(l =>
        l.email === lead.email && l.dataCaptura === lead.dataCaptura
      )

      const personalizedMessage = messageConfig.mensagem
        .replace('{nome}', lead.nome)
        .replace('{empresa}', lead.empresa)
        .replace('{tipoSite}', lead.tipoSite === 'landing-page' ? 'Landing Page' :
          lead.tipoSite === 'site-completo' ? 'Site Completo' : lead.tipoSite)

      if (messageConfig.tipo === 'whatsapp') {
        const phone = lead.telefone.replace(/\D/g, '')
        const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(personalizedMessage)}`

        // Add random delay between 5 and 15 seconds to avoid ban
        const randomDelay = Math.floor(Math.random() * 10000) + 5000
        const delay = idx === 0 ? 0 : (idx * 10000) + randomDelay

        setTimeout(() => {
          window.open(whatsappUrl, '_blank')
        }, delay)
      } else if (messageConfig.tipo === 'email') {
        const emailUrl = `mailto:${lead.email}?subject=Proposta WTM Corps - ${lead.tipoSite}&body=${encodeURIComponent(personalizedMessage)}`

        setTimeout(() => {
          window.open(emailUrl, '_blank')
        }, idx * 2000) // 2 seconds for email
      }

      if (originalIndex !== -1) {
        const updatedLeads = [...leads]
        updatedLeads[originalIndex].status = 'contatado'
        localStorage.setItem('leads', JSON.stringify(updatedLeads))
        setLeads(updatedLeads)
      }
    })

    setSendStatus({
      success: true,
      message: `${leadsToContact.length} mensagem(ns) ${messageConfig.tipo === 'whatsapp' ? 'do WhatsApp' : 'de email'} aberta(s) em novas abas!`
    })

    setTimeout(() => {
      setShowMessageModal(false)
      setSendStatus(null)
      setSelectedLeads([])
    }, 3000)
  }

  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      'novo': 'bg-blue-600',
      'contatado': 'bg-yellow-600',
      'proposta': 'bg-purple-600',
      'convertido': 'bg-green-600',
      'perdido': 'bg-red-600'
    }
    return colors[status] || 'bg-gray-600'
  }



  const getUniqueRegioes = () => {
    return [...new Set(leads.map(lead => lead.regiao))].sort()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Site
            </button>
          </div>
          <h1 className="text-2xl font-bold text-white">Painel de Vendas</h1>
          <div className="w-32"></div>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Total de Leads</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white">{leads.length}</div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Novos</span>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            </div>
            <div className="text-3xl font-bold text-white">
              {leads.filter(l => l.status === 'novo').length}
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Contatados</span>
              <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
            </div>
            <div className="text-3xl font-bold text-white">
              {leads.filter(l => l.status === 'contatado').length}
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Convertidos</span>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white">
              {leads.filter(l => l.status === 'convertido').length}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-white mb-2 font-semibold text-sm">
                <Filter className="w-4 h-4 inline mr-1" />
                Filtrar por Região
              </label>
              <select
                value={filters.regiao}
                onChange={(e) => setFilters({ ...filters, regiao: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Todas as regiões</option>
                {getUniqueRegioes().map(regiao => (
                  <option key={regiao} value={regiao}>{regiao}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-white mb-2 font-semibold text-sm">Tipo de Site</label>
              <select
                value={filters.tipoSite}
                onChange={(e) => setFilters({ ...filters, tipoSite: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Todos os tipos</option>
                <option value="landing-page">Landing Page</option>
                <option value="site-completo">Site Completo</option>
                <option value="nao-sei">Não sei ainda</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-white mb-2 font-semibold text-sm">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Todos os status</option>
                <option value="novo">Novo</option>
                <option value="contatado">Contatado</option>
                <option value="proposta">Proposta</option>
                <option value="convertido">Convertido</option>
                <option value="perdido">Perdido</option>
              </select>
            </div>

            <button
              onClick={() => setFilters({ regiao: '', tipoSite: '', status: '' })}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              Leads ({filteredLeads.length})
              {selectedLeads.length > 0 && ` - ${selectedLeads.length} selecionado(s)`}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
              >
                {selectedLeads.length === filteredLeads.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
              </button>
              <button
                onClick={exportLeads}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
              <button
                onClick={() => setShowMessageModal(true)}
                disabled={selectedLeads.length === 0 && filteredLeads.length === 0}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Disparar Mensagens
              </button>
            </div>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Nenhum lead encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                      <input
                        type="checkbox"
                        checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                        onChange={selectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Nome</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Contato</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Empresa</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Região</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Tipo</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Data</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, idx) => (
                    <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(idx)}
                          onChange={() => toggleLeadSelection(idx)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="py-3 px-4 text-white font-medium">{lead.nome}</td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div className="text-slate-300">{lead.telefone}</div>
                          <div className="text-slate-400">{lead.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{lead.empresa}</td>
                      <td className="py-3 px-4 text-slate-300">{lead.regiao}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                          {lead.tipoSite === 'landing-page' ? 'Landing Page' :
                            lead.tipoSite === 'site-completo' ? 'Site Completo' : lead.tipoSite}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-sm">
                        {new Date(lead.dataCaptura).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(idx, e.target.value as Lead['status'])}
                          className={`text-xs px-2 py-1 rounded text-white ${getStatusColor(lead.status)} focus:outline-none`}
                        >
                          <option value="novo">Novo</option>
                          <option value="contatado">Contatado</option>
                          <option value="proposta">Proposta</option>
                          <option value="convertido">Convertido</option>
                          <option value="perdido">Perdido</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <a
                            href={`https://wa.me/55${lead.telefone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-green-600 hover:bg-green-700 rounded text-white transition-colors"
                            title="WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors"
                            title="Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => deleteLead(idx)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Disparar Mensagens em Massa</h2>

            {sendStatus && (
              <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${sendStatus.success
                  ? 'bg-green-600/20 border border-green-600 text-green-400'
                  : 'bg-red-600/20 border border-red-600 text-red-400'
                }`}>
                {sendStatus.success ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {sendStatus.message}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-white mb-2 font-semibold">Canal de Envio</label>
              <select
                value={messageConfig.tipo}
                onChange={(e) => setMessageConfig({ ...messageConfig, tipo: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2 font-semibold">Mensagem</label>
              <textarea
                value={messageConfig.mensagem}
                onChange={(e) => setMessageConfig({ ...messageConfig, mensagem: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Digite sua mensagem..."
              />
              <p className="text-slate-400 text-sm mt-2">
                Variáveis disponíveis: {'{nome}'}, {'{empresa}'}, {'{tipoSite}'}
              </p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg mb-6">
              <p className="text-slate-300 text-sm mb-2">
                <strong>Leads selecionados:</strong> {selectedLeads.length > 0 ? selectedLeads.length : filteredLeads.length}
              </p>
              <p className="text-slate-400 text-xs">
                {messageConfig.tipo === 'whatsapp'
                  ? 'Será aberta uma nova aba do WhatsApp para cada lead (intervalo aleatório de 5 a 15 segundos para segurança)'
                  : 'Será aberto seu cliente de email com os destinatários preenchidos'}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowMessageModal(false)
                  setSendStatus(null)
                }}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={sendMessages}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar Mensagens
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
