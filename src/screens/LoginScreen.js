import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormButton from "../component/FormButton";
import FormInput from "../component/FormInput";
import showToast from "../component/Toast";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      if (email !== "" && password !== "") {
        const userCredential = await signInWithEmailAndPassword(
          auth, // Assuming you have defined the auth object correctly
          email,
          password
        );
        console.log("user credential", userCredential);
        const user = userCredential.user;
        console.log("user details", user);
      } else {
        throw new Error("Email and password are required."); // Throw an error if email or password is empty
      }
    } catch (error) {
      console.log(error);
      showToast(error.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text style={{ marginRight: 10 }}>Loading</Text>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <Image
            source={require("../../assets/wash.jpeg")}
            style={styles.logo}
          />
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
          <View style={styles.space} />
          <FormButton buttonTitle="Sign In" onPress={login} />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
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
              Don't have a account? Sign Up
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

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
