import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Option from "./option";

export const deviceWidth = Dimensions.get("window").width;

type Question = {
  question: string;
  Options: string[];
  correct: number;
  marked: number;
};
type ItemProps = {
  data: Question;
  num: number;
  onPress: (idx: number) => void;
  showAnswer: boolean;
};
export default function QuestionItem({
  data,
  num,
  onPress,
  showAnswer,
}: ItemProps) {
  //const [selectedIndex, setSelectedIndex] = useState<number>();
  const selectItem = (idx: number) => {
    //setSelectedIndex(idx);
    onPress(idx);
  };
  return (
    <View
      style={{
        width: deviceWidth,
        paddingHorizontal: 14,
        paddingVertical: 8,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginBottom: 8,
          color: "white",
          paddingHorizontal: 16,
        }}
      >{`Q.No ${num}: ${data.question}`}</Text>
      <FlatList
        data={data.Options}
        renderItem={({ item, index }) => (
          <Option
            item={item}
            idx={index}
            marked={data.marked}
            showAnswer={showAnswer}
            correct={data.correct}
            onPress={() => selectItem(index)}
          />
        )}
      />
    </View>
  );
}
