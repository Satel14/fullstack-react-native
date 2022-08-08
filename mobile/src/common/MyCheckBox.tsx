import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Theme } from "../styles/theme";
interface ICheckBox {
    label: string;
    value: boolean;
    formik: any;
    status: string;
}

export const MyCheckBox: React.FC<ICheckBox> = ({
  label, value, formik, status }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <BouncyCheckbox
        onPress={formik.handleChange(status)}
        fillColor={Theme.Colors.black}
        isChecked={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Theme.Pixel.px250,
    marginTop: Theme.Pixel.px10,
  },

  label: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: Theme.Pixel.px150,
  },
});
