import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import { Key, User } from "react-native-feather";
import { router } from "expo-router";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../lib/context/AuthContext";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const { login } = useAuth();

  async function handleLogin() {
    setError("");
    if (!loginData.email || !loginData.password) {
      return setError("Harap isi seluruh kolom");
    }

    try {
      const response = await axios.post("http://10.0.2.2:3000/login", {
        email: loginData.email,
        password: loginData.password,
      });

      const token = response.data;
      login(token);
      router.push("/main");
    } catch (error) {
      console.log(error.message);
      if (error.response.status == 404) return setError("Nama tidak ditemukan");
      if (error.response.status == 401) return setError("Password salah");
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
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <Input
          icon={<User fill={"#6D6D6D"} color={"#6D6D6D"} />}
          placeholder={"Email"}
          style={{ marginBottom: 20 }}
          onChangeText={(email) => setLoginData({ ...loginData, email })}
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
