import React from "react";
import { Image } from "react-native";
import IconButton from "../../components/common/Buttons/IconButton";
type Props = {
  uri: string;
  style: {};
  iconSize: number;
  iconColor: string;
};

const ImageWithFallback: React.FC<Props> = ({
  uri,
  style,
  iconSize,
  iconColor,
}) => {
  if (uri) {
    return <Image source={{ uri }} style={style} />;
  }
  return (
    <IconButton icon="football-outline" size={iconSize} color={iconColor} />
  );
};

export default ImageWithFallback;
