import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";
import ModalCustom from "./ModalCustom";
import MenuButton from "./MenuButton";
import HistoryDetail from "./HistoryDetail";

const history = [
  {
    day: "SELASA",
    date: "11 NOVEMBER 2023",
    period: "SEMESTER GANJIL TA 2023/2024",
    periodSlug: "2023/2024-1",
    arriveTime: "07:02 WIB",
    leaveTime: "15:13 WIB",
    status: "TIDAK TERLAMBAT",
  },
  {
    day: "SENIN",
    date: "10 NOVEMBER 2023",
    period: "SEMESTER GANJIL TA 2023/2024",
    periodSlug: "2023/2024-1",
    arriveTime: "07:00 WIB",
    leaveTime: "12:10 WIB",
    status: "TIDAK TERLAMBAT",
  },
  {
    day: "SELASA",
    date: "25 MEI 2024",
    period: "SEMESTER GENAP TA 2023/2024",
    periodSlug: "2023/2024-2",
    arriveTime: "08:00 WIB",
    leaveTime: "12:10 WIB",
    status: "TERLAMBAT",
  },
  {
    day: "SENIN",
    date: "24 MEI 2024",
    period: "SEMESTER GENAP TA 2023/2024",
    periodSlug: "2023/2024-2",
    arriveTime: "07:00 WIB",
    leaveTime: "15:30 WIB",
    status: "TIDAK TERLAMBAT",
  },
];

export default function HistoryCard() {
  const [isHistoryDetailOpen, setIsHistoryDetailOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [period, setPeriod] = useState("2023/2024-1");
  const [historyDetail, setHistoryDetail] = useState({});

  function handlePeriodChange(period) {
    setPeriod(period);
    setIsPeriodOpen(!isPeriodOpen);
  }

  function handleViewHistoryDetail(date) {
    setIsHistoryDetailOpen(true);
    history.forEach((h) => {
      if (h.date == date) {
        setHistoryDetail({
          day: h.day,
          date: h.date,
          period: h.period,
          periodSlug: h.periodSlug,
          arriveTime: h.arriveTime,
          leaveTime: h.leaveTime,
          status: h.status,
        });
      }
    });
  }

  return (
    <>
      <View style={styles.historyBox}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>PRESENSI {"\n"}KEHADIRAN</Text>
          <Pressable onPress={() => setIsPeriodOpen(true)}>
            <Text style={styles.historyPeriod}>{period}</Text>
          </Pressable>
        </View>
        {history.map((h) => {
          if (h.periodSlug == period) {
            return (
              <View
                key={h.date}
                style={[styles.historyListBox, { marginBottom: 10 }]}
              >
                <View>
                  <Text style={styles.historyListDate}>{h.day}</Text>
                  <Text style={styles.historyListDate}>{h.date}</Text>
                </View>
                <Pressable onPress={() => handleViewHistoryDetail(h.date)}>
                  <Text style={styles.historySeeButton}>Lihat</Text>
                </Pressable>
              </View>
            );
          }
        })}
      </View>
      <ModalCustom
        isModalOpen={isPeriodOpen}
        closeAction={() => setIsPeriodOpen(!isPeriodOpen)}
      >
        <MenuButton
          text={"SEMESTER GANJIL TA 2023/2024"}
          onPress={() => handlePeriodChange("2023/2024-1")}
          style={{ marginBottom: 10 }}
        />
        <MenuButton
          text={"SEMESTER GENAP TA 2023/2024"}
          onPress={() => handlePeriodChange("2023/2024-2")}
        />
      </ModalCustom>
      <HistoryDetail
        data={historyDetail}
        isModalOpen={isHistoryDetailOpen}
        closeAction={() => setIsHistoryDetailOpen(!isHistoryDetailOpen)}
      />
    </>
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
