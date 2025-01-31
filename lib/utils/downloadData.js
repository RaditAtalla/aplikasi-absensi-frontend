import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert, Linking, Platform } from "react-native";

export default async function downloadData() {
  try {
    const url = "http://10.110.0.54:3000/download-data";
    const fileName = "Data absensi.csv";
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);
    const { uri } = await downloadResumable.downloadAsync();

    if (uri) {
      Alert.alert("Download berhasil");
      if (Platform.OS == "android") {
        const newUri = `/storage/emulated/0/Download/${fileName}`;
        await FileSystem.moveAsync({ from: uri, to: newUri });

        Linking.openURL(newUri);
      } else {
        Sharing.shareAsync(uri);
      }
    } else {
      Alert.alert("Error", "Download failed");
    }
  } catch (error) {
    console.error(error.message);
    Alert.alert("Error", "Something went wrong");
  }
}
