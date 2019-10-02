import org.json.simple.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

final class Simulator {

    private static final int TOTAL_FLOPS = 19600;

    static void run() {
        Deck deck = new Deck();

        Card[] cards = deck.getCards();
        int length = cards.length;

        Card[] hand = new Card[5];

        JSONObject json = new JSONObject();

        int holeCardsCount = 0;

        for (int i = 0; i < length - 1; i++) {
            for (int j = i + 1; j < length; j++) {
                HoleCards holeCards = new HoleCards(cards[i], cards[j]);

                System.out.println(String.format("%f", ++holeCardsCount * 100.0 / 1326));

                if (json.containsKey(holeCards.toString())) {
                    continue;
                }

                hand[0] = holeCards.card1();
                hand[1] = holeCards.card2();

                HashMap<FlopResult, Integer> resultsForHoleCards = initFlopResults();

                for (int a = 0; a < length - 2; a++) {
                    if (a == i || a == j) {
                        continue;
                    }

                    hand[2] = cards[a];

                    for (int b = a + 1; b < length - 1; b++) {
                        if (b == i || b == j) {
                            continue;
                        }

                        hand[3] = cards[b];

                        for (int c = b + 1; c < length; c++) {
                            if (c == i || c == j) {
                                continue;
                            }

                            hand[4] = cards[c];

                            Hand h = new Hand(hand);
                            Set<FlopResult> flopResult = h.flopResult();

                            for (FlopResult result : flopResult) {
                                resultsForHoleCards.put(result, resultsForHoleCards.get(result) + 1);
                            }
                        }
                    }
                }

                HashMap<FlopResult, Double> flopPercents = new HashMap<>();
                for (Map.Entry<FlopResult, Integer> entry : resultsForHoleCards.entrySet()) {
                    flopPercents.put(entry.getKey(), getPercentageForFlopResult(entry.getValue()));
                }

                json.put(holeCards.toString(), flopPercents);
            }
        }

        System.out.println(json.toJSONString());
    }

    private static HashMap<FlopResult, Integer> initFlopResults() {
        HashMap<FlopResult, Integer> results = new HashMap<>();
        for (FlopResult result : FlopResult.values()) {
            results.put(result, 0);
        }
        return results;
    }

    private static double getPercentageForFlopResult(int count) {
        return count * 100.0 / TOTAL_FLOPS;
    }

    public static void main(String[] args) {
        Simulator.run();
    }
}
