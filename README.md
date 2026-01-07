# Sistema de Disparo de Vendas - WTM Corps

Sistema completo de vendas e disparo automático de mensagens para divulgar serviços de desenvolvimento web da WTM Corps.

## 🚀 Funcionalidades

### Landing Page Profissional
- Design moderno e responsivo
- Portfólio em destaque (WTM Finanças)
- Formulário de captura de leads
- Integração automática com sistema de gestão

### Painel Administrativo Completo
- Dashboard com métricas em tempo real
- Gerenciamento de leads
- Filtros avançados (região, tipo, status)
- Sistema de disparo automático via WhatsApp/Email
- Exportação de leads em CSV
- Pipeline de vendas com status personalizados

### Sistema de Disparo Inteligente
- Mensagens personalizadas com variáveis
- Envio em massa via WhatsApp
- Envio em massa via Email
- Seleção individual ou em massa
- Templates customizáveis

## 🛠️ Tecnologias

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide Icons

## 📦 Instalação

```bash
npm install
```

## 🔧 Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 📍 Rotas

- `/` - Landing Page pública
- `/admin` - Painel administrativo

## 🌐 Deploy

### Vercel (Recomendado)

1. Instale o Vercel CLI:
```bash
npm i -g vercel
```

2. Faça deploy:
```bash
vercel
```

Ou conecte seu repositório GitHub diretamente no painel da Vercel.

### Netlify

1. Build:
```bash
npm run build
```

2. Faça deploy da pasta `dist`

## 📊 Como Usar

1. **Captura de Leads**: Clientes preenchem o formulário na landing page
2. **Gestão**: Acesse `/admin` para visualizar todos os leads
3. **Filtros**: Filtre por região, tipo de site ou status
4. **Disparo**: Selecione leads e envie mensagens personalizadas
5. **Acompanhamento**: Atualize o status conforme o pipeline de vendas

## 🎯 Pipeline de Vendas

- **Novo**: Lead recém capturado
- **Contatado**: Primeiro contato realizado
- **Proposta**: Proposta enviada
- **Convertido**: Venda fechada
- **Perdido**: Oportunidade perdida

## 📝 Variáveis de Mensagem

- `{nome}` - Nome do lead
- `{empresa}` - Nome da empresa
- `{tipoSite}` - Tipo de site solicitado

## 📄 Licença

Desenvolvido por WTM Corps © 2026
