import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Theme } from "../styles/theme";
import { Button } from "../common/Button";
import { QUERY_KEYS, ROUTER_KEYS } from "../data/data";
import { useMutation, useQueryClient } from "react-query";
import { todoService } from "../api/api";

interface IProps {
    _id: string;
    title: string;
    description: string;
    year: number;
    ispublic: boolean;
    completed: boolean;
    navigation: any;
}

export const Todo: React.FC<IProps> = ({
  _id, title, description, year, completed, ispublic, navigation }) => {
  const data = { _id, title, description, year, completed, ispublic };
  const queryClient = useQueryClient();
  const mutation = useMutation(
      async (id: string) => todoService.deleteTodo(id),

      {
        onSuccess: () => {
          queryClient.invalidateQueries(QUERY_KEYS.TODOS);
        },
        onError: (error: any) => {
          console.log(error);
        },
      });
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{year}</Text>
        </View>
        <View style={styles.description}>
          <Text>{description}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            {completed ? "Completed" : "Not completed"}
          </Text>
          <Text style={styles.title}>
            {ispublic ? "Public" : "Private"}
          </Text>
        </View>
      </View>
      <View>
        <Button
          label={"Edit"}
          onPress={() => {
            navigation.navigate(ROUTER_KEYS.EDIT_TODO, {
              updateData: data,
            });
          }}
        />
        <View style={styles.btnDel}>
          <Button
            label={"Delete"}
            onPress={() => mutation.mutate(data._id)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.Pixel.px10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    flexDirection: "row",
  },
  description: {
    width: Theme.Pixel.px250,
  },
  title: {
    fontSize: Theme.Fonts.fs20,
    marginRight: Theme.Pixel.px10,
  },
  btnDel: {
    marginTop: Theme.Pixel.px10,
  },
});
