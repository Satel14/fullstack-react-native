import React from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "../styles/theme";
import { Button } from "../common/Button";
import { MyInput } from "../common/MyInput";
import { Header } from "./Header";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { SignUpSchemaUser, IUser } from "../types/type.user";
import { useQueryClient } from "react-query";
import { userService } from "../api/api";
import { ROUTER_KEYS, QUERY_KEYS } from "../data/data";
import TokenService from "../service/asyncstorage";

export const RegisterPage = ({ navigation }: { navigation: any }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
      async (data: IUser) => userService.register(data),

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
    validationSchema: SignUpSchemaUser,
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    onSubmit: async (formik) => {
      const dataUser = {
        email: formik.email,
        password: formik.password,
      };

      const { data } = await mutation.mutateAsync(dataUser);
      await TokenService.setToken(data);
    },
  });

  return (
    <View style={styles.container}>
      <Header title={"Register"} />
      <View style={styles.registrationConteiner}>
        <MyInput
          text={"Email"}
          keyC={"email"}
          value={formik.values.email}
          formik={formik}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        <View style={styles.inputConteiner}>
          <MyInput
            text={"Password"}
            keyC={"password"}
            value={formik.values.password}
            formik={formik}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
        </View>
        <View style={styles.inputConteiner}>
          <MyInput
            keyC={"confirmpassword"}
            text={"Verify password"}
            value={formik.values.confirmpassword}
            formik={formik}
            error={formik.errors.confirmpassword}
            touched={formik.touched.confirmpassword}
          />
        </View>
        <View style={styles.btnConteiner}>
          <Button
            label={"Registration"}
            onPress={formik.handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Theme.Pixel.px1000,
    backgroundColor: Theme.Colors.bg,
    alignItems: "center",
  },
  registrationConteiner: {
    alignItems: "center",
    marginTop: Theme.Pixel.px100,
  },
  inputConteiner: {
    marginTop: Theme.Pixel.px30,
  },
  btnConteiner: {
    marginTop: Theme.Pixel.px30,
  },
});
