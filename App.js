import { View, Text } from "react-native";
import ControlPanel from "./ControlPanel";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ControlPanel />
    </View>
  );
}
