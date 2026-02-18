import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import { DayItem } from '../../types';
import { colors, spacing } from '../../theme';

interface DateStripProps {
    days: DayItem[];
    onSelectDay: (day: DayItem) => void;
}

export const DateStrip: React.FC<DateStripProps> = ({ days, onSelectDay }) => {
    const renderDay = ({ item }: { item: DayItem }) => {
        const isSelected = item.isSelected;

        return (
            <TouchableOpacity
                style={[styles.dayItem, isSelected && styles.dayItemSelected]}
                onPress={() => onSelectDay(item)}
                activeOpacity={0.7}
            >
                <Text
                    style={[styles.dateNumber, isSelected && styles.dateNumberSelected]}
                >
                    {item.date}
                </Text>
                <Text style={[styles.dayName, isSelected && styles.dayNameSelected]}>
                    {item.day}
                </Text>
                {item.hasEvent && (
                    <View
                        style={[
                            styles.eventDot,
                            isSelected && styles.eventDotSelected,
                        ]}
                    />
                )}
                {!item.hasEvent && <View style={styles.eventDotPlaceholder} />}
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={days}
            renderItem={renderDay}
            keyExtractor={(item, index) => `day-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.md,
    },
    dayItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        marginHorizontal: spacing.xs,
        borderRadius: 24,
        minWidth: 50,
        minHeight: 70,
    },
    dayItemSelected: {
        backgroundColor: colors.primary,
    },
    dateNumber: {
        fontSize: 17,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 2,
    },
    dateNumberSelected: {
        color: colors.white,
    },
    dayName: {
        fontSize: 11,
        fontWeight: '500',
        color: colors.textTertiary,
        marginBottom: 4,
    },
    dayNameSelected: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    eventDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: colors.primary,
        marginTop: 2,
    },
    eventDotSelected: {
        backgroundColor: colors.white,
    },
    eventDotPlaceholder: {
        width: 5,
        height: 5,
        marginTop: 2,
    },
});
