import React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { Theme } from "../styles/theme";
import { FormikErrors, FormikTouched } from "formik";

interface ITextInput {
    text: string;
    keyC: string;
    value: string;
    error: string | FormikErrors<any> | FormikErrors<any>[] | string[]
    | undefined;
    formik: any;
    touched: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
}

export const MyInput: React.FC<ITextInput> = ({
  text,
  value,
  keyC,
  touched,
  error,
  formik,
}) => {
  return (
    <View style={styles.continer}>
      <View style={styles.textCont}>
        <Text style={styles.text}> {text}</Text>
        {touched && error ? (
                    <Text>{}</Text>
                ) : null}
      </View>

      <TextInput
        onChangeText={formik.handleChange(keyC)}
        onBlur={formik.handleBlur(keyC)}
        style={styles.input}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    flexDirection: "column",
    alignItems: "center",
    height: Theme.Pixel.px30,
  },
  textCont: {
    flexDirection: "row",
    width: Theme.Pixel.px250,
    alignItems: "center",
  },

  text: {
    fontSize: Theme.Fonts.fs20,
    marginRight: Theme.Pixel.px10,
  },
  input: {
    width: Theme.Pixel.px250,
    borderStyle: "solid",
    borderWidth: Theme.Pixel.px2,
    borderColor: Theme.Colors.black,
    padding: Theme.Pixel.px10,
    height: Theme.Pixel.px30,
  },
});
