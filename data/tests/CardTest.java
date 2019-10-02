import org.junit.Test;

import static org.junit.Assert.*;

public final class CardTest {

    private static final Card CARD = new Card(Value.ACE, Suit.SPADE);

    @Test
    public void getValue() {
        assertEquals(Value.ACE, CARD.getValue());
    }

    @Test
    public void getSuit() {
        assertEquals(Suit.SPADE, CARD.getSuit());
    }

    @Test
    public void string() {
        assertEquals("As", CARD.toString());
    }

    @Test
    public void equals() {
        assertEquals(CARD, new Card(Value.ACE, Suit.SPADE));
    }

    @Test
    public void notEquals_value() {
        assertNotEquals(CARD, new Card(Value.TWO, Suit.SPADE));
    }

    @Test
    public void notEquals_suit() {
        assertNotEquals(CARD, new Card(Value.ACE, Suit.DIAMOND));
    }
}