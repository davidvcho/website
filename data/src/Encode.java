import java.util.ArrayList;
import java.util.List;

final class Encode {
    static String encode(List<String> strList) {
        StringBuilder sb = new StringBuilder();

        for (int j = 0; j < strList.size(); j++) {
            String str = strList.get(j);

            for (int i = 0; i < str.length(); i++) {
                if (str.charAt(i) == '\\' || str.charAt(i) == '|') {
                    sb.append('\'');
                }
                sb.append(str.charAt(i));
            }

            if (j < strList.size() - 1)
                sb.append('|');
        }

        return sb.toString();
    }

    static List<String> decode(String str) {
        List<String> strList = new ArrayList<>();

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < str.length(); ) {
            if (str.charAt(i) == '\\') {
                sb.append(str.charAt(++i));

            } else if (str.charAt(i) == '|') {
                strList.add(sb.toString());
                sb = new StringBuilder();
            } else {
                sb.append(str.charAt(i));
            }
            i++;
        }
        strList.add(sb.toString());
        return strList;
    }

    public static void main(String args[]) {
        String e = encode(List.of("abc", "def"));
        System.out.println(e);

        List<String> d = decode(e);
        System.out.println(d);
    }
}
