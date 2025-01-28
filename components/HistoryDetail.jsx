import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

export default function HistoryDetai({ isModalOpen, closeAction }) {
  return (
    <Modal visible={isModalOpen} animationType="slide" transparent>
      <Pressable onPress={closeAction} style={styles.bottomSheet}>
        <View style={styles.historyDetail}>
          <View style={styles.historyDetailHeader}>
            <Text style={styles.historyDetailDay}>SELASA</Text>
            <Text style={styles.historyDetailDate}>25 Mei 2024</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.historyDetailInfo}>
            <Text style={styles.historyDetailLabel}>ABSEN DATANG</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={styles.historyDetailHourLabel}>PUKUL</Text>
              <View style={styles.historyDetailHour}>
                <Text style={{ fontFamily: "AlegreyaLight", fontSize: 16 }}>
                  08:00 WIB
                </Text>
              </View>
            </View>
            <Text style={styles.historyDetailLabel}>ABSEN PULANG</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={styles.historyDetailHourLabel}>PUKUL</Text>
              <View style={styles.historyDetailHour}>
                <Text style={{ fontFamily: "AlegreyaLight", fontSize: 16 }}>
                  12:10 WIB
                </Text>
              </View>
            </View>
            <View style={styles.historyDetailFooter}>
              <View>
                <Text
                  style={[styles.historyDetailLabel, { fontWeight: "bold" }]}
                >
                  STATUS KEHADIRAN
                </Text>
                <Text style={styles.historyDetailStatus}>TIDAK TERLAMBAT</Text>
              </View>
              <Pressable onPress={closeAction}>
                <Text style={styles.historyDetailOk}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  historyDetail: {
    backgroundColor: "#B22A2A",
  },
  historyDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  historyDetailDay: {
    fontFamily: "AlegreyaBold",
    fontSize: 32,
    color: "white",
  },
  historyDetailDate: {
    fontFamily: "AlegreyaBold",
    fontSize: 16,
    color: "white",
  },
  line: {
    height: 1,
    backgroundColor: "white",
  },
  historyDetailInfo: {
    paddingTop: 22,
    paddingBottom: 50,
    paddingHorizontal: 40,
  },
  historyDetailLabel: {
    color: "white",
    fontFamily: "AlegreyaMedium",
    fontSize: 16,
    marginBottom: 10,
  },
  historyDetailHourLabel: {
    fontFamily: "Alegreya",
    fontSize: 14,
    color: "white",
  },
  historyDetailHour: {
    fontFamily: "AlegreyaLight",
    color: "black",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 13,
  },
  historyDetailFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historyDetailStatus: {
    borderRadius: 5,
    backgroundColor: "#3D8C3B",
    color: "white",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  historyDetailOk: {
    color: "white",
    backgroundColor: "#3D8C3B",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});
