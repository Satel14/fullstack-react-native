import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Textarea from "react-native-textarea";
import { Theme } from "../styles/theme";

interface ITextInput {
    text: string;
    formik: any;
    keyC: string;
    value: string;
    error: string | string[] | FormikErrors<any> | FormikErrors<any>[]
    | undefined;
    touched: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
}

export const MyArea: React.FC<ITextInput> = ({
  text,
  formik,
  value,
  keyC,
  error,
  touched,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textCont}>
        <Text style={styles.text}> {text}</Text>
        {touched && error ? (
                    <Text>{}</Text>
                ) : null}
      </View>

      <Textarea
        containerStyle={styles.textareaContainer}
        onChangeText={formik.handleChange(keyC)}
        onBlur={formik.handleBlur(keyC)}
        style={styles.textarea}
        value={value}
        maxLength={Theme.Pixel.px100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    height: Theme.Pixel.px30,
    marginTop: Theme.Pixel.px100,
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
  textareaContainer: {
    borderWidth: Theme.Pixel.px2,
    height: Theme.Size.size100,
    width: Theme.Pixel.px250,
    padding: Theme.Pixel.px10,
  },
  textarea: {
    textAlignVertical: "top",
    height: Theme.Size.size150,
    fontSize: Theme.Size.size15,
  },
});
