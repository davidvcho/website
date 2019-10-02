enum Value {
    TWO(2, "2"),
    THREE(3, "3"),
    FOUR(4, "4"),
    FIVE(5, "5"),
    SIX(6, "6"),
    SEVEN(7, "7"),
    EIGHT(8, "8"),
    NINE(9, "9"),
    TEN(10, "Ten"),
    JACK(11, "Jack"),
    QUEEN(12, "Queen"),
    KING(13, "King"),
    ACE(14, "Ace");

    private final int value;
    private final String stringValue;

    Value(int value, String stringValue) {
        this.value = value;
        this.stringValue = stringValue;
    }

    int getValue() {
        return value;
    }

    String getStringValue() {
        return stringValue.substring(0, 1);
    }

    @Override
    public String toString() {
        return stringValue;
    }
}
