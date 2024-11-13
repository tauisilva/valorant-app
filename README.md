# Valorant App

Este é um aplicativo desenvolvido para analisar estatísticas de partidas no jogo Valorant. Ele usa dados extraídos da API da Tracker.gg, proporcionando uma visão detalhada sobre o desempenho dos agentes em diferentes mapas.

## Funcionalidades

- Exibe a taxa de vitória dos agentes por mapa.
- Mostra o melhor e o pior agente para cada mapa.
- Gera uma visão geral dos dados com o mapa de melhor desempenho e o agente mais eficiente.
- Permite exportar os dados de taxa de vitórias para um arquivo CSV.
- Exibe informações detalhadas sobre cada agente, como vitórias, partidas jogadas e taxa de vitória.

## Origem da Base de Dados

A base de dados utilizada neste aplicativo é proveniente da API da Tracker.gg. A Tracker.gg fornece informações detalhadas sobre o desempenho dos jogadores em vários jogos, incluindo Valorant. A API pode ser acessada diretamente em [Tracker.gg Valorant API](https://tracker.gg/valorant).

## Requisitos

- Node.js
- Angular 17+
- PrimeNG

## Instalação

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd <diretorio-do-projeto>
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   ng serve
   ```

5. Abra o navegador e acesse:
   ```
   http://localhost:4200
   ```

## Como Funciona

O aplicativo coleta dados sobre partidas jogadas de um jogador específico e analisa o desempenho de cada agente nos diferentes mapas. Através de cálculos de taxa de vitória e outras métricas, o aplicativo apresenta as informações de maneira visual e interativa.

## Funcionalidades Principais

- **Análise de Desempenho**: Cada mapa e agente tem suas estatísticas de vitórias e derrotas, sendo possível identificar o melhor e o pior agente em cada mapa.
- **Geração de Resumo**: Um resumo gerado automaticamente detalha o melhor mapa e agente, assim como a combinação mais eficiente.
- **Exportação de Dados**: O usuário pode exportar as estatísticas de vitórias de cada mapa e agente em um arquivo CSV para análise adicional.

## Tecnologias Utilizadas

- **Angular**: Framework front-end utilizado para desenvolver a interface do usuário.
- **PrimeNG**: Biblioteca de componentes de interface de usuário (UI) usada para tabelas, botões e outras funcionalidades.
- **API Tracker.gg**: A base de dados para informações sobre partidas e estatísticas de Valorant.

## Contribuições

Se você deseja contribuir com o projeto, sinta-se à vontade para fazer um fork e enviar um pull request. Se você encontrar algum problema ou tiver sugestões, abra uma issue no repositório.

### Sobre

Acessivel em: [Valorant-App](https://analise-dados-vava.netlify.app/)

![localhost_4200_](https://github.com/user-attachments/assets/96cb5fb1-9f19-4b37-828f-699e53beaa62)
