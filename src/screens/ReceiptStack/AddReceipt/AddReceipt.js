import { View, Text } from "react-native";
import React from "react";
import { useCameraDevice } from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera-text-recognition";
const AddReceipt = () => {
  const [data, setData] = useState(null);
  const device = useCameraDevice("back");
  console.log(data);
  return (
    <View>
      <>
        {!!device && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive
            options={{
              language: "latin",
            }}
            mode={"recognize"}
            callback={(d) => setData(d)}
          />
        )}
      </>
    </View>
  );
};

export default AddReceipt;
