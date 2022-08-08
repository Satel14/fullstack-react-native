import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Theme } from "../styles/theme";

export const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Theme.Pixel.px30,
    backgroundColor: Theme.Colors.red,
    alignItems: "center",
    justifyContent: "center",
    width: `${Theme.Pixel.px100}%`,
  },
  text: {
    color: Theme.Colors.white,
    paddingBottom: Theme.Pixel.px10,
    fontSize: Theme.Fonts.fs20,
  },
});
