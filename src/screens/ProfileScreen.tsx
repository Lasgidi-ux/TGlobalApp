import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../store';
import { Avatar } from '../components/common';
import { colors, spacing, borderRadius, shadows } from '../theme';

interface ProfileMenuItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress?: () => void;
    isDestructive?: boolean;
    index?: number;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
    icon,
    label,
    onPress,
    isDestructive,
    index = 0,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            friction: 8,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <View style={styles.menuItemLeft}>
                    <View
                        style={[
                            styles.menuIconContainer,
                            isDestructive && styles.menuIconDestructive,
                        ]}
                    >
                        <Ionicons
                            name={icon}
                            size={20}
                            color={isDestructive ? colors.error : colors.primary}
                        />
                    </View>
                    <Text
                        style={[styles.menuItemText, isDestructive && styles.menuItemDestructive]}
                    >
                        {label}
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
            </TouchableOpacity>
        </Animated.View>
    );
};

export const ProfileScreen: React.FC = () => {
    const { user, logout } = useUserStore();

    const headerOpacity = useRef(new Animated.Value(0)).current;
    const profileCardScale = useRef(new Animated.Value(0.9)).current;
    const profileCardOpacity = useRef(new Animated.Value(0)).current;
    const menuOpacity = useRef(new Animated.Value(0)).current;
    const menuTranslateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.stagger(150, [
            Animated.timing(headerOpacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.spring(profileCardScale, {
                    toValue: 1,
                    friction: 6,
                    tension: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(profileCardOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(menuOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.spring(menuTranslateY, {
                    toValue: 0,
                    friction: 8,
                    tension: 50,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
                        <Ionicons
                            name="settings-outline"
                            size={22}
                            color={colors.textPrimary}
                        />
                    </TouchableOpacity>
                </Animated.View>

                {/* Profile Card */}
                <Animated.View
                    style={[
                        styles.profileCard,
                        {
                            opacity: profileCardOpacity,
                            transform: [{ scale: profileCardScale }],
                        },
                    ]}
                >
                    <Avatar
                        uri={user?.avatar || ''}
                        size={72}
                        borderColor={colors.primary}
                        borderWidth={2}
                    />
                    <Text style={styles.userName}>{user?.name || 'User'}</Text>
                    <Text style={styles.userRole}>{user?.role || 'Role'}</Text>
                    <TouchableOpacity style={styles.editProfileButton} activeOpacity={0.7}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Menu Section */}
                <Animated.View
                    style={{
                        opacity: menuOpacity,
                        transform: [{ translateY: menuTranslateY }],
                    }}
                >
                    <View style={styles.menuSection}>
                        <Text style={styles.menuSectionTitle}>General</Text>
                        <View style={styles.menuCard}>
                            <ProfileMenuItem icon="person-outline" label="Personal Information" index={0} />
                            <ProfileMenuItem icon="notifications-outline" label="Notifications" index={1} />
                            <ProfileMenuItem icon="shield-checkmark-outline" label="Security" index={2} />
                            <ProfileMenuItem icon="language-outline" label="Language" index={3} />
                        </View>
                    </View>

                    <View style={styles.menuSection}>
                        <Text style={styles.menuSectionTitle}>Support</Text>
                        <View style={styles.menuCard}>
                            <ProfileMenuItem icon="help-circle-outline" label="Help Center" index={4} />
                            <ProfileMenuItem icon="chatbubble-outline" label="Contact Us" index={5} />
                            <ProfileMenuItem icon="document-text-outline" label="Terms & Privacy" index={6} />
                        </View>
                    </View>

                    <View style={styles.menuSection}>
                        <View style={styles.menuCard}>
                            <ProfileMenuItem
                                icon="log-out-outline"
                                label="Log Out"
                                isDestructive
                                onPress={logout}
                                index={7}
                            />
                        </View>
                    </View>

                    {/* App Version */}
                    <Text style={styles.versionText}>Version 1.0.0</Text>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingBottom: spacing['5xl'],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.lg,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.textPrimary,
    },
    settingsButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileCard: {
        alignItems: 'center',
        paddingVertical: spacing['2xl'],
        marginHorizontal: spacing.lg,
        backgroundColor: colors.cardBackground,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.borderLight,
        marginBottom: spacing.xl,
        ...shadows.sm,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.textPrimary,
        marginTop: spacing.md,
    },
    userRole: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    editProfileButton: {
        marginTop: spacing.lg,
        paddingHorizontal: spacing['2xl'],
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    editProfileText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.primary,
    },
    menuSection: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    menuSectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.textTertiary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.sm,
        paddingLeft: spacing.xs,
    },
    menuCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.borderLight,
        overflow: 'hidden',
        ...shadows.sm,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    menuIconDestructive: {
        backgroundColor: '#FEE2E2',
    },
    menuItemText: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.textPrimary,
    },
    menuItemDestructive: {
        color: colors.error,
    },
    versionText: {
        fontSize: 12,
        color: colors.textTertiary,
        textAlign: 'center',
        marginTop: spacing.md,
    },
});
