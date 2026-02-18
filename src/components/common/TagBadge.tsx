import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { borderRadius, spacing } from '../../theme';

interface TagBadgeProps {
    label: string;
    color: string;
    textColor: string;
    style?: ViewStyle;
}

export const TagBadge: React.FC<TagBadgeProps> = ({
    label,
    color,
    textColor,
    style,
}) => {
    return (
        <View style={[styles.container, { backgroundColor: color }, style]}>
            <Text style={[styles.text, { color: textColor }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
        marginRight: spacing.sm,
    },
    text: {
        fontSize: 11,
        fontWeight: '600',
    },
});
