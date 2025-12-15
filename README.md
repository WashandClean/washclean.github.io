# Wash&Clean – Website

Este repositório contém o código de um site profissional para a empresa **Wash&Clean**, especializada em serviços de limpeza automóvel. O objetivo foi criar uma página moderna, responsiva e pronta para ser publicada no GitHub Pages.

## Estrutura

```
washandclean_site/
├── index.html        # Página principal com todas as secções (hero, serviços, benefícios, marcação e contactos)
├── styles.css        # Estilos separadas para facilitar a manutenção
├── script.js         # Lógica de validação de marcações e integração com EmailJS
├── assets/
│   └── logo.png      # Logótipo fornecido pelo cliente
└── README.md         # Este documento
```

### index.html

A página principal está dividida em várias secções:

- **Hero**: Introdução com logótipo e chamada à ação (CTA) para marcação.
- **Serviços**: Três cartões com os principais serviços (Lavagem Exterior, Lavagem Interior e Detalhamento).
- **Benefícios**: Lista de vantagens de escolher a Wash&Clean.
- **Marcação**: Formulário para reservar um serviço, com campos de nome, e‑mail, serviço, data, hora e mensagem.
- **Contactos**: Informações de contacto e horário de funcionamento.
- **Footer**: Rodapé com direitos reservados.

### styles.css

Define um design moderno e responsivo com base em tons de azul e branco. Utiliza **flexbox** para a disposição dos cartões de serviço e inclui regras de `@media` para ecrãs pequenos.

### script.js

Implementa a lógica do formulário de marcação:

- **Validação de horários** conforme regras especificadas:
  - Segunda a Sexta: 17h30–21h30.
  - Sábado e Domingo: 10h00–19h00.
- Verificação de disponibilidade, guardando marcações no `localStorage` para simular uma agenda.
- Sugestão automática do próximo horário livre quando o escolhido já estiver reservado.
- Integração com EmailJS através de placeholders (`EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`). Ao configurar estes valores e criar um template no EmailJS, é possível enviar um e‑mail de confirmação tanto para o cliente como para a empresa.

### Configurar EmailJS

1. Crie uma conta em [EmailJS](https://www.emailjs.com) e inicie sessão.
2. Crie um **Service** (por exemplo, Gmail, Outlook ou outro).
3. Crie um **Template** com as variáveis necessárias (`name`, `email`, `service`, `date`, `time`, `message`).
4. Obtenha o **Public Key**, **Service ID** e **Template ID** no painel da EmailJS.
5. Edite o ficheiro `script.js` e substitua as variáveis `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID` e `EMAILJS_TEMPLATE_ID` pelos valores fornecidos.
6. Publique o site. Quando um utilizador preencher o formulário, um e‑mail será enviado automaticamente.

### Publicar no GitHub Pages

1. Crie um repositório chamado `washandclean.github.io` na conta/organização do GitHub.
2. Faça upload de todos os ficheiros desta pasta (`index.html`, `styles.css`, `script.js`, `assets/logo.png` e `README.md`).
3. No repositório, vá a **Settings** → **Pages**.
4. Em **Source**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`. Salve.
5. Dentro de alguns minutos, o site ficará disponível em `https://washandclean.github.io/`.

### Alterar a logo

Para substituir a logo pelo seu próprio ficheiro:

1. Substitua o ficheiro `assets/logo.png` pela nova imagem (com o mesmo nome).
2. Se preferir outro nome, atualize também o caminho no `<img src="assets/logo.png">` no `index.html`.

---

Este site foi criado para servir de modelo e ponto de partida. Sinta‑se à vontade para personalizar o conteúdo, serviços e design conforme as necessidades da Wash&Clean.
