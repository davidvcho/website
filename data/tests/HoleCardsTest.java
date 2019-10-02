import org.junit.Test;

import static org.junit.Assert.*;

public final class HoleCardsTest {

    private final HoleCards POCKETS = new HoleCards(new Card(Value.ACE, Suit.DIAMOND), new Card(Value.ACE, Suit.SPADE));
    private final HoleCards SUITED = new HoleCards(new Card(Value.ACE, Suit.DIAMOND), new Card(Value.KING, Suit.DIAMOND));
    private final HoleCards OFFSUIT = new HoleCards(new Card(Value.ACE, Suit.DIAMOND), new Card(Value.KING, Suit.SPADE));

    @Test
    public void toString_pockets() {
        assertEquals("AA", POCKETS.toString());
    }

    @Test
    public void toString_suited() {
        assertEquals("AKs", SUITED.toString());
    }

    @Test
    public void toString_offsuit() {
        assertEquals("AKo", OFFSUIT.toString());
    }

    @Test
    public void isPocketPair_pockets() {
        assertTrue(POCKETS.isPocketPair());
    }

    @Test
    public void isPocketPair_suited() {
        assertFalse(SUITED.isPocketPair());
    }

    @Test
    public void isPocketPair_offsuit() {
        assertFalse(OFFSUIT.isPocketPair());
    }

    @Test
    public void isSuited_pockets() {
        assertFalse(POCKETS.isSuited());
    }

    @Test
    public void isSuited_suited() {
        assertTrue(SUITED.isSuited());
    }

    @Test
    public void isSuited_offsuit() {
        assertFalse(OFFSUIT.isSuited());
    }

    @Test
    public void isOffsuit_pockets() {
        assertFalse(POCKETS.isOffsuit());
    }

    @Test
    public void isOffsuit_suited() {
        assertFalse(SUITED.isOffsuit());
    }

    @Test
    public void isOffsuit_offsuit() {
        assertTrue(OFFSUIT.isOffsuit());
    }
}
