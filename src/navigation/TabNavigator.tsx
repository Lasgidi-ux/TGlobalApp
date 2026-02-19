import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Platform, Animated } from 'react-native';
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

const AnimatedTabIcon: React.FC<{
    routeName: keyof RootTabParamList;
    focused: boolean;
    color: string;
}> = ({ routeName, focused, color }) => {
    const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.85)).current;
    const bgAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: focused ? 1 : 0.85,
                friction: 5,
                tension: 100,
                useNativeDriver: true,
            }),
            Animated.timing(bgAnim, {
                toValue: focused ? 1 : 0,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start();
    }, [focused]);

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

    const backgroundColor = bgAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', colors.primaryLight],
    });

    return (
        <Animated.View
            style={[
                styles.iconContainer,
                {
                    backgroundColor,
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        >
            <Ionicons name={iconName} size={22} color={color} />
        </Animated.View>
    );
};

export const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => (
                    <AnimatedTabIcon
                        routeName={route.name}
                        focused={focused}
                        color={color}
                    />
                ),
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
});
