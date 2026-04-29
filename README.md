# Machine Fleet Tracker 🚖

Um Dashboard interativo de Gerenciamento de Frotas desenvolvido como projeto prático para a vaga de **Desenvolvedor Frontend na Gaudium**.

Este projeto simula o núcleo do sistema *Machine*, exibindo a geolocalização de motoristas, atualizações de status em tempo real e um motor de busca de alta performance focado na Experiência do Usuário (UX).

## 🚀 Funcionalidades e Diferenciais de UX

- **Simulação de Tempo Real (Real-Time Engine):** Um motor construído com `setInterval` que atualiza a posição (lat/lng) e o status dos motoristas a cada 3 segundos, garantindo que o recrutador veja a aplicação "viva" sem depender de APIs externas instáveis.
- **Rastreamento de Câmera Inteligente (Camera Tracking):** Ao clicar em "Localizar", o mapa utiliza o método `flyTo` do Leaflet para um zoom cinematográfico e passa a perseguir o motorista (`panTo`) em seus movimentos.
- **UX Avançada (Cancelamento de Rastreio):** O sistema escuta o evento `dragstart` do mapa. Se o usuário arrastar a câmera manualmente, o rastreamento é desativado para devolver o controle ao usuário.
- **Filtro Duplo Instantâneo:** Filtragem simultânea por status (Disponível, Em Corrida, Offline) e busca textual por nome, renderizada no DOM sem atrasos.
- **Empty States:** Feedback visual amigável quando uma busca não retorna resultados.

## 🛠️ Stack Tecnológica

Optei por não utilizar frameworks pesados (como React ou Vue) para demonstrar domínio absoluto dos fundamentos da web e preocupação com a performance de carregamento:

- **HTML5 Semântico**
- **JavaScript Vanilla (ES6+):** Manipulação de DOM, Assincronismo (`fetch`, `async/await`), e gerenciamento de estado customizado (`state object`).
- **SCSS (Sass):** Estilização modularizada. Utilização do padrão moderno `@use` com separação de responsabilidades (`_variables.scss`, `_components.scss`) e metodologia **BEM** para escalabilidade das classes.
- **Leaflet.js:** Biblioteca open-source leve para renderização do mapa interativo.

## 📂 Estrutura de Arquivos

A arquitetura do projeto foi pensada para ser escalável e de fácil manutenção:

```text
/
├── index.html
├── data/
│   └── drivers.json         # API Simulada / Fallback
    ├── scss/└── assets/

    │   ├── main.scss        # Root stylesheet
    │   ├── _variables.scss  # Design System (Tokens)
    │   └── _components.scss # Padrão BEM (Ex: .driver-card)
    ├── css/
    │   └── main.css         # CSS Compilado gerado pelo Sass
    └── js/
        └── main.js          # Lógica, Estado e Mapa
```

## 🔧 Como executar localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/machine-fleet-tracker.git](https://github.com/mydevslab/gaudium-fleet-tracker.git)
   ```

2. Para rodar a aplicação: Basta abrir o arquivo `index.html` em qualquer navegador moderno. O sistema possui um fallback embutido no JavaScript que garante o funcionamento mesmo se a política de CORS do navegador bloquear o fetch local do JSON.

3. Para editar os estilos (SCSS):

Certifique-se de ter o Sass instalado (npm install -g sass).

Rode o comando de compilação em modo watch:
```bash
sass --watch assets/scss/main.scss assets/css/main.css
```

---
Desenvolvido com foco em escalabilidade e performance para a **Gaudium**. Feedbacks são super bem-vindos! 🚀
