final class Card implements Comparable<Card> {
    private final Value value;
    private final Suit suit;

    Card(Value value, Suit suit) {
        this.value = value;
        this.suit = suit;
    }

    Value getValue() {
        return value;
    }

    Suit getSuit() {
        return suit;
    }

    @Override
    public String toString() {
        return String.format("%s%s", value.getStringValue(), suit.toShortString());
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Card)) {
            return false;
        }

        Card other = (Card) o;
        return other.value == this.value && other.suit == this.suit;
    }

    @Override
    public int hashCode() {
        return (int) Math.pow(value.ordinal(), suit.ordinal());
    }

    @Override
    public int compareTo(Card o) {
        return value == o.value
                ? suit.ordinal() - o.suit.ordinal()
                : value.getValue() - o.value.getValue();
    }
}
