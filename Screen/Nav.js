import { View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./Home";
import Scan from "./Scan";
import Cart from "./Cart";
import Payment from "./Payment";

// Component giả định cho các tab chưa có
const Notifications = () => <View><Text>Notifications Screen</Text></View>;
const History = () => <View><Text>History Screen</Text></View>;

const Tab = createBottomTabNavigator();

const Nav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: route.name === "Scan" ? { display: "none" } : styles.tabBar, // Ẩn thanh tab cho Scan
                tabBarIcon: ({ focused }) => {
                    const iconConfig = {
                        Home: "home-outline",
                        Notifications: "notifications-outline",
                        Scan: "scan-outline",
                        History: "time-outline",
                        Cart: "cart-outline",
                    };
                    const iconName = iconConfig[route.name];
                    const hasBadge = route.name === "Notifications";

                    return (
                        <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                            <Ionicons
                                name={iconName}
                                size={28}
                                color={focused ? "#F08F5F" : "#C4C4C4"}
                            />
                            {hasBadge && <View style={styles.badge} />}
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Scan" component={Scan} />
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Cart" component={Cart} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 0,
        left: 20,
        right: 20,
        height: 80,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateY: 15 }],
    },
    activeIcon: {
        backgroundColor: "#F6E3DB", // Nền khi tab được chọn
    },
    badge: {
        position: "absolute",
        top: 5,
        right: 5,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "red",
    },
});

export default Nav;