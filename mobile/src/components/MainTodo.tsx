import React from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "../styles/theme";
import { TodoList } from "./TodoList";
import { Button } from "../common/Button";
import { ROUTER_KEYS } from "../data/data";

export const MainTodo = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainerCreate}>
        <Button
          label={"Create Todo"}
          onPress={() => {
            navigation.navigate(ROUTER_KEYS.CREATE_TODO);
          }}
        />
      </View>
      <TodoList navigation={navigation} />
    </View>);
};
const styles = StyleSheet.create({
  container: {
    height: Theme.Pixel.px1000,
    backgroundColor: Theme.Colors.bg,
  },

  btnContainerCreate: {
    alignItems: "center",
    paddingTop: Theme.Pixel.px10,
  } });
