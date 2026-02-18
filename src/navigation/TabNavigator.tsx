import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
    HomeScreen,
    RoosterScreen,
    PublicationsScreen,
    ProfileScreen,
} from '../screens';
import { RootTabParamList } from '../types';
import { colors, shadows } from '../theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

const getTabBarIcon = (
    routeName: keyof RootTabParamList,
    focused: boolean,
    color: string,
    size: number
) => {
    let iconName: keyof typeof Ionicons.glyphMap;

    switch (routeName) {
        case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
        case 'Rooster':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
        case 'Publications':
            iconName = focused ? 'newspaper' : 'newspaper-outline';
            break;
        case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
        default:
            iconName = 'home-outline';
    }

    return (
        <View
            style={[
                styles.iconContainer,
                focused && styles.iconContainerActive,
            ]}
        >
            <Ionicons name={iconName} size={22} color={color} />
        </View>
    );
};

export const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) =>
                    getTabBarIcon(route.name, focused, color, size),
                tabBarActiveTintColor: colors.tabBarActive,
                tabBarInactiveTintColor: colors.tabBarInactive,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarItemStyle: styles.tabBarItem,
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Rooster"
                component={RoosterScreen}
                options={{ tabBarLabel: 'Rooster' }}
            />
            <Tab.Screen
                name="Publications"
                component={PublicationsScreen}
                options={{ tabBarLabel: 'Publications' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.tabBarBackground,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        height: Platform.OS === 'ios' ? 88 : 64,
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        ...shadows.md,
    },
    tabBarLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
    tabBarItem: {
        paddingVertical: 4,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 30,
        borderRadius: 15,
    },
    iconContainerActive: {
        backgroundColor: colors.primaryLight,
    },
});
