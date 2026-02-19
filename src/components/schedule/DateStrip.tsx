import React, { useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Animated,
} from 'react-native';
import { DayItem } from '../../types';
import { colors, spacing } from '../../theme';

interface DateStripProps {
    days: DayItem[];
    onSelectDay: (day: DayItem) => void;
}

const AnimatedDay: React.FC<{
    item: DayItem;
    onSelectDay: (day: DayItem) => void;
}> = ({ item, onSelectDay }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            friction: 5,
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

    const isSelected = item.isSelected;

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={[styles.dayItem, isSelected && styles.dayItemSelected]}
                onPress={() => onSelectDay(item)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
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
        </Animated.View>
    );
};

export const DateStrip: React.FC<DateStripProps> = ({ days, onSelectDay }) => {
    return (
        <FlatList
            data={days}
            renderItem={({ item }) => (
                <AnimatedDay item={item} onSelectDay={onSelectDay} />
            )}
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
