import { StyleSheet, Pressable, Text } from "react-native";

export default function MenuButton({ text, onPress, style }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.buttonInModal, style]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonInModal: {
    backgroundColor: "#B22A2A",
    borderRadius: 15,
    color: "white",
    paddingVertical: 24,
    paddingHorizontal: 30,
  },
});
