import React, { useState, useEffect } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const TruckIcon = () => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width, -350],
  });

  const rotateZ = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['1deg', '7deg', '-3deg'],
  });

  return (
    <Animated.View style={{ transform: [{ translateX }, { rotateZ }] }}>
      <MaterialCommunityIcons
        name="truck-fast"
        size={250}
        color="#F82D2D"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </Animated.View>
  );
};

export default TruckIcon;
