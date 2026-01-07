# Sistema de Disparo de Vendas - WTM Corps

Sistema completo de vendas e disparo automático de mensagens para divulgar serviços de desenvolvimento web.

## Funcionalidades

### Landing Page de Vendas
- Design moderno e responsivo
- Portfólio em destaque (WTM Finanças)
- Formulário de captura de leads
- Seções: Serviços, Portfólio, Diferenciais
- Integração automática com sistema de leads

### Painel Administrativo
- Gerenciamento completo de leads
- Dashboard com métricas (total, novos, contatados, convertidos)
- Filtros avançados por região, tipo de site e status
- Sistema de disparo automático de mensagens
- Integração com WhatsApp e Email
- Exportação de leads em CSV
- Atualização de status dos leads

### Sistema de Disparo
- Mensagens personalizadas com variáveis
- Envio em massa via WhatsApp (abre abas automaticamente)
- Envio em massa via Email
- Seleção individual ou em massa de leads
- Templates customizáveis

## Como Usar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:5173

### Build para Produção
```bash
npm run build
npm run preview
```

## Rotas

- `/` - Landing Page pública de vendas
- `/admin` - Painel administrativo (gerenciar leads e disparar mensagens)

## Tecnologias

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide Icons
- LocalStorage para persistência de dados

## Fluxo de Uso

1. **Captura de Leads**: Cliente preenche formulário na landing page
2. **Armazenamento**: Lead é salvo automaticamente no localStorage
3. **Gestão**: Acesse `/admin` para visualizar e gerenciar leads
4. **Filtros**: Filtre leads por região, tipo de site ou status
5. **Disparo**: Selecione leads e dispare mensagens personalizadas
6. **Acompanhamento**: Atualize status conforme pipeline de vendas

## Recursos do Admin

### Dashboard
- Total de leads capturados
- Quantidade de novos leads
- Leads já contatados
- Conversões realizadas

### Filtros
- Por região/cidade
- Por tipo de site (Landing Page, Site Completo)
- Por status do lead

### Ações em Massa
- Selecionar todos os leads filtrados
- Disparar mensagens para múltiplos leads
- Exportar dados em CSV

### Personalização de Mensagens
Variáveis disponíveis:
- `{nome}` - Nome do lead
- `{empresa}` - Nome da empresa
- `{tipoSite}` - Tipo de site solicitado

## Exemplo de Mensagem

```
Olá {nome}! Obrigado pelo interesse na WTM Corps. 
Gostaríamos de conversar sobre seu projeto de {tipoSite}. 
Quando podemos agendar uma conversa?
```

## Deploy

O projeto está pronto para deploy em:
- Vercel
- Netlify
- GitHub Pages
- Qualquer hospedagem que suporte SPA React

## Observações

- Os dados são armazenados localmente no navegador (localStorage)
- Para produção, recomenda-se implementar backend com banco de dados
- O sistema de disparo abre abas do WhatsApp/Email - certifique-se de permitir pop-ups
- Intervalo de 1 segundo entre disparos para evitar bloqueios
