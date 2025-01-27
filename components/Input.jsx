import { StyleSheet, TextInput, View } from "react-native";

export default function Input({ icon, placeholder, style, ...res }) {
  return (
    <View style={[styles.input, style]}>
      {icon}
      <TextInput placeholder={placeholder} style={styles.text} {...res} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#666666",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 16,
    paddingHorizontal: 20,
    gap: 4,
  },
  text: {
    fontFamily: "Inter",
  },
});
