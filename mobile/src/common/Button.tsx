import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Theme } from "../styles/theme";

type IButton = {
    label: string;
    onPress: () => void;
};
export const Button: React.FC<IButton> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={onPress}
    >
      <Text style={styles.title}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: Theme.Size.size5,
    height: Theme.Size.size50,
    width: Theme.Size.size245,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.Colors.blue90,
  },
  title: {
    fontSize: Theme.Size.size15,
    color: Theme.Colors.white,
    textTransform: "uppercase",
  },
});
