import { StyleSheet, View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import ModalCustom from "./ModalCustom";
import MenuButton from "./MenuButton";
import HistoryDetail from "./HistoryDetail";
import axios from "axios";
import { useAuth } from "../lib/context/AuthContext";
import getDateFromISO from "../lib/utils/getDateFromISO";
import getDayFromISO from "../lib/utils/getDayFromISO";
import getPeriod from "../lib/utils/getPeriod";

export default function HistoryCard() {
  const [history, setHistory] = useState([]);
  const [isHistoryDetailOpen, setIsHistoryDetailOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [period, setPeriod] = useState("2024/2025-1");
  const [historyDetail, setHistoryDetail] = useState({});
  const [hari, setHari] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    SEMESTER_GANJIL,
    SEMESTER_GENAP,
    SEMESTER_GANJIL_SLUG,
    SEMESTER_GENAP_SLUG,
  } = getPeriod();
  const { token } = useAuth();

  function handlePeriodChange(period) {
    setPeriod(period);
    setIsPeriodOpen(!isPeriodOpen);
  }

  async function handleViewHistoryDetail(date) {
    const response = await axios.post(
      "http://10.0.2.2:3000/history-detail",
      { date },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const detail = response.data;

    setHistoryDetail({
      day: getDayFromISO(new Date(detail.iso_waktu)),
      date: detail.tanggal,
      arriveTime: detail.jam_datang,
      leaveTime: detail.jam_pulang,
      status: detail.status,
    });

    setIsHistoryDetailOpen(true);
  }

  useEffect(() => {
    async function getHari() {
      const response = await axios.get("http://10.0.2.2:3000/day", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const hari = response.data;
      setHari(hari);
      setIsLoading(false);
    }

    getHari();
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
          hari.map((h) => {
            return (
              <View
                key={h.id}
                style={[styles.historyListBox, { marginBottom: 10 }]}
              >
                <View>
                  <Text style={styles.historyListDate}>{h.hari}</Text>
                  <Text style={styles.historyListDate}>{h.tanggal}</Text>
                </View>
                <Pressable
                  onPress={async () => await handleViewHistoryDetail(h.tanggal)}
                >
                  <Text style={styles.historySeeButton}>Lihat</Text>
                </Pressable>
              </View>
            );
          })
        )}
      </View>
      <ModalCustom
        isModalOpen={isPeriodOpen}
        closeAction={() => setIsPeriodOpen(!isPeriodOpen)}
      >
        <MenuButton
          text={SEMESTER_GANJIL}
          onPress={() => handlePeriodChange(SEMESTER_GANJIL_SLUG)}
          style={{ marginBottom: 10 }}
        />
        <MenuButton
          text={SEMESTER_GENAP}
          onPress={() => handlePeriodChange(SEMESTER_GENAP_SLUG)}
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
