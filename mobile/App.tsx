import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTER_KEYS } from "../mobile/src/data/data";
import { CreateTodo } from "./src/components/CreateTodo";
import { EditTodo } from "./src/components/EditTodo";
import { MainTodo } from "./src/components/MainTodo";
import { LoginPage } from "./src/components/LoginPage";
import { RegisterPage } from "./src/components/RegisterPage";
import { FirstPage } from "./src/components/FirstPage";
export default function App() {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator initialRouteName={ROUTER_KEYS.FIRST_PAGE}>
          <Stack.Screen
            name={ROUTER_KEYS.FIRST_PAGE}
            component={FirstPage}
          />
          <Stack.Screen
            name={ROUTER_KEYS.LOGIN}
            component={LoginPage}
          />
          <Stack.Screen
            name={ROUTER_KEYS.REGISTER}
            component={RegisterPage}
          />
          <Stack.Screen
            name={ROUTER_KEYS.MAIN_PAGE}
            component={MainTodo}
          />
          <Stack.Screen
            name={ROUTER_KEYS.CREATE_TODO}
            component={CreateTodo}
          />
          <Stack.Screen
            name={ROUTER_KEYS.EDIT_TODO}
            component={EditTodo}
          />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
