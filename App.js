import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import StackNavigator from "./src/navigator/StackNavigator";
import Store from "./src/redux/Store";

export default function App() {
  return (
    <Provider store={Store}>
      <StackNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
