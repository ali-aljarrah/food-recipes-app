import { View, Text, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ringOnePadding = useSharedValue(0);
  const ringTwoPadding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ringOnePadding.value = 0;
    ringTwoPadding.value = 0;
    setTimeout(
      () => (ringOnePadding.value = withSpring(ringTwoPadding.value + hp(5))),
      200
    );
    setTimeout(
      () => (ringTwoPadding.value = withSpring(ringTwoPadding.value + hp(5.5))),
      300
    );

    setTimeout(() => navigation.navigate("Home"),2500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.View style={[styles.firstRing, { padding: ringOnePadding }]}>
        <Animated.View style={[styles.secondRing, { padding: ringTwoPadding }]}>
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20),zIndex: 3 }}
          />
        </Animated.View>
      </Animated.View>

      <View style={styles.textWrapper}>
        <Text style={styles.title}>Foody</Text>
        <Text style={styles.subTitle}>Food is always right</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f59e0b",
  },
  firstRing: {
    backgroundColor: "#ffffff80",
    borderRadius: 9999,
  },
  secondRing: {
    backgroundColor: "#ffffff33",
    borderRadius: 9999,
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(7),
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: wp(1),
  },
  subTitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#ffffff",
    letterSpacing: wp(1),
  },
});
