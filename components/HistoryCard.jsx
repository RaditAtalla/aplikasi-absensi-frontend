import { StyleSheet, View, Text, Pressable } from "react-native";

export default function HistoryCard() {
  return (
    <View style={styles.historyBox}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>PRESENSI {"\n"}KEHADIRAN</Text>
        <Pressable>
          <Text style={styles.historyPeriod}>2023/2024-2</Text>
        </Pressable>
      </View>
      <View style={[styles.historyListBox, { marginBottom: 10 }]}>
        <View>
          <Text style={styles.historyListDate}>Selasa</Text>
          <Text style={styles.historyListDate}>25 Mei 2024</Text>
        </View>
        <Pressable>
          <Text style={styles.historySeeButton}>Lihat</Text>
        </Pressable>
      </View>
      <View style={styles.historyListBox}>
        <View>
          <Text style={styles.historyListDate}>Senin</Text>
          <Text style={styles.historyListDate}>24 Mei 2024</Text>
        </View>
        <Pressable>
          <Text style={styles.historySeeButton}>Lihat</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyBox: {
    borderWidth: 1,
    borderColor: "#B22A2A",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  historyTitle: {
    fontFamily: "AlegreyaBold",
    fontSize: 16,
  },
  historyPeriod: {
    borderWidth: 1,
    borderColor: "#B22A2A",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontFamily: "AlegreyaBold",
  },
  historyListBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#B22A2A",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
  },
  historyListDate: {
    color: "white",
    fontFamily: "AlegreyaBold",
    fontSize: 16,
  },
  historySeeButton: {
    backgroundColor: "#CE4C4C",
    color: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
