import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Informacoes from "../pages/Informacoes";
import Historico from "../pages/Historico";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {

  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: { marginTop: insets.top, },
    }}
    >
      <Tab.Screen name="informacoes"  component={Informacoes} options={{tabBarLabel:'Informações'}}/>
      <Tab.Screen name="historico" component={Historico} options={{tabBarLabel:'Histórico'}}  />
    </Tab.Navigator>
  );
}

export default TopTabs;