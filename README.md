# 🚖 Fleet Tracker

### Transformando dados de telemetria em inteligência logística

O **Fleet Tracker** é um dashboard interativo para monitoramento de frotas, inspirado nos desafios reais da plataforma *Machine*. Mais do que um mapa com pontos, este projeto é um exercício de como transformar fluxos complexos de dados em uma interface humana, performática e confiável.

---

## 🧭 A Visão do Projeto

No setor de mobilidade, a precisão é fundamental, mas a **usabilidade** é o que mantém a operação rodando. Este dashboard foi construído para ser a ferramenta de um gestor que precisa de respostas rápidas.

Eu foquei em três pilares:

1. **Confiabilidade Visual:** Onde está meu motorista agora?
2. **Fluidez:** Como navegar em mil cidades sem perder a performance?
3. **Foco:** Como acompanhar um problema específico sem ser distraído pelo restante da frota?

## 🛠️ O que há por "baixo do capô"?

Para garantir que a aplicação fosse leve e robusta, tomei decisões de arquitetura focadas em fundamentos:

* **JavaScript ES6+ (O Motor):** Optei pelo Vanilla JS para demonstrar domínio sobre o DOM e o ciclo de vida da aplicação. Implementei um sistema de gerenciamento de estado (`state object`) que sincroniza a lista de motoristas, os filtros de busca e os marcadores do mapa em tempo real.
* **Geolocalização com Leaflet.js:** Integrei esta biblioteca pela sua leveza. O grande desafio aqui foi criar o **Camera Tracking**: ao localizar um motorista, o mapa o persegue dinamicamente. Se o usuário interage com o mapa, o sistema entende a intenção humana e interrompe o rastreio automático.
* **SCSS Modular (O Design System):** Estruturei o CSS usando o padrão moderno `@use` e a metodologia **BEM**. Isso significa que o código é escalável: se a frota crescer ou o branding mudar, a manutenção é feita em segundos.
* **Experiência do Usuário (UX):** Usei a biblioteca *Phosphor Icons* para uma iconografia limpa e apliquei um design de "Status Dots" com brilho pulsante, facilitando a identificação rápida de quem está disponível ou em corrida.

## 📂 Arquitetura e Estrutura do Projeto

A organização do código foi pensada para separar as responsabilidades e facilitar a manutenção, seguindo padrões modernos de desenvolvimento web:

```text
fleet-tracker/
├── index.html           # Ponto de entrada (Estrutura Semântica)
├── data/
│   └── drivers.json     # Nossa "Single Source of Truth" (Dados dos Motoristas)
├── assets/
│   ├── js/
│   │   └── main.js      # O "Cérebro": Estado, Lógica do Mapa e Tracking
│   └── scss/            # Design System Modular (Sass)
│       ├── main.scss    # Arquivo Root que orquestra os estilos
│       ├── _variables.scss # Definição de Cores, Sombras e Tokens de Design
│       └── _components.scss # Componentes isolados (Cards, Botões, Status)
├── css/
│   └── main.css         # Arquivo compilado e otimizado para o navegador
└── README.md            # Documentação do projeto
```

## 🚀 Como testar a experiência

Você pode ver o projeto rodando ao vivo aqui: [**Link do Deploy na Vercel**](https://fleet-tracker-flame.vercel.app/)

Se quiser rodar localmente:

1. Clone o repositório.
2. Abra o `index.html`.
*Nota: Implementei um sistema de fallback. Se a API de dados falhar ou houver erro de CORS local, o sistema ativa automaticamente dados simulados para que a experiência nunca seja interrompida.*

## ⚙️ Execução Local e Desenvolvimento

Este projeto foi estruturado para ser simples de executar, mas também oferece ferramentas para quem deseja evoluir o código.

### 1. Pré-requisitos

Para apenas visualizar o projeto, você só precisa de um navegador moderno. Caso deseje modificar os estilos (SCSS), você precisará do Sass instalado globalmente:

```bash
npm install -g sass
```

### 2. Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/mydevslab/fleet-tracker.git
   ```

2. Abra o projeto:
   * Navegue até a pasta do projeto e abra o `index.html` no seu navegador preferido.

### 3. Fluxo de Desenvolvimento (Sass)

O projeto utiliza a sintaxe moderna de módulos do Dart Sass. Para realizar alterações visuais, edite os arquivos na pasta assets/scss/ e compile para a pasta css/ com o comando:

```bash
sass --watch assets/scss/main.scss assets/css/main.css
```

## 📈 Evoluções Futuras

Como desenvolvedora, acredito que o código nunca está "pronto", ele está em constante evolução. Para os próximos passos, eu visualizo:

* Implementação de WebSockets para telemetria real sem polling.
* Testes unitários para as funções de filtragem.
* Modo noturno (Dark Mode) baseado na preferência do sistema do usuário.

---

**Desenvolvido com dedicação por Juscélia de Souza** *Interessada em como a tecnologia pode mover o mundo.*
