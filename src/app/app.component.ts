import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { dados } from './dados';
import { ValorantService } from './valorant.service';

type Agent = {
  winRate: string;
  agentName: string,
  agentImg: string,
  wins: number,
  matchCount: number
}
type MapData = {
  mapName: string;
  mapImg: string;
  agents: Agent[],
  totalMatches: number,
  bestAgent: Agent,
  worstAgent: Agent,
  winRate: string
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  viewProviders: [ValorantService],
  imports: [NgFor, NgIf, TableModule, TooltipModule],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Valorant App';
  matchDetails: any[] = []
  winRatesByMapAndAgent: any = {};

  constructor(private valorantService: ValorantService) { }

  ngOnInit(): void {
    this.matchDetails = this.valorantService.filterData(dados);
    this.calculateWinRates();
  }


  calculateWinRates(): void {
    const winRates: any = {};

    this.matchDetails.forEach((match) => {
      const map = match.mapName;
      const agent = match.agentName;
      const result = match.result;
      const mapImg = match.mapImageUrl;
      const agentImg = match.agentImageUrl;

      if (!winRates[map]) {
        winRates[map] = {
          mapName: map,
          mapImg: mapImg,
          totalMatches: 0,
          agents: [],
          bestAgent: null,
          worstAgent: null,
          winRate: "0%"
        };
      }

      winRates[map].totalMatches++;

      let agentData = winRates[map].agents.find((a: any) => a.agentName === agent);
      if (!agentData) {
        agentData = {
          agentName: agent,
          agentImg: agentImg,
          wins: 0,
          matchCount: 0,
        };
        winRates[map].agents.push(agentData);
      }

      agentData.matchCount++;
      if (result === 'victory') {
        agentData.wins++;
      }
    });

    for (const map in winRates) {
      let highestWinRate = 0;
      let lowestWinRate = 1;
      let bestAgent = null;
      let worstAgent = null;
      let totalWins = 0;

      winRates[map].agents.sort((a: any, b: any) => {
        const aWinRate = a.wins / a.matchCount;
        const bWinRate = b.wins / b.matchCount;
        return bWinRate - aWinRate; 
      });

      winRates[map].agents.forEach((agent: any) => {
        agent.winRate = ((agent.wins / agent.matchCount) * 100).toFixed(2) + '%';
        totalWins += agent.wins;

        const agentWinRate = agent.wins / agent.matchCount;
        if (agentWinRate > highestWinRate) {
          highestWinRate = agentWinRate;
          bestAgent = agent;
        }

        if (agentWinRate < lowestWinRate) {
          lowestWinRate = agentWinRate;
          worstAgent = agent;
        }
      });

      winRates[map].bestAgent = bestAgent;
      winRates[map].worstAgent = worstAgent;
      winRates[map].winRate = ((totalWins / winRates[map].totalMatches) * 100).toFixed(2) + '%';
    }

    this.winRatesByMapAndAgent = winRates
  }


  get winRatesArray() {
    let result: MapData[] = [];
    Object.keys(this.winRatesByMapAndAgent).forEach((key) => {
      const item = this.winRatesByMapAndAgent[key];
      result.push(item as MapData);
    });
    return result.sort((a, b) => {
      const aWinRate = parseFloat(a.winRate.replace('%', ''));
      const bWinRate = parseFloat(b.winRate.replace('%', ''));
      return bWinRate - aWinRate;
    }) ?? [];
  }


  generateSummary(): string {
    let bestMapName = '';
    let bestMapWinRate = 0;
    let bestAgentName = '';
    let worstAgentName = '';
    let bestAgentWinRate = 0;
    let summary = '';


    for (const map in this.winRatesByMapAndAgent) {
      const mapData = this.winRatesByMapAndAgent[map];
      const mapWinRate = parseFloat(mapData.winRate.replace('%', ''));


      if (mapWinRate > bestMapWinRate) {
        bestMapWinRate = mapWinRate;
        bestMapName = mapData.mapName;
      }

      let localWorstAgent!: Agent;
      let localWorstAgentWinRate = 100;

      mapData.agents.forEach((agent: Agent) => {
        const agentWinRate = (agent.wins / agent.matchCount) * 100;

        if (agentWinRate > bestAgentWinRate) {
          bestAgentWinRate = agentWinRate;
          bestAgentName = agent.agentName;
        }

        if (agentWinRate < localWorstAgentWinRate) {
          localWorstAgentWinRate = agentWinRate;
          localWorstAgent = agent;
        }
      });

      if (localWorstAgent) {
        worstAgentName = localWorstAgent.agentName;
      }
    }

    summary = `Com base nos dados, o seu melhor mapa é "${bestMapName}", acompanhado do agente "${bestAgentName}", formando assim a combinação mais eficiente. Por outro lado, o agente com o pior desempenho neste mapa é "${worstAgentName}".`;

    return summary;
  }


  exportToCSV(): void {
    const header = ['Mapa', 'Agentes', 'Melhor Agente', 'Pior Agente', 'Taxa de Vitória', 'Total de Partidas'];
    const rows: string[] = [];

    rows.push(header.join(','));

    this.winRatesArray.forEach((mapData) => {
      const agentsNames = mapData.agents.map(agent => agent.agentName).join('/');
      const bestAgentName = mapData.bestAgent ? `${mapData.bestAgent.agentName} - ${mapData.bestAgent.wins}/${mapData.bestAgent.matchCount} - ${mapData.bestAgent.winRate}` : '-';
      const worstAgentName = mapData.worstAgent ? `${mapData.worstAgent.agentName} - ${mapData.worstAgent.wins}/${mapData.worstAgent.matchCount} - ${mapData.worstAgent.winRate}` : '-';

      const row = [
        mapData.mapName,
        agentsNames,
        bestAgentName,
        worstAgentName,
        mapData.winRate,
        mapData.totalMatches.toString()
      ];

      rows.push(row.join(','));
    });

    const csvContent = rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'winRates.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
