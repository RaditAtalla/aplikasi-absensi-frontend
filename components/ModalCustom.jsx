import { StyleSheet, Modal, View, Pressable } from "react-native";

export default function ModalCustom({ children, isModalOpen, closeAction }) {
  return (
    <Modal visible={isModalOpen} animationType="fade" transparent>
      <Pressable onPress={closeAction} style={styles.modalContainer}>
        <View style={styles.modalContent}>{children}</View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
