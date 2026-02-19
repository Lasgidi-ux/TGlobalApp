import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useScheduleStore } from '../store/index';
import {
    DateStrip,
    MonthNavigator,
    ShiftCard,
    RoomSelector,
    ShiftDetailSheet,
} from '../components/schedule/index';
import { LoadingState, ErrorState } from '../components/common/index';
import { colors, spacing } from '../theme/index';

export const RoosterScreen: React.FC = () => {
    const {
        shifts,
        rooms,
        selectedRoom,
        weekDays,
        currentMonth,
        isLoading,
        error,
        selectedShift,
        isShiftDetailVisible,
        setSelectedRoom,
        navigateMonth,
        selectDay,
        fetchShifts,
        openShiftDetail,
        closeShiftDetail,
    } = useScheduleStore();

    const headerOpacity = useRef(new Animated.Value(0)).current;
    const headerTranslateY = useRef(new Animated.Value(-15)).current;

    useEffect(() => {
        fetchShifts();
        Animated.parallel([
            Animated.timing(headerOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(headerTranslateY, {
                toValue: 0,
                friction: 8,
                tension: 50,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Time slots corresponding to shifts
    const timeSlots = ['08:30', '09:00', '09:30', '10:00', '10:30'];

    // Current time indicator position (simulated at 09:15)
    const currentTimePosition = 1; // Index between 09:00 and 09:30

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
                <LoadingState message="Loading schedule..." />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
                <ErrorState message={error} onRetry={fetchShifts} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <Animated.View
                style={[
                    styles.header,
                    {
                        opacity: headerOpacity,
                        transform: [{ translateY: headerTranslateY }],
                    },
                ]}
            >
                <Text style={styles.headerTitle}>Mijn rooster</Text>
                <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
                    <Ionicons
                        name="ellipsis-vertical"
                        size={20}
                        color={colors.textPrimary}
                    />
                </TouchableOpacity>
            </Animated.View>

            {/* Month Navigator */}
            <MonthNavigator
                currentMonth={currentMonth}
                onPrevious={() => navigateMonth('prev')}
                onNext={() => navigateMonth('next')}
            />

            {/* Date Strip */}
            <DateStrip days={weekDays} onSelectDay={selectDay} />

            {/* Room Selector */}
            <RoomSelector
                rooms={rooms}
                selectedRoom={selectedRoom}
                onSelectRoom={setSelectedRoom}
            />

            {/* Shifts Timeline */}
            <ScrollView
                style={styles.timeline}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.timelineContent}
            >
                {shifts.map((shift, index) => (
                    <View key={shift.id} style={styles.timeSlotRow}>
                        {/* Time Label */}
                        <View style={styles.timeLabel}>
                            <Text style={styles.timeLabelText}>
                                {timeSlots[index] || shift.startTime}
                            </Text>
                        </View>

                        {/* Current Time Indicator Line */}
                        {index === currentTimePosition && (
                            <View style={styles.currentTimeIndicator}>
                                <View style={styles.currentTimeDot} />
                                <View style={styles.currentTimeLine} />
                            </View>
                        )}

                        {/* Shift Card */}
                        <View style={styles.shiftCardContainer}>
                            <ShiftCard shift={shift} onPress={openShiftDetail} index={index} />
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Shift Detail Bottom Sheet */}
            <ShiftDetailSheet
                shift={selectedShift}
                visible={isShiftDetailVisible}
                onClose={closeShiftDetail}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.textPrimary,
    },
    menuButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeline: {
        flex: 1,
    },
    timelineContent: {
        paddingBottom: spacing['3xl'],
    },
    timeSlotRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingRight: spacing.lg,
        minHeight: 80,
        position: 'relative',
    },
    timeLabel: {
        width: 55,
        paddingTop: spacing.lg,
        alignItems: 'center',
    },
    timeLabelText: {
        fontSize: 12,
        color: colors.textTertiary,
        fontWeight: '500',
    },
    shiftCardContainer: {
        flex: 1,
        paddingTop: spacing.sm,
    },
    currentTimeIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 40,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
    },
    currentTimeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.currentTimeLine,
        marginLeft: spacing.xl,
    },
    currentTimeLine: {
        flex: 1,
        height: 2,
        backgroundColor: colors.currentTimeLine,
    },
});
