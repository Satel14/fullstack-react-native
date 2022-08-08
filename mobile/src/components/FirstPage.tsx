import React from "react";
import { StyleSheet, View } from "react-native";
import { ROUTER_KEYS } from "../data/data";
import { Theme } from "../styles/theme";
import { Button } from "../common/Button";

export const FirstPage = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button
          label={"Login"}
          onPress={() => {
            navigation.navigate(ROUTER_KEYS.LOGIN);
          }}
        />
      </View>
      <Button
        label={"Register"}
        onPress={() => {
          navigation.navigate(ROUTER_KEYS.REGISTER);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Theme.Pixel.px1000,
    backgroundColor: Theme.Colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    marginBottom: Theme.Pixel.px30,
  },
});
