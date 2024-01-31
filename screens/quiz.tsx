import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { questionData } from "../assets/data/questions";
import { useState, useRef, useEffect } from "react";
import QuestionItem from "../components/questionItem";
import ResultModal from "../components/modal";
import { QuizScreenProps, Question } from "../types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getRandom } from "../utils/getRandom";

export default function Quiz({ route, navigation }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [totalScore, setTocalScore] = useState(0);
  const [attemped, setAttemped] = useState(0);
  const listRef = useRef<FlatList>(null);
  const [data, setData] = useState<Question[]>([]);
  const { category } = route.params;

  useEffect(() => {
    let qdata;
    if (category !== "all") {
      qdata = questionData.filter((q) => q.category == category);
    } else {
      qdata = questionData;
    }
    setData(getRandom(qdata, 20));
  }, []);
  const markItem = (idx: number, x: number) => {
    const markedData = data.map((item) =>
      item === data[idx] ? { ...item, marked: x } : item
    );
    setData(markedData);
  };
  const moveToStart = () => {
    listRef.current?.scrollToIndex({
      animated: true,
      index: 0,
    });
  };
  const reset = () => {
    const resetData = data.map((item) => ({ ...item, marked: -1 }));
    setData(resetData);
    setShowAnswer(false);
    moveToStart();
  };
  const getResult = () => {
    const score = data.reduce(
      (a, i) => (i.marked + 1 === i.correct ? a + 1 : a),
      0
    );
    setTocalScore(score);
    const attempt = data.reduce((a, i) => (i.marked !== -1 ? a + 1 : a), 0);
    setAttemped(attempt);
  };
  const onSubmit = () => {
    getResult();
    setVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 32,
          marginBottom: 16,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.lightBulish,
              fontWeight: "500",
            }}
          >
            Home
          </Text>
        </Pressable>
        <Text
          style={{
            fontSize: 18,
            color: "white",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {`${category} (${data.length})`}
        </Text>
        <Pressable onPress={reset}>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.lightBulish,
              fontWeight: "500",
            }}
          >
            Reset
          </Text>
        </Pressable>
      </View>
      <FlatList
        ref={listRef}
        data={data}
        renderItem={({ item, index }) => (
          <QuestionItem
            data={item}
            showAnswer={showAnswer}
            num={index + 1}
            onPress={(x) => markItem(index, x)}
          />
        )}
        onScroll={(e) => {
          const x = Math.round(e.nativeEvent.contentOffset.x / wp(100));
          setCurrentIndex(x);
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 24,
          width: "100%",
        }}
      >
        <Pressable
          onPress={() => {
            if (currentIndex > 0) {
              listRef.current?.scrollToIndex({
                animated: true,
                index: currentIndex - 1,
              });
            }
          }}
          style={[
            styles.btn,
            { backgroundColor: currentIndex > 0 ? "purple" : "#ccc" },
          ]}
        >
          <Text style={styles.btnTxt}>Previous</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (currentIndex < data.length - 1) {
              listRef.current?.scrollToIndex({
                animated: true,
                index: currentIndex + 1,
              });
            } else {
              if (!showAnswer) {
                onSubmit();
              }
            }
          }}
          style={[
            styles.btn,
            {
              backgroundColor:
                currentIndex < data.length - 1
                  ? "purple"
                  : showAnswer && currentIndex == data.length - 1
                  ? "#ccc"
                  : "#995522",
            },
          ]}
        >
          <Text style={styles.btnTxt}>
            {currentIndex < data.length - 1 ? "Next" : "Submit"}
          </Text>
        </Pressable>
      </View>
      <ResultModal
        modalVisible={visible}
        setModalVisible={setVisible}
        setShowAnswer={setShowAnswer}
        moveToStart={moveToStart}
        totalScore={totalScore}
        attempted={attemped}
        totalQuestions={data.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bluish,
    alignItems: "center",
    paddingTop: 24,
  },
  btn: {
    padding: 12,
    borderRadius: 6,
    width: "30%",
  },
  btnTxt: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});
