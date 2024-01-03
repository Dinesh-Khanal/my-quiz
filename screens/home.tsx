import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { Aclonica_400Regular } from "@expo-google-fonts/aclonica";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { HomeScreenProps } from "../types";
import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";

const bgImage = require("../assets/images/mt-everest.jpg");

export default function Home({ navigation }: HomeScreenProps) {
  //If you add fontWeight in style then custom font does not work!!
  const [fontsLoaded] = useFonts({
    Aclonica_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bluish }}>
      <LinearGradient
        colors={[COLORS.bluish, COLORS.greenish]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={{ flex: 1 }}
      >
        <Text style={styles.heading}>Nepal Quiz</Text>
        <Image
          source={bgImage}
          style={{ width: "90%", height: 200, alignSelf: "center" }}
        />
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
            marginTop: 16,
          }}
        >
          Select the category
        </Text>
        <View style={styles.main}>
          <Pressable
            style={[styles.btn, { backgroundColor: COLORS.greenish }]}
            onPress={() => navigation.navigate("Quiz", { category: "history" })}
          >
            <FontAwesome name="header" size={24} color="white" />
            <Text style={styles.btnText}>History</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, { backgroundColor: COLORS.brownish }]}
            onPress={() =>
              navigation.navigate("Quiz", { category: "geography" })
            }
          >
            <Entypo name="globe" size={24} color="white" />
            <Text style={styles.btnText}>Geography</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, { backgroundColor: COLORS.lightBulish }]}
            onPress={() =>
              navigation.navigate("Quiz", { category: "cultural" })
            }
          >
            <FontAwesome5 name="place-of-worship" size={24} color="white" />
            <Text style={styles.btnText}>Cultural</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, { backgroundColor: COLORS.yelloish }]}
            onPress={() => navigation.navigate("Quiz", { category: "others" })}
          >
            <FontAwesome5 name="flag-checkered" size={24} color="white" />
            <Text style={styles.btnText}>Others</Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: "#fff",
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          App developed by Dinesh Khanal
        </Text>
        <StatusBar style="light" />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 48,
    marginVertical: 16,
    color: "white",
    fontFamily: "Aclonica_400Regular",
  },
  main: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: "center",
    width: "90%",
    marginTop: 8,
  },
  btn: {
    margin: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32,
    gap: 16,
  },
  btnText: {
    color: "white",
    alignSelf: "center",
    fontSize: 32,
    paddingVertical: 8,
    marginLeft: 12,
  },
});
