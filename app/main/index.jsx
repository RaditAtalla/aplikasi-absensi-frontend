import { StatusBar, StyleSheet, Text, ScrollView } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import AbsenCard from "../../components/AbsenCard";
import HistoryCard from "../../components/HistoryCard";
import getTodayFullDate from "../../lib/utils/getTodayFullDate";

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor={"#B22A2A"} barStyle={"light-content"} />
      <ScrollView style={styles.container}>
        <Text style={styles.date}>{getTodayFullDate()}</Text>
        <ProfileCard
        // name={"Raditya A. Rachmadie"}
        // nisn={"545211210"}
        // profilePicture={require("../../assets/images/radit.png")}
        // teacherType={"PRODUKTIF"}
        // status={"AKTIF MENGAJAR"}
        />
        <AbsenCard
          latitude={"- 0,999102399999"}
          longitude={"- 0,999102399999"}
        />
        <HistoryCard period={"2023/2024-1"} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 12,
    paddingBottom: 24,
  },
  date: {
    textAlign: "right",
    fontWeight: "medium",
    marginBottom: 5,
  },
});
