import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValorantService {
  private apiUrl = 'https://api.tracker.gg/api/v2/valorant/standard/matches/riot/Taui%20Lima%231902?type=competitive&season=&agent=all&map=all';

  filterData(data: any) {
    return data.map((match: any) => {
      const attributes = match.attributes || {};
      const metadata = match.metadata || {};
      const overviewSegment = match.segments.find((segment: any) => segment.type === 'overview') || {};
      const stats = overviewSegment.stats || {};

      return {
        id: attributes.id,
        mapId: attributes.mapId,
        modeId: attributes.modeId,
        seasonId: attributes.seasonId,
        modeKey: metadata.modeKey,
        modeName: metadata.modeName,
        modeImageUrl: metadata.modeImageUrl,
        timestamp: metadata.timestamp,
        result: metadata.result,
        mapName: metadata.mapName,
        mapImageUrl: metadata.mapImageUrl,
        agentName: overviewSegment.metadata?.agentName,
        agentImageUrl: overviewSegment.metadata?.agentImageUrl,
        kills: stats.kills?.value,
        deaths: stats.deaths?.value,
        assists: stats.assists?.value,
        playtime: stats.playtime?.displayValue,
        roundsPlayed: stats.roundsPlayed?.value,
        roundsWon: stats.roundsWon?.value,
        roundsLost: stats.roundsLost?.value
      };
    });
  }
}
