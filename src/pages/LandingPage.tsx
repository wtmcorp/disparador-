import { useState } from 'react'
import { Globe, Rocket, Zap, BarChart3, MessageCircle, CheckCircle, Star, ArrowRight, Code, Smartphone, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    regiao: '',
    tipoSite: 'landing-page'
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const lead = {
      ...formData,
      dataCaptura: new Date().toISOString(),
      status: 'novo'
    }

    const leads = JSON.parse(localStorage.getItem('leads') || '[]')
    leads.push(lead)
    localStorage.setItem('leads', JSON.stringify(leads))

    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        regiao: '',
        tipoSite: 'landing-page'
      })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-700">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">WTM Corps</span>
          </div>
          <a
            href="#contato"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Solicitar Orçamento
          </a>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
              Sites Profissionais que <span className="text-blue-400">Convertem Visitantes em Clientes</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Desenvolvemos landing pages e sites completos para empreendedores e microempresas que querem crescer online. Design moderno, responsivo e otimizado para vendas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contato"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                Começar Agora <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#portfolio"
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Ver Portfólio
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">+150 Projetos</h3>
              <p className="text-slate-400">Sites entregues com sucesso</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">4.9/5 Avaliação</h3>
              <p className="text-slate-400">Clientes satisfeitos</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4">
                <Rocket className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">7 Dias Entrega</h3>
              <p className="text-slate-400">Tempo médio de desenvolvimento</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Nossos Serviços</h2>
          <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            Soluções completas para sua presença digital
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <Zap className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Landing Pages</h3>
              <p className="text-slate-300 mb-4">
                Páginas otimizadas para conversão, perfeitas para capturar leads e divulgar produtos/serviços.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  Design responsivo
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  Formulários de captura
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  Integração WhatsApp
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  SEO otimizado
                </li>
              </ul>
              <div className="mt-6 text-3xl font-bold text-white">
                A partir de <span className="text-blue-400">R$ 297</span>
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl border border-blue-500 relative">
              <div className="absolute -top-3 right-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Mais Popular
              </div>
              <Code className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Sites Completos</h3>
              <p className="text-slate-300 mb-4">
                Sistemas web completos como nosso exemplo de finanças, com múltiplas páginas e funcionalidades.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  Múltiplas páginas
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  Painel administrativo
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  Banco de dados
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  Sistema de login
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  Funcionalidades customizadas
                </li>
              </ul>
              <div className="mt-6 text-3xl font-bold text-white">
                A partir de <span className="text-blue-400">R$ 997</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Portfólio em Destaque</h2>
          <p className="text-slate-300 text-center mb-12">
            Confira um exemplo do nosso trabalho
          </p>

          <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
            <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Smartphone className="w-24 h-24 text-white/30" />
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">WTM Finanças</h3>
              <p className="text-slate-300 mb-4">
                Sistema completo de controle financeiro pessoal com IA integrada. Interface moderna, responsiva e intuitiva.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">React</span>
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">TypeScript</span>
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">IA</span>
              </div>
              <a
                href="https://wtm-financas.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Ver Projeto <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Por Que Escolher a WTM Corps?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
                <BarChart3 className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Foco em Resultados</h3>
              <p className="text-slate-300">
                Nossos sites são desenvolvidos pensando em conversão e crescimento do seu negócio.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
                <MessageCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Suporte Dedicado</h3>
              <p className="text-slate-300">
                Atendimento rápido e personalizado durante todo o projeto e pós-entrega.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
                <Rocket className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Entrega Rápida</h3>
              <p className="text-slate-300">
                Projetos entregues em até 7 dias, sem comprometer a qualidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="py-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h2 className="text-3xl font-bold text-white text-center mb-2">Solicite seu Orçamento</h2>
            <p className="text-slate-300 text-center mb-8">
              Preencha o formulário e entraremos em contato em até 24 horas
            </p>

            {submitted && (
              <div className="bg-green-600/20 border border-green-600 text-green-400 p-4 rounded-lg mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Recebemos sua solicitação! Entraremos em contato em breve.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2 font-semibold">Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">WhatsApp</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">Empresa</label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Nome da sua empresa"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">Região</label>
                <input
                  type="text"
                  name="regiao"
                  value={formData.regiao}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Cidade/Estado"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">Tipo de Site</label>
                <select
                  name="tipoSite"
                  value={formData.tipoSite}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="landing-page">Landing Page</option>
                  <option value="site-completo">Site Completo</option>
                  <option value="nao-sei">Não sei ainda</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                Solicitar Orçamento <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-slate-400 text-sm text-center">
                Sem compromisso. Orçamento 100% gratuito.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">WTM Corps</span>
            </div>
            <p className="text-slate-400 text-center md:text-right">
              © 2026 WTM Corps. Transformando ideias em sites de sucesso.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
