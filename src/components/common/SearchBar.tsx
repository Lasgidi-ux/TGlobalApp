import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    placeholder = 'Search publications',
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <Ionicons
                name="search-outline"
                size={20}
                color={colors.textTertiary}
                style={styles.icon}
            />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    icon: {
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: colors.textPrimary,
        padding: 0,
    },
});
