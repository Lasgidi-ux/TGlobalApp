import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Shift } from '../../types';
import { Avatar } from '../common';
import { colors, spacing, borderRadius, shadows } from '../../theme';

interface ShiftCardProps {
    shift: Shift;
    onPress?: (shift: Shift) => void;
}

export const ShiftCard: React.FC<ShiftCardProps> = ({ shift, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress?.(shift)}
            activeOpacity={0.9}
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
