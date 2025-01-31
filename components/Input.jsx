import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Eye, EyeOff } from "react-native-feather";

export default function Input({
  icon,
  placeholder,
  style,
  secureTextEntry,
  ...res
}) {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <View style={[styles.input, style]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon}
        <TextInput
          placeholder={placeholder}
          style={styles.text}
          secureTextEntry={secureTextEntry && !passwordShown}
          {...res}
        />
      </View>
      {secureTextEntry &&
        (passwordShown ? (
          <EyeOff
            color={"#6D6D6D"}
            onPress={() => setPasswordShown(!passwordShown)}
          />
        ) : (
          <Eye
            color={"#6D6D6D"}
            onPress={() => setPasswordShown(!passwordShown)}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#666666",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 16,
    paddingHorizontal: 20,
    gap: 4,
  },
  text: {
    fontFamily: "Inter",
    width: 150,
    paddingVertical: 8,
  },
});
