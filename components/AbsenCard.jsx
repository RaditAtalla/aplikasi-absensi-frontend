import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import ModalCustom from "./ModalCustom";
import MenuButton from "./MenuButton";

export default function AbsenCard({ latitude, longitude }) {
  const [isAbsenModalOpen, setIsAbsenModalOpen] = useState(false);

  function handleAbsen() {
    setIsAbsenModalOpen(true);
  }

  return (
    <>
      <View style={styles.absenBox}>
        <View style={styles.absenHeader}>
          <Text style={styles.absenText}>ABSEN</Text>
        </View>
        <View style={styles.absenInfo}>
          <Text style={styles.absenInfoText}>Your location:</Text>
          <Text style={styles.absenInfoText}>Latitude: {latitude}</Text>
          <Text style={[styles.absenInfoText, { marginBottom: 5 }]}>
            Longtitude: {longitude}
          </Text>
          <Text style={[styles.absenInfoText, { fontWeight: "700" }]}>
            TUNGGU SAMPAI TOMBOL ABSEN MUNCUL
          </Text>
          <Text style={[styles.absenInfoText, { fontSize: 10 }]}>
            jika lebih dari 10 detik belum muncul, klik tombol reload
          </Text>
          <View style={styles.absenButtonContainer}>
            <Pressable onPress={handleAbsen} style={styles.absenButton}>
              <Text>HADIR</Text>
            </Pressable>
            <Pressable style={styles.absenButton}>
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
          onPress={() => setIsAbsenModalOpen(!isAbsenModalOpen)}
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
