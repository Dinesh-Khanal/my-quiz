import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

type OptionProps = {
  item: string;
  idx: number;
  marked: number;
  correct: number;
  onPress: () => void;
  showAnswer: boolean;
};
export default function Option({
  item,
  idx,
  marked,
  correct,
  onPress,
  showAnswer,
}: OptionProps) {
  return (
    <View style={styles.item}>
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor:
            showAnswer && correct === idx + 1 ? "green" : COLORS.yelloish,
          borderRadius: 12,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 16,
            padding: 8,
            backgroundColor: marked == idx ? "black" : "white",
          }}
        >
          <Text style={{ color: marked == idx ? "white" : "black" }}>
            {idx === 0 ? "A" : idx === 1 ? "B" : idx === 2 ? "C" : "D"}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginLeft: 16,
            color: "white",
          }}
        >
          {item}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBlockColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
