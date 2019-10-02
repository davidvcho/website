import org.junit.Test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;

public final class DeckTest {

    private static final Deck DECK = new Deck();

    @Test
    public void shuffle() {
        // Ensure that any card is equally likely to be in 0th spot.
        HashMap<Card, Integer> count = new HashMap<>();

        int iterations = 1000000;

        for (int i = 0; i < iterations; i++) {
            DECK.shuffle();
            Card card = DECK.deal();
            count.put(card, count.getOrDefault(card, 0) + 1);
            DECK.reset();
        }

        double expectedCount = 100 / 52.0;

        for (Map.Entry<Card, Integer> entry : count.entrySet()) {
            double percent = entry.getValue() * 100.0 / iterations;
            assertTrue(Math.abs(percent - expectedCount) < 0.1);
        }
    }

    @Test
    public void deal() {
        assertEquals(DECK.getCards()[0], DECK.deal());
    }

    @Test
    public void getCards() {
        Card[] cards = DECK.getCards();
        Arrays.sort(cards);

        for (int i = 0; i < cards.length; i++) {
            assertEquals(Value.values()[i / 4], cards[i].getValue());
            assertEquals(Suit.values()[i % 4], cards[i].getSuit());
        }
    }

    @Test
    public void reset() {
        DECK.shuffle();
        DECK.reset();
        assertEquals(new Deck(), DECK);
    }
}