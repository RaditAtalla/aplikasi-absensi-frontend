import { StyleSheet, View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import ModalCustom from "./ModalCustom";
import MenuButton from "./MenuButton";
import HistoryDetail from "./HistoryDetail";
import axios from "axios";
import { useAuth } from "../lib/context/AuthContext";
import getDateFromISO from "../lib/utils/getDateFromISO";
import getDayFromISO from "../lib/utils/getDayFromISO";

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
  const [history, setHistory] = useState([]);
  const [isHistoryDetailOpen, setIsHistoryDetailOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [period, setPeriod] = useState("2024/2025-1");
  const [historyDetail, setHistoryDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  const SEMESTER_GANJIL = "SEMESTER GANJIL TA 2024/2025";
  const SEMESTER_GENAP = "SEMESTER GENAP TA 2024/2025";
  const SEMESTER_GANJIL_SLUG = "2024/2025-1";
  const SEMESTER_GENAP_SLUG = "2024/2025-2";

  function handlePeriodChange(period) {
    setPeriod(period);
    setIsPeriodOpen(!isPeriodOpen);
  }

  function handleViewHistoryDetail(id) {
    history.forEach((h) => {
      if (h.id == id) {
        const date = new Date(h.waktu);
        const wibDate = date.toLocaleTimeString("en", {
          timeStyle: "short",
          hour12: false,
          timeZone: "Asia/Jakarta",
        });

        setHistoryDetail({
          day: getDayFromISO(date),
          date: getDateFromISO(date),
          arriveTime: wibDate,
          leaveTime: h.leaveTime,
          status: h.status,
        });
      }
    });

    setIsHistoryDetailOpen(true);
  }

  useEffect(() => {
    async function getHistoryData() {
      const response = await axios.get("http://localhost:3000/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const history = response.data;
      setHistory(history);
      setIsLoading(false);
    }

    getHistoryData();
  }, [token]);

  return (
    <>
      <View style={styles.historyBox}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>PRESENSI {"\n"}KEHADIRAN</Text>
          <Pressable onPress={() => setIsPeriodOpen(true)}>
            <Text style={styles.historyPeriod}>{period}</Text>
          </Pressable>
        </View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          history.map((h) => {
            if (h.periode_slug == period) {
              return (
                <View
                  key={h.id}
                  style={[styles.historyListBox, { marginBottom: 10 }]}
                >
                  <View>
                    <Text style={styles.historyListDate}>
                      {getDayFromISO(new Date(h.waktu))}
                    </Text>
                    <Text style={styles.historyListDate}>
                      {getDateFromISO(new Date(h.waktu))}
                    </Text>
                  </View>
                  <Pressable onPress={() => handleViewHistoryDetail(h.id)}>
                    <Text style={styles.historySeeButton}>Lihat</Text>
                  </Pressable>
                </View>
              );
            }
          })
        )}
      </View>
      <ModalCustom
        isModalOpen={isPeriodOpen}
        closeAction={() => setIsPeriodOpen(!isPeriodOpen)}
      >
        <MenuButton
          text={SEMESTER_GANJIL}
          onPress={() => handlePeriodChange("2024/2025-1")}
          style={{ marginBottom: 10 }}
        />
        <MenuButton
          text={SEMESTER_GENAP}
          onPress={() => handlePeriodChange("2024/2025-2")}
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
