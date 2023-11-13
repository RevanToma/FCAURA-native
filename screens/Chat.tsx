import { View, StyleSheet, Keyboard, Text, Platform } from "react-native";
import { Colors } from "../constants/Colors";
import { useCallback, useEffect, useRef, useState } from "react";
import { subscribeToMessages } from "../firebase/firebase.subscribtion";
import { DocumentData } from "firebase/firestore";
import { sendMessage } from "../firebase/firebase.utils";
import { auth } from "../firebase/firebase.auth";
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  MessageProps,
} from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelectors";
import ReplyMessageBar from "../components/chat/replyMessageBar";
import ChatMessageBox from "../components/chat/chatMessageBox";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { MyMessage } from "../types";

const Chat = () => {
  const reduxUser = useSelector(selectUser);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [replyToMessage, setReplyToMessage] = useState<MyMessage | null>(null);

  const swipeAbleRowRef = useRef<Swipeable | null>(null);
  useEffect(() => {
    const unsubscribe = subscribeToMessages((newMessages) => {
      setMessages(newMessages);
    });
    return () => unsubscribe();
  }, []);

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyToMessage &&
        ref.props.children.props.currentMessage?._id === replyToMessage._id
      ) {
        swipeAbleRowRef.current = ref;
      }
    },
    [replyToMessage]
  );

  const handleSend = async (newMessages: DocumentData[]) => {
    if (replyToMessage) {
      newMessages[0].replyMessage = {
        text: replyToMessage.text,
        userName: replyToMessage.user.name,
      };
    }
    const messageToSend = {
      _id: newMessages[0]._id,
      text: newMessages[0].text,
      createdAt: newMessages[0].createdAt,
      user: {
        _id: auth.currentUser?.uid!,
        name: reduxUser?.name,
        avatar: reduxUser?.photoURL,
      },
      replyMessage: replyToMessage
        ? { text: replyToMessage.text, userName: replyToMessage.user.name }
        : null,
    };

    await sendMessage(messageToSend);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [messageToSend])
    );
    setReplyToMessage(null);

    Keyboard.dismiss();
  };

  const clearReplyMessage = () => setReplyToMessage(null);

  const renderCustomInputToolBar = (props: InputToolbarProps<any>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputContainer}
        accessoryStyle={styles.replyBarContainer}
      />
    );
  };
  const renderAccessory = () => {
    if (replyToMessage) {
      return (
        <ReplyMessageBar
          message={replyToMessage}
          clearReply={clearReplyMessage}
        />
      );
    }
  };
  const renderMessageBox = (props: MessageProps<IMessage>) => {
    return (
      <ChatMessageBox
        setReplyOnSwipeOpen={setReplyToMessage}
        {...props}
        updateRowRef={updateRowRef}
      />
    );
  };

  const renderReplyMessageView = (props: BubbleProps<MyMessage>) => {
    if (props.currentMessage && props.currentMessage.replyMessage) {
      return (
        <View style={styles.replyMsgContainer}>
          <Text style={{ color: Colors.yellow, fontWeight: "bold" }}>
            {props.currentMessage.replyMessage.userName}
          </Text>
          <Text style={{ color: "white", marginVertical: 10 }}>
            {props.currentMessage.replyMessage.text}
          </Text>
        </View>
      );
    }
  };
  const renderBubble = (props: BubbleProps<MyMessage>) => {
    return (
      <Bubble
        wrapperStyle={{
          left: {
            backgroundColor: "#283238",
            marginVertical: 3,
          },
          right: {
            marginVertical: 3,
            marginRight: 5,
          },
        }}
        textStyle={{
          left: {
            color: Colors.white,
          },
        }}
        {...props}
      ></Bubble>
    );
  };

  // const renderProfileOnLongPress = (uid: string) => {
  //   console.log(uid);
  //   return <TeamMemberProfileCard uid={uid} />;
  // };
  useEffect(() => {
    if (replyToMessage && swipeAbleRowRef.current) {
      swipeAbleRowRef.current.close();
      swipeAbleRowRef.current = null;
    }
  }, [replyToMessage]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <GiftedChat
        renderUsernameOnMessage
        // onLongPress={(_, message) =>
        //   renderProfileOnLongPress(message.user._id.toString())
        // }
        messages={messages}
        onSend={(messages) => handleSend(messages)}
        user={{
          _id: auth.currentUser?.uid!,
          avatar: reduxUser?.photoURL,
          name: reduxUser?.name,
        }}
        showAvatarForEveryMessage={true}
        renderInputToolbar={renderCustomInputToolBar}
        renderAccessory={renderAccessory}
        renderMessage={renderMessageBox}
        renderCustomView={renderReplyMessageView}
        bottomOffset={Platform.OS === "ios" && !replyToMessage ? 130 : 80}
        renderBubble={renderBubble}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    position_: "relative",
    flexDirection: "column-reverse",
    justifyContent: "center",
  },

  replyBarContainer: {
    height: "auto",
  },
  msgContainer: { flex: 1 },
  replyMsgContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: Colors.yellow,
    borderTopEndRadius: 8,
    borderTopLeftRadius: 8,
    borderBottom: 1,
    backgroundColor: "#283238",
  },

  sendbtn: {
    transform: [{ rotate: "-45deg" }],
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default Chat;
