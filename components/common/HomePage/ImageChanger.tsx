import React, { useState, useEffect } from "react";
import { Animated, Image, StyleSheet, View, Text } from "react-native";
import FadeIn from "react-native-fade-in-image";
import { Colors } from "../../../constants/Colors";

type ImageChangerProps = {
  images: { src: any }[];
  duration?: number;
};

const ImageChanger = ({ images, duration = 4000 }: ImageChangerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const opacityCurrent = new Animated.Value(1);
  const opacityNext = new Animated.Value(0);

  const nextIndex = (currentIndex + 1) % images.length;

  const changeImage = () => {
    // Reset the opacities
    opacityCurrent.setValue(1);
    opacityNext.setValue(0);

    // Fade out the current image and fade in the next one simultaneously
    Animated.parallel([
      Animated.timing(opacityCurrent, {
        toValue: 0,
        duration: duration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(opacityNext, {
        toValue: 1,
        duration: duration / 2,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(nextIndex);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeImage();
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <FadeIn>
        <Image source={images[nextIndex].src} style={styles.image} />
      </FadeIn>
    </View>
  );
};

export default ImageChanger;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 381,
    borderBottomColor: Colors.yellow,
    borderBottomWidth: 2,
  },

  image: {
    position: "absolute",
    resizeMode: "cover",
    top: 0,
    left: 0,
    width: "100%",
    height: 380,
  },
});
