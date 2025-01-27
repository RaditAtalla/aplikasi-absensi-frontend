import { StyleSheet, View, Text, Image } from "react-native";

export default function ProfileCard() {
  return (
    <View style={styles.profileBox}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileType}>GURU {"\n"}PRODUKTIF</Text>
        <View>
          <Text
            style={[
              styles.profileType,
              { fontSize: 12, textAlign: "right", marginBottom: 6 },
            ]}
          >
            STATUS
          </Text>
          <Text style={styles.profileStatus}>AKTIF MENGAJAR</Text>
        </View>
      </View>
      <View style={styles.profileInfo}>
        <Image
          source={require("../assets/images/profile.png")}
          style={styles.profilePic}
        />
        <View style={{ justifyContent: "center", gap: 8 }}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                numberOfLines={2}
                style={{
                  color: "white",
                  fontFamily: "Inter",
                  fontWeight: "Bold",
                  fontSize: 15,
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                Rizky Prayuda F. S.Kom
              </Text>
            </View>
            <Text
              style={{
                color: "white",
                fontFamily: "Inter",
                fontWeight: "Bold",
                fontSize: 15,
              }}
            >
              NISN: 545211210
            </Text>
          </View>
          <Text style={{ color: "white", fontFamily: "Inter", fontSize: 10 }}>
            SMK TELKOM 1 MEDAN
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileBox: {
    backgroundColor: "#B22A2A",
    color: "white",
    borderRadius: 10,
    padding: 25,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  profileType: {
    color: "white",
    flexWrap: "wrap",
    fontWeight: "bold",
    fontSize: 14,
  },
  profileStatus: {
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "white",
    fontSize: 10,
  },
  profileInfo: {
    flexDirection: "row",
    gap: 22,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
