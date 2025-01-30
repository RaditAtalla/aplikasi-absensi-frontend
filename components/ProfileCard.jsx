import { StyleSheet, View, Text, Image } from "react-native";
import { useAuth } from "../lib/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileCard() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function getUser() {
      const response = await axios.get("http://10.110.0.54:3000/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = response.data;
      setUser(user);
      setIsLoading(false);
    }

    getUser();
  }, [token]);

  return (
    <View style={styles.profileBox}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileType}>
          {isLoading ? "Loading..." : `Guru \n${user.tipeGuru}`}
        </Text>
        <View>
          <Text
            style={[
              styles.profileType,
              { fontSize: 12, textAlign: "right", marginBottom: 6 },
            ]}
          >
            STATUS
          </Text>
          <Text style={styles.profileStatus}>
            {isLoading ? "Loading..." : user.status}
          </Text>
        </View>
      </View>
      <View style={styles.profileInfo}>
        <Image
          source={require(`../assets/images/radit.png`)}
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
                {isLoading ? "Loading..." : user.nama}
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
              NISN: {isLoading ? "Loading..." : user.nisn}
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
