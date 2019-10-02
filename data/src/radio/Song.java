package radio;

import java.util.Arrays;

final class Song implements Comparable<Song> {

  private final String name;
  private final String artist;
  private final int id;

  // List of stations, sorted in ascending order by id.
  private final Station[] stations;
  private final int[] timesPlayed;
  private final int[] lastTimePlayed;

  Song(String name, String artist, int id, Station[] stations) {
    this.name = name;
    this.artist = artist;
    this.id = id;
    this.stations = stations;
    this.timesPlayed = new int[stations.length];
    this.lastTimePlayed = new int[stations.length];
  }

  @Override
  public String toString() {
    return String.format("%s. %s - %s", id, artist, name);
  }

  @Override
  public int compareTo(Song o) {
    return id - o.id;
  }

  void incrementPlay(int stationIndex, int time) {
    timesPlayed[stationIndex]++;
    lastTimePlayed[stationIndex] = time;
  }

  int[] getStatistics() {
    int totalPlays = 0;
    int totalStations = 0;

    int maxStationId = -1;
    int maxPlaysByStation = -1;

    int minStationId = -1;
    int minPlaysByStation = Integer.MAX_VALUE;

    for (int i = 0; i < timesPlayed.length; i++) {
      int count = timesPlayed[i];

      if (count > 0) {
        totalPlays += count;
        totalStations++;
      }

      if (count > maxPlaysByStation) {
        maxPlaysByStation = count;
        maxStationId = this.stations[i].getId();
      }

      if (count <= minPlaysByStation) {
        minPlaysByStation = count;
        minStationId = this.stations[i].getId();
      }
    }

    return new int[] {
      // Average number of plays of this song on stations that carry it.
      totalPlays / totalStations,
      // Total number of plays across all stations.
      totalPlays,
      // ID of the station that plays this song the most. If there is a tie, this is the lowest
      // station ID.
      maxStationId,
      // Maximum number of plays on any one station.
      maxPlaysByStation,
      // ID of the station that plays this song the least. If there is a tie, this is the highest
      // station ID.
      minStationId,
      // Minimum number of plays on any one station. This can be zero.
      minPlaysByStation
    };
  }

  int getLastPlayed(int stationId) {
    int index = Arrays.binarySearch(this.stations, stationId);
    return lastTimePlayed[index];
  }
}
