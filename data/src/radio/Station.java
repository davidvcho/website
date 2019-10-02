package radio;

final class Station implements Comparable<Station> {

  private final String name;
  private final int id;
  private int playlistLength;

  Station(String name, int id) {
    this.name = name;
    this.id = id;
  }

  @Override
  public String toString() {
    return String.format("%s. %s", id, name);
  }

  @Override
  public int compareTo(Station o) {
    return id - o.id;
  }

  void incrementPlaylistLength() {
    playlistLength++;
  }

  int getPlaylistLength() {
    return playlistLength;
  }

  int getId() {
      return id;
  }
}
