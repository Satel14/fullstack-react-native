import React from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "../styles/theme";
import { Button } from "../common/Button";
import { MyInput } from "../common/MyInput";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { LoginSchemaUser, IUser } from "../types/type.user";
import { useQueryClient } from "react-query";
import { userService } from "../api/api";
import { QUERY_KEYS, ROUTER_KEYS } from "../data/data";
import TokenService from "../service/asyncstorage";
import { Header } from "../components/Header";
export const LoginPage = ({ navigation }: { navigation: any }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
      (data: IUser) => userService.login(data),

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
    validationSchema: LoginSchemaUser,
    initialValues: {
      email: "",
      password: "",
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
      <Header title={"Login"} />
      <View style={styles.loginConteiner}>
        <MyInput
          text={"Email"}
          keyC={"email"}
          value={formik.values.email}
          formik={formik}
          error={formik.errors.email}
          touched={formik.touched.email}
        />
        <View style={styles.input}>
          <MyInput
            text={"Password"}
            keyC={"password"}
            value={formik.values.password}
            formik={formik}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
        </View>

        <View style={styles.btncontainer}>
          <Button label={"Login"} onPress={formik.handleSubmit} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Theme.Pixel.px1000,
    backgroundColor: Theme.Colors.bg,
  },
  btncontainer: {
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
  loginConteiner: {
    alignItems: "center",
    marginTop: Theme.Pixel.px100,
  },
});
