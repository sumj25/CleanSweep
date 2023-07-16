import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {user.email}</Text>

      <Pressable style={styles.button} onPress={signOutUser}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    marginVertical: 10,
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#088F8F",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginLeft: 5,
  },
});

export default ProfileScreen;
