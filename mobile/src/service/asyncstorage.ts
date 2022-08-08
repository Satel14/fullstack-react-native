import AsyncStorage from "@react-native-async-storage/async-storage";

export default class TokenService {
  static async setToken({ token }: { token: string }) {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
    }
  }

  static async getToken() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        return token;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
  async removeItem() {
    try {
      await AsyncStorage.removeItem("token");
      return true;
    } catch (exception) {
      return false;
    }
  }
}

