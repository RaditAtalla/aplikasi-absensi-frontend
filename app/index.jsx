import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import { Key, User } from "react-native-feather";
import { router } from "expo-router";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  async function handleLogin() {
    try {
      const login = await axios.post("http://10.110.0.54:3000/login", {
        name: loginData.username,
        password: loginData.password,
      });

      const token = login.data;
      await SecureStore.setItemAsync("jwt", token);

      router.push("/main");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/ypt.png")}
        style={styles.headerLogo}
      />
      <View>
        <Image
          source={require("../assets/images/telkom-schools.png")}
          style={styles.logo}
        />
        <Input
          icon={<User fill={"#6D6D6D"} color={"#6D6D6D"} />}
          placeholder={"Username"}
          style={{ marginBottom: 20 }}
          onChangeText={(username) => setLoginData({ ...loginData, username })}
        />
        <Input
          icon={<Key fill={"#6D6D6D"} color={"#6D6D6D"} />}
          placeholder={"Password"}
          style={{ marginBottom: 40 }}
          secureTextEntry
          onChangeText={(password) => setLoginData({ ...loginData, password })}
        />
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </Pressable>
      </View>
      <Text style={styles.footer}>Yayasan Pendidikan Telkom</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  headerLogo: {
    alignSelf: "flex-start",
    marginTop: 12,
  },
  logo: {
    width: 245,
    objectFit: "contain",
    marginBottom: 60,
  },
  button: {
    backgroundColor: "#B22A2A",
    paddingVertical: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  footer: {
    marginBottom: 56,
    fontFamily: "Alegreya",
  },
});
