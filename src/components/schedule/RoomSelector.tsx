import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Room } from '../../types';
import { colors, spacing, borderRadius, shadows } from '../../theme';

interface RoomSelectorProps {
    rooms: Room[];
    selectedRoom: Room;
    onSelectRoom: (room: Room) => void;
}

export const RoomSelector: React.FC<RoomSelectorProps> = ({
    rooms,
    selectedRoom,
    onSelectRoom,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (room: Room) => {
        onSelectRoom(room);
        setIsOpen(false);
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={styles.selector}
                onPress={() => setIsOpen(!isOpen)}
                activeOpacity={0.7}
            >
                <Text style={styles.selectorText}>{selectedRoom.name}</Text>
                <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.textSecondary}
                />
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdown}>
                    {rooms.map((room) => (
                        <TouchableOpacity
                            key={room.id}
                            style={[
                                styles.dropdownItem,
                                room.id === selectedRoom.id && styles.dropdownItemSelected,
                            ]}
                            onPress={() => handleSelect(room)}
                        >
                            <Text
                                style={[
                                    styles.dropdownItemText,
                                    room.id === selectedRoom.id &&
                                    styles.dropdownItemTextSelected,
                                ]}
                            >
                                {room.name}
                            </Text>
                            {room.id === selectedRoom.id && (
                                <Ionicons
                                    name="checkmark"
                                    size={18}
                                    color={colors.primary}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        zIndex: 10,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    selectorText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    dropdown: {
        position: 'absolute',
        top: 48,
        left: spacing.lg,
        right: spacing.lg,
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.lg,
        zIndex: 100,
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    dropdownItemSelected: {
        backgroundColor: colors.primaryLight,
    },
    dropdownItemText: {
        fontSize: 14,
        color: colors.textPrimary,
    },
    dropdownItemTextSelected: {
        color: colors.primary,
        fontWeight: '600',
    },
});
