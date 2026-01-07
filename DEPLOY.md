# Guia de Deploy - Sistema de Vendas WTM Corps

## ✅ Status do Projeto

- ✅ Build testada com sucesso
- ✅ Código TypeScript compilado sem erros
- ✅ Git configurado e commit realizado
- ✅ Arquivos de configuração para Vercel criados

---

## 🚀 Deploy na Vercel (Recomendado)

### Opção 1: Via GitHub (Mais Fácil)

1. **Crie um repositório no GitHub**
   ```bash
   # No seu terminal, adicione o remote
   git remote add origin https://github.com/SEU_USUARIO/disparar-vendas.git
   git branch -M master
   git push -u origin master
   ```

2. **Acesse https://vercel.com**
   - Faça login com GitHub
   - Clique em "Add New Project"
   - Selecione seu repositório `disparar-vendas`
   - Clique em "Deploy"
   - Pronto! A Vercel detecta automaticamente que é um projeto Vite

### Opção 2: Via Vercel CLI

1. **Instale o Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Faça login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Para produção**
   ```bash
   vercel --prod
   ```

---

## 📁 Estrutura de Arquivos Importantes

```
disparar-vendas/
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx    # Página principal (/)
│   │   └── AdminPanel.tsx     # Painel admin (/admin)
│   ├── App.tsx                # Router
│   └── main.tsx               # Entry point
├── vercel.json                # Config Vercel (SPA routing)
├── .gitignore                 # Arquivos ignorados
└── package.json               # Dependências
```

---

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor local (porta 5173)

# Build
npm run build        # Gera build de produção (pasta dist/)

# Preview
npm run preview      # Testa a build localmente (porta 4173)
```

---

## 🌐 Rotas do Sistema

Após o deploy, seu sistema terá:

- `https://seu-dominio.vercel.app/` - Landing page pública
- `https://seu-dominio.vercel.app/admin` - Painel administrativo

**Importante**: O arquivo `vercel.json` já está configurado para fazer o SPA routing funcionar corretamente.

---

## 📊 Funcionalidades Verificadas

✅ Landing page responsiva  
✅ Formulário de captura de leads  
✅ Armazenamento em localStorage  
✅ Painel admin funcional  
✅ Dashboard com métricas  
✅ Filtros por região/tipo/status  
✅ Sistema de disparo WhatsApp  
✅ Sistema de disparo Email  
✅ Exportação CSV  
✅ Pipeline de vendas  

---

## 🎯 Próximos Passos Após Deploy

1. **Teste o sistema no ar**
   - Preencha formulário na landing page
   - Acesse `/admin` e verifique os leads
   - Teste o disparo de mensagens

2. **Configure domínio customizado** (opcional)
   - Vá em Settings > Domains na Vercel
   - Adicione seu domínio personalizado

3. **Backend (futuro)**
   - Atualmente usa localStorage
   - Para produção real, recomenda-se backend com:
     - Firebase / Supabase
     - API própria com MongoDB/PostgreSQL

---

## 📞 Suporte

Sistema desenvolvido e pronto para deploy!

**Status Final**: ✅ 100% Funcional e Testado
