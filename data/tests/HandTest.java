import org.junit.Test;

import java.util.Set;

import static org.junit.Assert.*;

public final class HandTest {

    private static final Card ACE_SPADE = new Card(Value.ACE, Suit.SPADE);
    private static final Card TWO_SPADE = new Card(Value.TWO, Suit.SPADE);
    private static final Card THREE_SPADE = new Card(Value.THREE, Suit.SPADE);
    private static final Card FOUR_SPADE = new Card(Value.FOUR, Suit.SPADE);
    private static final Card FIVE_SPADE = new Card(Value.FIVE, Suit.SPADE);
    private static final Card SIX_SPADE = new Card(Value.SIX, Suit.SPADE);
    private static final Card SEVEN_SPADE = new Card(Value.SEVEN, Suit.SPADE);
    private static final Card EIGHT_SPADE = new Card(Value.EIGHT, Suit.SPADE);
    private static final Card NINE_SPADE = new Card(Value.NINE, Suit.SPADE);
    private static final Card TEN_SPADE = new Card(Value.TEN, Suit.SPADE);
    private static final Card JACK_SPADE = new Card(Value.JACK, Suit.SPADE);
    private static final Card QUEEN_SPADE = new Card(Value.QUEEN, Suit.SPADE);
    private static final Card KING_SPADE = new Card(Value.KING, Suit.SPADE);

    private static final Card ACE_DIAMOND = new Card(Value.ACE, Suit.DIAMOND);
    private static final Card TWO_DIAMOND = new Card(Value.TWO, Suit.DIAMOND);
    private static final Card THREE_DIAMOND = new Card(Value.THREE, Suit.DIAMOND);
    private static final Card FOUR_DIAMOND = new Card(Value.FOUR, Suit.DIAMOND);
    private static final Card FIVE_DIAMOND = new Card(Value.FIVE, Suit.DIAMOND);
    private static final Card SIX_DIAMOND = new Card(Value.SIX, Suit.DIAMOND);
    private static final Card SEVEN_DIAMOND = new Card(Value.SEVEN, Suit.DIAMOND);
    private static final Card EIGHT_DIAMOND = new Card(Value.EIGHT, Suit.DIAMOND);
    private static final Card NINE_DIAMOND = new Card(Value.NINE, Suit.DIAMOND);
    private static final Card TEN_DIAMOND = new Card(Value.TEN, Suit.DIAMOND);
    private static final Card JACK_DIAMOND = new Card(Value.JACK, Suit.DIAMOND);
    private static final Card QUEEN_DIAMOND = new Card(Value.QUEEN, Suit.DIAMOND);
    private static final Card KING_DIAMOND = new Card(Value.KING, Suit.DIAMOND);

    private static final Card ACE_CLUB = new Card(Value.ACE, Suit.CLUB);
    private static final Card TWO_CLUB = new Card(Value.TWO, Suit.CLUB);
    private static final Card THREE_CLUB = new Card(Value.THREE, Suit.CLUB);
    private static final Card FOUR_CLUB = new Card(Value.FOUR, Suit.CLUB);
    private static final Card FIVE_CLUB = new Card(Value.FIVE, Suit.CLUB);
    private static final Card SIX_CLUB = new Card(Value.SIX, Suit.CLUB);
    private static final Card SEVEN_CLUB = new Card(Value.SEVEN, Suit.CLUB);
    private static final Card EIGHT_CLUB = new Card(Value.EIGHT, Suit.CLUB);
    private static final Card NINE_CLUB = new Card(Value.NINE, Suit.CLUB);
    private static final Card TEN_CLUB = new Card(Value.TEN, Suit.CLUB);
    private static final Card JACK_CLUB = new Card(Value.JACK, Suit.CLUB);
    private static final Card QUEEN_CLUB = new Card(Value.QUEEN, Suit.CLUB);
    private static final Card KING_CLUB = new Card(Value.KING, Suit.CLUB);

    private static final Card ACE_HEART = new Card(Value.ACE, Suit.HEART);
    private static final Card TWO_HEART = new Card(Value.TWO, Suit.HEART);
    private static final Card THREE_HEART = new Card(Value.THREE, Suit.HEART);
    private static final Card FOUR_HEART = new Card(Value.FOUR, Suit.HEART);
    private static final Card FIVE_HEART = new Card(Value.FIVE, Suit.HEART);
    private static final Card SIX_HEART = new Card(Value.SIX, Suit.HEART);
    private static final Card SEVEN_HEART = new Card(Value.SEVEN, Suit.HEART);
    private static final Card EIGHT_HEART = new Card(Value.EIGHT, Suit.HEART);
    private static final Card NINE_HEART = new Card(Value.NINE, Suit.HEART);
    private static final Card TEN_HEART = new Card(Value.TEN, Suit.HEART);
    private static final Card JACK_HEART = new Card(Value.JACK, Suit.HEART);
    private static final Card QUEEN_HEART = new Card(Value.QUEEN, Suit.HEART);
    private static final Card KING_HEART = new Card(Value.KING, Suit.HEART);


    @Test
    public void quads() {
        expectResult(new Card[]{ACE_CLUB, ACE_DIAMOND, ACE_HEART, ACE_SPADE, TWO_CLUB}, FlopResult.QUADS);
    }

    @Test
    public void fullHouse() {
        expectResult(new Card[]{ACE_CLUB, ACE_DIAMOND, ACE_HEART, TWO_CLUB, TWO_DIAMOND}, FlopResult.FULL_HOUSE);
    }

    @Test
    public void flush() {
        expectResult(new Card[]{TEN_CLUB, THREE_CLUB, FIVE_CLUB, SIX_CLUB, KING_CLUB}, FlopResult.FLUSH);
    }

    @Test
    public void straight_wheel() {
        expectResult(new Card[]{ACE_CLUB, TWO_DIAMOND, THREE_CLUB, FOUR_HEART, FIVE_SPADE}, FlopResult.STRAIGHT);
    }

    @Test
    public void straight_broadway() {
        expectResult(new Card[]{ACE_CLUB, KING_DIAMOND, QUEEN_HEART, JACK_DIAMOND, TEN_CLUB}, FlopResult.STRAIGHT);
    }

    @Test
    public void set() {
        expectResult(new Card[]{ACE_CLUB, ACE_DIAMOND, ACE_HEART, JACK_DIAMOND, TEN_CLUB}, FlopResult.SET);
    }

    @Test
    public void twoPair() {
        expectResult(new Card[]{ACE_CLUB, ACE_DIAMOND, JACK_DIAMOND, JACK_HEART, TEN_CLUB}, FlopResult.TWO_PAIR);
    }

    @Test
    public void overPair() {
        expectResult(new Card[]{ACE_CLUB, ACE_DIAMOND, JACK_DIAMOND, FIVE_HEART, TEN_CLUB}, FlopResult.OVER_PAIR);
    }

    @Test
    public void topPair() {
        expectResult(new Card[]{ACE_CLUB, TEN_CLUB, ACE_SPADE, FIVE_HEART, FOUR_HEART}, FlopResult.TOP_PAIR);
    }

    @Test
    public void middlePair() {
        expectResult(new Card[]{ACE_CLUB, NINE_CLUB, NINE_DIAMOND, FIVE_HEART, JACK_HEART}, FlopResult.MIDDLE_PAIR);
    }

    @Test
    public void bottomPair() {
        expectResult(new Card[]{ACE_CLUB, FIVE_DIAMOND, NINE_DIAMOND, FIVE_HEART, JACK_HEART}, FlopResult.BOTTOM_PAIR);
    }

    @Test
    public void aceHigh() {
        expectResult(new Card[]{ACE_CLUB, FIVE_DIAMOND, NINE_DIAMOND, SEVEN_SPADE, JACK_HEART}, FlopResult.ACE_HIGH);
    }

    @Test
    public void noMadeHand() {
        expectResult(new Card[]{KING_CLUB, FIVE_DIAMOND, NINE_DIAMOND, SEVEN_SPADE, JACK_HEART}, FlopResult.NO_MADE_HAND);
    }

    @Test
    public void flushDraw() {
        expectResult(new Card[]{KING_DIAMOND, FIVE_DIAMOND, NINE_DIAMOND, SEVEN_DIAMOND, JACK_HEART}, FlopResult.FLUSH_DRAW, FlopResult.NO_MADE_HAND);
    }

    @Test
    public void backdoorFlushDraw() {
        expectResult(new Card[]{THREE_HEART, FIVE_HEART, SEVEN_HEART, TEN_DIAMOND, JACK_DIAMOND}, FlopResult.BACKDOOR_FLUSH_DRAW, FlopResult.NO_MADE_HAND);
    }

    @Test
    public void openEndedStraightDraw() {
        expectResult(new Card[]{FIVE_DIAMOND, SIX_CLUB, SEVEN_HEART, EIGHT_HEART, ACE_SPADE}, FlopResult.OPEN_ENDED_STRAIGHT_DRAW, FlopResult.ACE_HIGH);
    }

    @Test
    public void gutshotStraightDraw() {
        expectResult(new Card[]{FIVE_DIAMOND, SIX_CLUB, SEVEN_HEART, NINE_HEART, KING_CLUB}, FlopResult.GUTSHOT_STRAIGHT_DRAW, FlopResult.NO_MADE_HAND);
    }

    @Test
    public void gutshotStraightDraw_wheel() {
        expectResult(new Card[]{ACE_SPADE, TWO_DIAMOND, THREE_HEART, FOUR_CLUB, TEN_HEART}, FlopResult.GUTSHOT_STRAIGHT_DRAW, FlopResult.ACE_HIGH);
    }

    @Test
    public void gutshotStraightDraw_broadway() {
        expectResult(new Card[]{ACE_HEART, KING_DIAMOND, QUEEN_CLUB, JACK_SPADE, FIVE_CLUB}, FlopResult.GUTSHOT_STRAIGHT_DRAW, FlopResult.ACE_HIGH);
    }

    @Test
    public void flushDrawAndPair() {
        expectResult(new Card[]{KING_DIAMOND, FIVE_DIAMOND, NINE_DIAMOND, SEVEN_DIAMOND, NINE_SPADE}, FlopResult.FLUSH_DRAW, FlopResult.MIDDLE_PAIR, FlopResult.FLUSH_DRAW_AND_PAIR);
    }

    @Test
    public void flushDrawAndOpenEndedStraightDraw() {
        expectResult(new Card[]{KING_DIAMOND, QUEEN_DIAMOND, JACK_DIAMOND, TEN_DIAMOND, FIVE_HEART}, FlopResult.FLUSH_DRAW, FlopResult.OPEN_ENDED_STRAIGHT_DRAW, FlopResult.FLUSH_DRAW_AND_OPEN_ENDED_STRAIGHT_DRAW, FlopResult.NO_MADE_HAND);
    }

    @Test
    public void flushDrawAndGutshot() {
        expectResult(new Card[]{KING_DIAMOND, QUEEN_DIAMOND, JACK_DIAMOND, NINE_DIAMOND, FIVE_HEART}, FlopResult.FLUSH_DRAW, FlopResult.GUTSHOT_STRAIGHT_DRAW, FlopResult.FLUSH_DRAW_AND_GUTSHOT_STRAIGHT_DRAW, FlopResult.NO_MADE_HAND);
    }

    @Test
    public void openEndedStraightDrawAndPair() {
        expectResult(new Card[]{KING_DIAMOND, QUEEN_CLUB, JACK_HEART, TEN_DIAMOND, KING_HEART}, FlopResult.TOP_PAIR, FlopResult.OPEN_ENDED_STRAIGHT_DRAW, FlopResult.OPEN_ENDED_STRAIGHT_DRAW_AND_PAIR);
    }

    @Test
    public void gutshotAndPair() {
        expectResult(new Card[]{KING_DIAMOND, QUEEN_CLUB, JACK_HEART, NINE_DIAMOND, KING_HEART}, FlopResult.TOP_PAIR, FlopResult.GUTSHOT_STRAIGHT_DRAW, FlopResult.GUTSHOT_STRAIGHT_DRAW_AND_PAIR);
    }

    private void expectResult(Card[] cards, FlopResult... results) {
        assertEquals(Set.of(results), new Hand(cards).flopResult());
    }

}