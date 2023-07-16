import { ToastAndroid } from "react-native";
const showToast = (str) => {
  ToastAndroid.showWithGravityAndOffset(
    str,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};
export default showToast;
