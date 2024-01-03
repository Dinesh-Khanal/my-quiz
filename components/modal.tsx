import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
  setShowAnswer: (isShowAnswer: boolean) => void;
  totalScore: number;
  attempted: number;
  totalQuestions: number;
};
export default function ResultModal({
  modalVisible,
  setModalVisible,
  setShowAnswer,
  totalQuestions,
  totalScore,
  attempted,
}: ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={styles.modalText}
          >{`Total Questions: ${totalQuestions}`}</Text>
          <Text
            style={styles.modalText}
          >{`Attemped to answer: ${attempted}`}</Text>
          <Text
            style={styles.modalText}
          >{`Total Correct answer: ${totalScore}`}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setShowAnswer(true);
              setModalVisible(false);
            }}
          >
            <Text style={styles.textStyle}>Show Answers</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "green",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});
