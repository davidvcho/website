import java.util.Arrays;
import java.util.Random;

final class Deck {
    private final Card[] cards;
    private int index = 0;

    Deck() {
        cards = new Card[52];
        initializeDeck();
    }

    private void initializeDeck() {
        int count = 0;
        for (Value value : Value.values()) {
            for (Suit suit : Suit.values()) {
                cards[count++] = new Card(value, suit);
            }
        }
    }

    void shuffle() {
        Random r = new Random();

        for (int i = cards.length - 1; i > 0; i--) {
            int swapIndex = r.nextInt(i + 1);
            Card temp = cards[i];
            cards[i] = cards[swapIndex];
            cards[swapIndex] = temp;
        }
    }

    Card deal() {
        return cards[index++];
    }

    Card[] getCards() {
        return Arrays.copyOf(cards, cards.length);
    }

    void reset() {
        index = 0;
        initializeDeck();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (Card card : cards) {
            sb.append(card).append('\n');
        }
        return sb.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Deck)) {
            return false;
        }

        Deck other = (Deck) o;
        Card[] otherCards = other.cards;

        if (cards.length != otherCards.length) {
            return false;
        }

        for (int i = 0; i < cards.length; i++) {
            if (!cards[i].equals(otherCards[i])) {
                return false;
            }
        }

        return true;
    }
}
