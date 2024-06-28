import { View, Text, StyleSheet, Modal } from "react-native";
import { FunctionComponent, useState } from "react";
import { PressableText } from "./PressableText";

type ModalProps = {
  activator?: FunctionComponent<{
    handleOpen: () => void;
  }>;
  // children: React.ReactNode;
  children: FunctionComponent<{
    handleOpen: () => void;
    handleClose: () => void;
  }>;
};

// rename activator prop to Activator to match the tsx functional component convention
// export function ModalDetail({ activator: Activator }: any) {
export function ModalDetail({ activator: Activator, children }: ModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  // additional functionality to open & close the modal
  const handleOpen = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);

  return (
    <View>
      <Modal visible={isModalVisible} transparent={false} animationType="none">
        <View style={styles.centerView}>
          {/* <View style={styles.contentView}>{children}</View> */}
          <View style={styles.contentView}>
            {children({ handleOpen, handleClose })}
          </View>
          {/* <PressableText onPress={() => setModalVisible(false)} text="Close" /> */}
          <PressableText onPress={handleClose} text="Close" />
        </View>
      </Modal>
      {Activator ? (
        // <Activator handleOpen={() => setModalVisible(true)} />
        <Activator handleOpen={handleOpen} />
      ) : (
        <PressableText
          // onPress={() => setModalVisible(true)}
          onPress={handleOpen}
          text="Open [Default]"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    marginBottom: 20,
  },
});
