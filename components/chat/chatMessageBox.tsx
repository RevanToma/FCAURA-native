import { StyleSheet, Text, View, Animated } from "react-native";
import React from "react";
import {
  IMessage,
  Message,
  MessageProps,
  isSameDay,
  isSameUser,
} from "react-native-gifted-chat";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type ChatMessageBoxProps = {
  setReplyOnSwipeOpen: (message: IMessage) => void;
  updateRowRef: (ref: any) => void;
} & MessageProps<IMessage>;

const ChatMessageBox: React.FC<ChatMessageBoxProps> = ({
  setReplyOnSwipeOpen,
  updateRowRef,
  ...props
}) => {
  const isNextMyMessage =
    props.currentMessage &&
    props.nextMessage &&
    isSameUser(props.currentMessage, props.nextMessage) &&
    isSameDay(props.currentMessage, props.nextMessage);
  const renderRightAction = (
    progressAnimatedValue: Animated.AnimatedInterpolation<any>
  ) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -12, -20],
    });
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: size }, { translateX: trans }] },

          isNextMyMessage
            ? styles.defaultBottomOffset
            : styles.bottomOffsetNext,
          props.position === "right" && styles.leftOffsetValue,
        ]}
      >
        <View style={styles.replyImageWrapper}>
          <Ionicons name="arrow-undo-sharp" size={35} color="#1A96F2" />
        </View>
      </Animated.View>
    );
  };
  const onSwipeOpenAction = () => {
    if (props.currentMessage) {
      setReplyOnSwipeOpen({ ...props.currentMessage });
    }
  };
  return (
    <Swipeable
      ref={updateRowRef}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightAction}
      onSwipeableOpen={onSwipeOpenAction}
    >
      <Message {...props} />
    </Swipeable>
  );
};

export default ChatMessageBox;

const styles = StyleSheet.create({
  container: {
    width: 40,
  },
  replyImageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultBottomOffset: {
    marginBottom: 2,
  },
  bottomOffsetNext: {
    marginBottom: 10,
  },
  leftOffsetValue: {
    marginLeft: 16,
  },
});
