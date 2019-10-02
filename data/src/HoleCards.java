final class HoleCards {

    private final Card card1;
    private final Card card2;
    private final String toString;

    HoleCards(Card card1, Card card2) {
        this.card1 = card1;
        this.card2 = card2;

        String c1 = card1.getValue().getStringValue();
        String c2 = card2.getValue().getStringValue();
        boolean c1LessThanC2 = card1.getValue().compareTo(card2.getValue()) < 0;
        toString = String.format("%s%s%s", c1LessThanC2 ? c2 : c1, c1LessThanC2 ? c1 : c2, suitedString());
    }

    private String suitedString() {
        if (isSuited()) {
            return "s";
        } else if (isOffsuit()) {
            return "o";
        }
        return "";
    }

    @Override
    public String toString() {
        return toString;
    }

    Card card1() {
        return card1;
    }

    Card card2() {
        return card2;
    }

    boolean isPocketPair() {
        return card1.getValue() == card2.getValue();
    }

    boolean isSuited() {
        return card1.getSuit() == card2.getSuit();
    }

    boolean isOffsuit() {
        return !isPocketPair() && !isSuited();
    }
}
