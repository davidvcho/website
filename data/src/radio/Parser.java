package radio;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.ListIterator;
import java.util.function.IntFunction;
import java.util.stream.Collectors;
import java.util.stream.Stream;

final class Parser {
  // List of stations, sorted in ascending order by id.
  private final Station[] stations;

  private final int[] stationIds;

  // List of songs, sorted in ascending order by id.
  private final Song[] songs;

  private final int[] songIds;

  Parser(String stationFileName, String songFileName) {
    this.stations = parseStations(stationFileName);
    Arrays.sort(this.stations);

    this.stationIds = Stream.of(this.stations).map(Station::getId).toArray(int[]::new);

    this.songs = parseSongs(songFileName, this.stations);
    Arrays.sort(this.songs);
  }

  void parseSongLogs(String songLogsFileName) {
    try (Stream<String> stream = Files.lines(Paths.get(songLogsFileName))) {
      ListIterator<String> linesIter = stream.collect(Collectors.toList()).listIterator();
      while (linesIter.hasNext()) {
        int time = linesIter.nextIndex() + 1;
        String[] parts = linesIter.next().split(";");

        int stationIndex = getStationIndex(Integer.parseInt(parts[1]));
        stations[stationIndex].incrementPlaylistLength();

        Song song = findSong(Integer.parseInt(parts[2]));
        song.incrementPlay(stationIndex, time);
      }
    } catch (IOException e) {
      System.out.println("Encountered error parsing " + songLogsFileName);
      e.printStackTrace();
    }
  }

  private interface ObjectParser<T> {
    T parse(String[] parts);
  }

  private static <T> T[] parseObjects(
      String fileName, ObjectParser<T> objectParser, IntFunction<T[]> generator) {
    try (Stream<String> stream = Files.lines(Paths.get(fileName))) {
      return stream.skip(1).map(line -> objectParser.parse(parseLine(line))).toArray(generator);
    } catch (IOException e) {
      System.out.println("Encountered error parsing " + fileName);
      e.printStackTrace();
      return null;
    }
  }

  private static String[] parseLine(String line) {
    return Arrays.asList(line.split(";")).stream().map(String::trim).toArray(String[]::new);
  }

  private static Station[] parseStations(String stationFileName) {
    return parseObjects(
        stationFileName,
        parts -> new Station(parts[0], Integer.parseInt(parts[1])),
        Station[]::new);
  }

  private static Song[] parseSongs(String songFileName, Station[] stations) {
    return parseObjects(
        songFileName,
        parts -> new Song(parts[0], parts[1], Integer.parseInt(parts[2]), stations),
        Song[]::new);
  }

  private int getStationIndex(int id) {
    return Arrays.binarySearch(this.stations, id);
  }

  private Song findSong(int id) {
    return songs[Arrays.binarySearch(this.songs, id)];
  }

  public static void main(String[] args) {
    Parser parser = new Parser("src/radio/stations.txt", "src/radio/songs.txt");
  }
}
