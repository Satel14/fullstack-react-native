import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "react-query";
import { Todo } from "./Todo";
import { todoService } from "../api/api";
import { QUERY_KEYS } from "../data/data";

interface ITodoSet {
    _id: string;
    title: string;
    description: string;
    year: number;
    ispublic: boolean;
    completed: boolean;
}

export const TodoList = ({ navigation }: { navigation: any }) => {
  const { data, isLoading, isSuccess, refetch } = useQuery(QUERY_KEYS.TODOS,
      async () => todoService.getTodos());

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  if (!isSuccess) return <Text>Error</Text>;

  const renderItem = ({ item }: { item: ITodoSet }) => (
    <Todo
      _id={item._id}
      title={item.title}
      year={item.year}
      description={item.description}
      completed={item.completed}
      ispublic={item.ispublic}
      navigation={navigation}
    />
  );
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};
