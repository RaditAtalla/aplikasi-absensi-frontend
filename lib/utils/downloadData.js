import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert, Linking, Platform } from "react-native";

export default async function downloadData() {
  try {
    const permission =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permission.granted) {
      return Alert.alert(
        "Download gaga",
        "Harap beri akses penyimpanan untuk mendownload data"
      );
    }

    const url = "http://10.110.0.54:3000/download-data";
    const fileName = "Data absensi.csv";
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);
    const { uri } = await downloadResumable.downloadAsync();

    if (uri) {
      if (Platform.OS == "android") {
        const fileContent = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const newFileUri =
          await FileSystem.StorageAccessFramework.createFileAsync(
            permission.directoryUri,
            fileName,
            "text/csv"
          );

        await FileSystem.StorageAccessFramework.writeAsStringAsync(
          newFileUri,
          fileContent,
          { encoding: FileSystem.EncodingType.Base64 }
        );

        Alert.alert("Download berhasil");
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
