import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import ModalCustom from "./ModalCustom";
import MenuButton from "./MenuButton";
import * as Location from "expo-location";
import axios from "axios";
import { useAuth } from "../lib/context/AuthContext";
import getPeriod from "../lib/utils/getPeriod";
import { router } from "expo-router";

export default function AbsenCard() {
  const [isAbsenModalOpen, setIsAbsenModalOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasAbsen, setHasAbsen] = useState(false);
  const { CURRENT_PERIOD, CURRENT_PERIOD_SLUG } = getPeriod();
  const { token } = useAuth();

  async function handleAbsen() {
    const centerLatitude = 3.5229;
    const centerLongitude = 98.6207;

    if (
      location.latitude != centerLatitude &&
      location.longitude != centerLongitude
    ) {
      return Alert.alert("Anda berada di luar lokasi absensi");
    }

    let type = "HADIR";
    if (hasAbsen) type = "PULANG";

    try {
      await axios.post(
        "http://10.0.2.2:3000/",
        {
          latitude: location.latitude,
          longitude: location.longitude,
          period: CURRENT_PERIOD,
          periodSlug: CURRENT_PERIOD_SLUG,
          type,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsAbsenModalOpen(true);

      if (type == "HADIR") {
        setHasAbsen(true);
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  async function handleReload() {
    setIsLoading(true);

    const location = await Location.getCurrentPositionAsync();
    const longitude = location.coords.longitude;
    const latitude = location.coords.latitude;

    setLocation({ longitude: `${longitude}`, latitude: `${latitude}` });
    setIsLoading(false);
  }

  useEffect(() => {
    async function getLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted") {
        return Alert.alert("Harap beri izin lokasi!");
      }

      const location = await Location.getCurrentPositionAsync();
      const longitude = location.coords.longitude;
      const latitude = location.coords.latitude;

      setLocation({ longitude: `${longitude}`, latitude: `${latitude}` });
      setIsLoading(false);
    }

    getLocation();
  }, []);

  useEffect(() => {
    async function getHasAbsen() {
      const response = await axios.get("http://10.0.2.2:3000/has-absen", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const hasAbsen = response.data;
      setHasAbsen(hasAbsen);
    }

    getHasAbsen();
  }, [token]);

  return (
    <>
      <View style={styles.absenBox}>
        <View style={styles.absenHeader}>
          <Text style={styles.absenText}>ABSEN</Text>
        </View>
        <View style={styles.absenInfo}>
          <Text style={styles.absenInfoText}>Your location:</Text>
          <Text style={styles.absenInfoText}>
            Latitude: {isLoading ? "Loading..." : location.latitude}
          </Text>
          <Text style={[styles.absenInfoText, { marginBottom: 5 }]}>
            Longtitude: {isLoading ? "Loading..." : location.longitude}
          </Text>
          <Text style={[styles.absenInfoText, { fontWeight: "700" }]}>
            TUNGGU SAMPAI TOMBOL ABSEN MUNCUL
          </Text>
          <Text style={[styles.absenInfoText, { fontSize: 10 }]}>
            jika lebih dari 10 detik belum muncul, klik tombol reload
          </Text>
          <View style={styles.absenButtonContainer}>
            <Pressable onPress={handleAbsen} style={styles.absenButton}>
              <Text>{hasAbsen ? "PULANG" : "HADIR"}</Text>
            </Pressable>
            <Pressable onPress={handleReload} style={styles.absenButton}>
              <Text>RELOAD</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <ModalCustom
        isModalOpen={isAbsenModalOpen}
        closeAction={() => setIsAbsenModalOpen(!isAbsenModalOpen)}
      >
        <MenuButton
          text={"ABSENSI BERHASIL"}
          onPress={() => setIsAbsenModalOpen(false)}
        />
      </ModalCustom>
    </>
  );
}

const styles = StyleSheet.create({
  absenBox: {
    borderRadius: 10,
    marginTop: 10,
  },
  absenHeader: {
    backgroundColor: "#B22A2A",
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  absenText: {
    color: "white",
    fontFamily: "AlegreyaBold",
    fontSize: 16,
  },
  absenInfo: {
    backgroundColor: "#D65151",
    paddingHorizontal: 27,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#B22A2A",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  absenInfoText: {
    color: "white",
    fontFamily: "AlegreyaMedium",
    fontSize: 12,
  },
  absenButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  absenButton: {
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    paddingHorizontal: 35,
    paddingVertical: 6,
  },
});
