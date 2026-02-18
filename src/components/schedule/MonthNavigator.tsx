import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../theme';

interface MonthNavigatorProps {
    currentMonth: string;
    onPrevious: () => void;
    onNext: () => void;
}

export const MonthNavigator: React.FC<MonthNavigatorProps> = ({
    currentMonth,
    onPrevious,
    onNext,
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPrevious}
                style={styles.arrowButton}
                activeOpacity={0.7}
            >
                <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <View style={styles.monthContainer}>
                <Ionicons
                    name="calendar-outline"
                    size={16}
                    color={colors.textPrimary}
                    style={styles.calendarIcon}
                />
                <Text style={styles.monthText}>{currentMonth}</Text>
            </View>

            <TouchableOpacity
                onPress={onNext}
                style={styles.arrowButton}
                activeOpacity={0.7}
            >
                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textSecondary}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    arrowButton: {
        padding: spacing.sm,
        borderRadius: borderRadius.full,
    },
    monthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarIcon: {
        marginRight: spacing.sm,
    },
    monthText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textPrimary,
    },
});
