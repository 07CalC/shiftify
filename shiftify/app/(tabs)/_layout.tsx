import { Tabs } from "expo-router";


export default function TabsLayout() {
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: 60,
            },
            tabBarActiveTintColor: "#004FB4",
        }}
        >
            <Tabs.Screen name="index" options={{title: "My Shifts", tabBarIcon: () => null, tabBarLabelPosition: "beside-icon", tabBarIconStyle: { display: "none" }}} />
            <Tabs.Screen name="availableShifts" options={{title: "Available Shifts", tabBarIcon: () => null, tabBarIconStyle: { display: "none" }, tabBarLabelPosition: "beside-icon"}} />
        </Tabs>
    )
}