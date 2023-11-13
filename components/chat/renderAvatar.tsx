import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  AvatarProps,
  GiftedAvatar,
  GiftedChat,
  IMessage,
} from "react-native-gifted-chat";

const renderAvatar = (avatarProps: AvatarProps<IMessage>) => {
  return <GiftedAvatar {...avatarProps} avatarStyle={styles.avatarStyle} />;
};

export default renderAvatar;

const styles = StyleSheet.create({
  avatarStyle: { width: 40, height: 40, borderRadius: 20 },
});
