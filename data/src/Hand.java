import java.util.*;
import java.util.stream.Stream;

final class Hand {

    private final Card[] cards;

    Hand(Card[] cards) {
        this.cards = cards;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (Card card : cards) {
            sb.append(card.toString()).append(' ');
        }
        return sb.toString();
    }

    Set<FlopResult> flopResult() {
        Map<Value, Integer> values = new HashMap<>();
        Map<Suit, Integer> suits = new HashMap<>();

        for (Card card : cards) {
            values.put(card.getValue(), values.getOrDefault(card.getValue(), 0) + 1);
            suits.put(card.getSuit(), suits.getOrDefault(card.getSuit(), 0) + 1);
        }

        Set<FlopResult> results = new HashSet<>();
        checkForFlushes(results, suits);
        checkForStraights(results, values);
        boolean hasPair = checkForMadeHands(results, values, cards);
        checkForMadeHandAndDrawCombos(results, hasPair);

        for (FlopResult result : FlopResult.MADE_HANDS) {
            if (results.contains(result)) {
                return results;
            }
        }
        results.add(FlopResult.NO_MADE_HAND);
        return results;
    }

    private static Map<Integer, Set<Value>> invertValues(Map<Value, Integer> values) {
        Map<Integer, Set<Value>> countToValues = new HashMap<>();
        for (Map.Entry<Value, Integer> entry : values.entrySet()) {
            Integer key = entry.getValue();

            if (!countToValues.containsKey(key)) {
                countToValues.put(key, new HashSet<>());
            }

            countToValues.get(key).add(entry.getKey());
        }
        return countToValues;
    }

    private static boolean checkForMadeHands(Set<FlopResult> results, Map<Value, Integer> values, Card[] cards) {
        Map<Integer, Set<Value>> countToValues = invertValues(values);

        boolean hasPair = false;
        for (int i = 4; i > 0; i--) {
            if (!countToValues.containsKey(i)) {
                continue;
            }

            Set<Value> valuesForCount = countToValues.get(i);
            switch (i) {
                case 4:
                    results.add(FlopResult.QUADS);
                    break;
                case 3:
                    results.add(FlopResult.SET);
                    break;
                case 2:
                    if (valuesForCount.size() == 2) {
                        results.add(FlopResult.TWO_PAIR);
                    } else if (results.contains(FlopResult.SET)) {
                        results.remove(FlopResult.SET);
                        results.add(FlopResult.FULL_HOUSE);
                    } else {
                        hasPair = true;
                        Value value = valuesForCount.iterator().next();
                        Value[] valueArray = getSortedValues(values);

                        // Hand is a pocket and highest pair available.
                        if (value == valueArray[valueArray.length - 1] && value == cards[0].getValue() && value == cards[1].getValue()) {
                            results.add(FlopResult.OVER_PAIR);
                        } else if (value == valueArray[valueArray.length - 1]) {
                            results.add(FlopResult.TOP_PAIR);
                        } else if (value == valueArray[0]) {
                            results.add(FlopResult.BOTTOM_PAIR);
                        } else {
                            results.add(FlopResult.MIDDLE_PAIR);
                        }
                    }
                    break;
                case 1:
                    for (FlopResult result : FlopResult.MADE_HANDS) {
                        if (results.contains(result)) {
                            return hasPair;
                        }
                    }

                    Value[] valueArray = getSortedValues(values);
                    if (valueArray[valueArray.length - 1] == Value.ACE) {
                        results.add(FlopResult.ACE_HIGH);
                    }
            }
        }

        return hasPair;
    }

    private static Value[] getSortedValues(Map<Value, Integer> values) {
        Value[] valueArray = values.keySet().toArray(new Value[0]);
        Arrays.sort(valueArray);
        return valueArray;
    }

    private static void checkForFlushes(Set<FlopResult> results, Map<Suit, Integer> suits) {
        for (Map.Entry<Suit, Integer> suitEntry : suits.entrySet()) {
            switch (suitEntry.getValue()) {
                case 5:
                    results.add(FlopResult.FLUSH);
                    break;
                case 4:
                    results.add(FlopResult.FLUSH_DRAW);
                    break;
                case 3:
                    results.add(FlopResult.BACKDOOR_FLUSH_DRAW);
                    break;
            }
        }
    }

    private static void checkForStraights(Set<FlopResult> results, Map<Value, Integer> values) {
        Integer[] sortedValues = Stream.of(getSortedValues(values)).map(Value::getValue).toArray(Integer[]::new);
        if (sortedValues[sortedValues.length - 1] == Value.ACE.getValue()) {
            Integer[] temp = new Integer[sortedValues.length + 1];
            temp[0] = Value.TWO.getValue() - 1;
            System.arraycopy(sortedValues, 0, temp, 1, sortedValues.length);
            sortedValues = temp;
        }

        boolean skipped = false;
        int straightCount = 0;
        int firstValue = 0;

        for (int i = 0; i < sortedValues.length; i++) {
            int currValue = sortedValues[i];

            if (straightCount > 0 && straightCount < 5) {
                if (currValue == sortedValues[i - 1] + 1) {
                    straightCount++;
                } else if (!skipped && currValue == sortedValues[i - 1] + 2) {
                    skipped = true;
                    straightCount++;
                } else if (straightCount < 4) {
                    straightCount = 1;
                    skipped = false;
                    firstValue = currValue;
                }
            } else {
                straightCount++;
                firstValue = currValue;
            }
        }

        if (straightCount >= 5) {
            results.add(FlopResult.STRAIGHT);
        } else if (straightCount == 4) {
            results.add(skipped || firstValue == Value.TWO.getValue() - 1 || firstValue == Value.JACK.getValue() ? FlopResult.GUTSHOT_STRAIGHT_DRAW : FlopResult.OPEN_ENDED_STRAIGHT_DRAW);
        }
    }

    private static void checkForMadeHandAndDrawCombos(Set<FlopResult> results, boolean hasPair) {
        if (results.contains(FlopResult.FLUSH_DRAW)) {
            if (hasPair) {
                results.add(FlopResult.FLUSH_DRAW_AND_PAIR);
            }
            if (results.contains(FlopResult.OPEN_ENDED_STRAIGHT_DRAW)) {
                results.add(FlopResult.FLUSH_DRAW_AND_OPEN_ENDED_STRAIGHT_DRAW);
            }
            if (results.contains(FlopResult.GUTSHOT_STRAIGHT_DRAW)) {
                results.add(FlopResult.FLUSH_DRAW_AND_GUTSHOT_STRAIGHT_DRAW);
            }
        } else if (hasPair) {
            if (results.contains(FlopResult.OPEN_ENDED_STRAIGHT_DRAW)) {
                results.add(FlopResult.OPEN_ENDED_STRAIGHT_DRAW_AND_PAIR);
            }
            if (results.contains(FlopResult.GUTSHOT_STRAIGHT_DRAW)) {
                results.add(FlopResult.GUTSHOT_STRAIGHT_DRAW_AND_PAIR);
            }
        }
    }
}
