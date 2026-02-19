import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import { Shift } from '../../types';
import { Avatar } from '../common';
import { colors, spacing, borderRadius, shadows } from '../../theme';

interface ShiftCardProps {
    shift: Shift;
    onPress?: (shift: Shift) => void;
    index?: number;
}

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift, onPress, index = 0 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                tension: 50,
                delay: index * 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.96,
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
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
            }}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress?.(shift)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <View style={styles.leftBorder} />
                <View style={styles.content}>
                    {/* Title and Time */}
                    <View style={styles.headerRow}>
                        <Text style={styles.title} numberOfLines={1}>
                            {shift.title}
                        </Text>
                        <Text style={styles.time}>{shift.timeDisplay}</Text>
                    </View>

                    {/* Assignee Row */}
                    <View style={styles.assigneeRow}>
                        <Avatar uri={shift.assignee.avatar} size={24} />
                        <Text style={styles.assigneeName}>{shift.assignee.name}</Text>
                        <Text style={styles.status}>{shift.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.shiftCardBg,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.xs,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.shiftCardBorder,
        ...shadows.sm,
    },
    leftBorder: {
        width: 4,
        backgroundColor: colors.primaryLight,
    },
    content: {
        flex: 1,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textPrimary,
        flex: 1,
        marginRight: spacing.sm,
    },
    time: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.accent,
    },
    assigneeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    assigneeName: {
        fontSize: 12,
        color: colors.textSecondary,
        marginLeft: spacing.sm,
        fontWeight: '500',
    },
    status: {
        fontSize: 12,
        color: colors.textTertiary,
        marginLeft: spacing.sm,
    },
});
