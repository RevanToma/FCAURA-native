import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Button,
  Image,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { subscribeToMessages } from "../firebase/firebase.subscribtion";
import { DocumentData } from "firebase/firestore";
import { sendMessage } from "../firebase/firebase.utils";
import { auth } from "../firebase/firebase.auth";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = subscribeToMessages((newMessages) => {
      setMessages(newMessages);
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async (newMessages: DocumentData) => {
    await sendMessage(
      newMessages[0].text,
      user?.uid!,
      user?.photoURL ? user?.photoURL : "../assets/images/avatar.jpg"
    );
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.alternative }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => handleSend(messages)}
        user={{
          _id: user?.uid!,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Chat;
