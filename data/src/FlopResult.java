import java.util.Set;

enum FlopResult {
    // Made hands
    QUADS,
    FULL_HOUSE,
    FLUSH,
    STRAIGHT,
    SET,
    TWO_PAIR,
    OVER_PAIR,
    TOP_PAIR,
    MIDDLE_PAIR,
    BOTTOM_PAIR,
    ACE_HIGH,
    NO_MADE_HAND,

    // Draws
    FLUSH_DRAW,
    OPEN_ENDED_STRAIGHT_DRAW,
    GUTSHOT_STRAIGHT_DRAW,
    BACKDOOR_FLUSH_DRAW,

    // Combinations of made hands and draws
    FLUSH_DRAW_AND_PAIR,
    FLUSH_DRAW_AND_OPEN_ENDED_STRAIGHT_DRAW,
    FLUSH_DRAW_AND_GUTSHOT_STRAIGHT_DRAW,
    OPEN_ENDED_STRAIGHT_DRAW_AND_PAIR,
    GUTSHOT_STRAIGHT_DRAW_AND_PAIR;

    static final Set<FlopResult> MADE_HANDS = Set.of(QUADS,
            FULL_HOUSE,
            FLUSH,
            STRAIGHT,
            SET,
            TWO_PAIR,
            OVER_PAIR,
            TOP_PAIR,
            MIDDLE_PAIR,
            BOTTOM_PAIR,
            ACE_HIGH);
}
