import { View } from "react-native";
import Svg, { Rect } from "react-native-svg";

type ProgressProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressProps) => {
  const barWidth = 230;
  const progressWidth = (progress / 100) * barWidth;
  return (
    <View style={{ marginVertical: 5 }}>
      <Svg width={barWidth} height={"7"}>
        <Rect
          width={barWidth}
          height={"100%"}
          fill={"#eee"}
          rx={3.5}
          ry={3.5}
        />
        <Rect
          width={progressWidth}
          height={"100%"}
          fill={"#3478F6"}
          rx={3.5}
          ry={3.5}
        />
      </Svg>
    </View>
  );
};

export default ProgressBar;
