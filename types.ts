import type { NativeStackScreenProps } from "@react-navigation/native-stack";
export type RootStackParamList = {
  Home: undefined;
  Quiz: { category: string };
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
export type QuizScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Quiz"
>;
export type Question = {
  question: string;
  Options: string[];
  correct: number;
  marked: number;
  category: string;
};
