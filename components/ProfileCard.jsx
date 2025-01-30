import { StyleSheet, View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../lib/context/AuthContext";

export default function ProfileCard({
  profilePicture,
  teacherType,
  status,
  name,
  nisn,
}) {
  const [token, setToken] = useState();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function getToken() {
      setToken(await authContext);
    }

    getToken();
  }, []);

  return (
    <View style={styles.profileBox}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileType}>
          GURU {"\n"}
          {teacherType}
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
          <Text style={styles.profileStatus}>{status}</Text>
        </View>
      </View>
      <View style={styles.profileInfo}>
        <Image source={profilePicture} style={styles.profilePic} />
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
                {name}
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
              NISN: {nisn}
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
