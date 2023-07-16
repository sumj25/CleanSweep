import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import FormButton from "../component/FormButton";
import FormInput from "../component/FormInput";
import showToast from "../component/Toast";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  const register = async () => {
    try {
      if (email === "" || password === "" || phone === "") {
        showToast("Please fill all the details"); // Throw an error if any field is empty
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth, // Assuming you have defined the auth object correctly
        email,
        password
      );
      console.log("user credential", userCredential);
      const user = userCredential.user;
      const myUserUid = user.uid;

      await setDoc(doc(db, "users", myUserUid), {
        email: user.email,
        phone: phone,
      });
    } catch (error) {
      console.log(error);
      showToast(error.message);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image source={require("../../assets/wash.jpeg")} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appNameText}>Clean Sweep</Text>
      </View>
      <View style={styles.space} />
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormInput
        labelValue={phone}
        onChangeText={(userPhone) => setPhone(userPhone)}
        placeholderText="Phone no"
        iconType="phone"
      />
      <View style={styles.space} />
      <FormButton buttonTitle="Sign Up" onPress={register} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20 }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            color: "gray",
            fontWeight: "500",
          }}
        >
          Already have a account? Sign in
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 70,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
    borderRadius: 20,
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  space: {
    width: 20,
    height: 20,
  },
  forgotPassword: {
    marginTop: 16,
  },
  forgotPasswordText: {
    color: "#6C63FF",
    fontSize: 16,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: "#707070",
  },
  appNameText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fd5c63",
  },
});
