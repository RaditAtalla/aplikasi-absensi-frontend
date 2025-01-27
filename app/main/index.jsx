import { StatusBar, StyleSheet, Text, ScrollView } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import AbsenCard from "../../components/AbsenCard";
import HistoryCard from "../../components/HistoryCard";

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor={"#B22A2A"} barStyle={"light-content"} />
      <ScrollView style={styles.container}>
        <Text style={styles.date}>27 Januari 2025</Text>
        <ProfileCard />
        <AbsenCard />
        <HistoryCard />
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
