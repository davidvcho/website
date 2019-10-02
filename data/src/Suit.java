enum Suit {
    DIAMOND("Diamonds"),
    CLUB("Clubs"),
    HEART("Hearts"),
    SPADE("Spade");

    private final String name;

    Suit(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

    String toShortString() {
        return name.substring(0, 1).toLowerCase();
    }
}
