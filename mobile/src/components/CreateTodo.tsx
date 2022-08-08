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

export const CreateTodo = ({ navigation }: { navigation: any }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
      async (data: ITodo) => todoService.addTodo(data),

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

  const formik = useFormik({
    validationSchema: TodoSchema,
    initialValues: {
      title: "",
      description: "",
      year: "",
      completed: false,
      ispublic: false,
    },
    onSubmit: (formik) => {
      const data = {
        completed: formik.completed,
        ispublic: formik.ispublic,
        title: formik.title,
        description: formik.description,
        year: formik.year,
      };
      mutation.mutate(data);
    },
  });
  return (
    <View style={styles.continer}>
      <MyInput
        text={"Title"}
        keyC={"title"}
        formik={formik}
        error={formik.errors.title}
        value={formik.values.title}
        touched={formik.touched.title}
      />
      <MyArea
        text={"Description"}
        keyC={"description"}
        formik={formik}
        value={formik.values.description}
        error={formik.errors.description}
        touched={formik.touched.description}
      />
      <View style={styles.input}>
        <MyInput
          text={"Year"}
          keyC={"year"}
          formik={formik}
          value={formik.values.year}
          error={formik.errors.year}
          touched={formik.touched.year}
        />
      </View>
      <View style={styles.container}>
        <MyCheckBox
          label={"Complited"}
          value={formik.values.completed}
          formik={formik}
          status={"completed"}
        />
        <MyCheckBox
          label={"Private"}
          value={formik.values.ispublic}
          formik={formik}
          status={"publick"}
        />
      </View>
      <View style={styles.btn}>
        <Button label={"Create"} onPress={formik.handleSubmit} />
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
