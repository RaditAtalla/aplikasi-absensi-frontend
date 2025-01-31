import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import "react-native-reanimated";
import { File, Home, LogOut, Menu } from "react-native-feather";
import { Image, StyleSheet, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";
import { useAuth } from "../../lib/context/AuthContext";
import useUser from "../../lib/hooks/useUser";
import downloadData from "../../lib/utils/downloadData";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{ header: (props) => <CustomHeader {...props} /> }}
      />
    </GestureHandlerRootView>
  );
}

function CustomDrawer(props) {
  const [user, isLoading] = useUser();
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView style={drawerStyles.drawer} {...props}>
      <View style={drawerStyles.profileContainer}>
        <Image
          source={require("../../assets/images/blank-profile.png")}
          style={drawerStyles.profilePic}
        />
        <View style={{ justifyContent: "space-between" }}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "white",
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                {isLoading ? "Loading..." : user.nama}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "bold",
                fontSize: 14,
                color: "white",
              }}
            >
              NISN: {isLoading ? "Loading..." : user.nisn}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: "semibold",
              fontSize: 12,
              color: "white",
            }}
          >
            SMK Telkom 1 Medan
          </Text>
        </View>
      </View>

      <View style={drawerStyles.line} />
      <View style={drawerStyles.line} />

      <DrawerItem
        onPress={() => router.replace("main")}
        icon={() => <Home color={"white"} />}
        label={"HOME"}
        labelStyle={drawerStyles.label}
      />
      {user.email == "admin@mail.com" && (
        <DrawerItem
          onPress={downloadData}
          icon={() => <File color={"white"} />}
          label={"DOWNLOAD DATA"}
          labelStyle={drawerStyles.label}
        />
      )}
      <DrawerItem
        onPress={logout}
        icon={() => <LogOut color={"white"} />}
        label={"LOGOUT"}
        labelStyle={drawerStyles.label}
      />
    </DrawerContentScrollView>
  );
}

function CustomHeader(props) {
  return (
    <View style={headerStyles.header}>
      <Menu
        onPress={() => props.navigation.toggleDrawer()}
        color={"white"}
        style={headerStyles.hamburger}
      />
      <Image
        source={require("../../assets/images/telkom-schools-white.png")}
        style={headerStyles.image}
      />
    </View>
  );
}

const drawerStyles = StyleSheet.create({
  drawer: {
    backgroundColor: "#CE4C4C",
  },
  profileContainer: {
    flexDirection: "row",
    gap: 15,
    paddingTop: 61,
    paddingHorizontal: 15,
    marginBottom: 28,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  line: {
    backgroundColor: "white",
    height: 1,
    width: "100%",
    marginBottom: 3,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
});

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: "#B22A2A",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 81,
    objectFit: "contain",
  },
  hamburger: {
    position: "absolute",
    left: 29,
    alignSelf: "center",
  },
});
