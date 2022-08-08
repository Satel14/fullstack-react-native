import React from "react";
import { StyleSheet, View } from "react-native";
import { MyInput } from "../common/MyInput";
import { Theme } from "../styles/theme";
import { MyArea } from "../common/MyArea";
import { MyCheckBox } from "../common/MyCheckBox";
import { Button } from "../common/Button";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { QUERY_KEYS, ROUTER_KEYS } from "../data/data";
import { todoService } from "../api/api";
import { useQueryClient } from "react-query";
import { ITodo, TodoSchema } from "../types/type.todo";

export const EditTodo = ({ navigation, route } :
    { navigation: any; route: any }) => {
  const queryClient = useQueryClient();
  const { updateData } = route.params;
  const mutation = useMutation(
      async (data: ITodo) => todoService.updateTodo(updateData._id, data),

      {
        onSuccess: () => {
          navigation.navigate(ROUTER_KEYS.MAIN_PAGE);
          queryClient.invalidateQueries(QUERY_KEYS.TODOS);
        },
        onError: (error: any) => {
          console.log(error);
        },
      },
  );

  const values = useFormik({
    validationSchema: TodoSchema,
    initialValues: updateData,

    onSubmit: (values) => {
      const data = {
        completed: values.completed,
        publick: values.publick,
        title: values.title,
        description: values.description,
        year: values.year,
      };
      mutation.mutate(data);
    },
  });

  return (
    <View style={styles.continer}>
      <MyInput
        text={"Title"}
        formik={values}
        keyC={"title"}
        value={values.values.title}
        error={values.errors.title}
        touched={values.touched.title}
      />
      <MyArea
        text={"Description"}
        formik={values}
        keyC={"description"}
        value={values.values.description}
        error={values.errors.description}
        touched={values.touched.description}
      />
      <View style={styles.input}>
        <MyInput
          text={"Year"}
          formik={values}
          keyC={"year"}
          value={values.values.year}
          error={values.errors.year}
          touched={values.touched.year}
        />
      </View>
      <View style={styles.container}>
        <MyCheckBox
          label={"Complited"}
          value={values.values.completed}
          formik={values}
          status={"completed"}
        />
        <MyCheckBox
          label={"Private"}
          value={values.values.publick}
          formik={values}
          status={"publick"}
        />
      </View>
      <View style={styles.btn}>
        <Button label={"Edit"} onPress={values.handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    height: Theme.Pixel.px1000,
    backgroundColor: Theme.Colors.bg,
  },
  container: {
    marginTop: Theme.Pixel.px30,
    justifyConten: "center",
    alignItems: "center",
  },
  btn: {
    alignItems: "center",
    marginTop: Theme.Pixel.px30,
  },
  input: {
    marginTop: Theme.Pixel.px150,
  },
});
