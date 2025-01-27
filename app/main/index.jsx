import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import ProfileCard from "../../components/ProfileCard";

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor={"#B22A2A"} barStyle={"light-content"} />
      <View style={styles.container}>
        <Text style={styles.date}>27 Januari 2025</Text>
        <ProfileCard />
      </View>
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
