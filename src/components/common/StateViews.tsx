import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../theme';

// ============ Loading State ============
interface LoadingStateProps {
    message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
    message = 'Loading...',
}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

// ============ Empty State ============
interface EmptyStateProps {
    icon?: keyof typeof Ionicons.glyphMap;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = 'document-text-outline',
    title,
    description,
    actionLabel,
    onAction,
}) => {
    return (
        <View style={styles.container}>
            <Ionicons name={icon} size={48} color={colors.textTertiary} />
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
            {actionLabel && onAction && (
                <TouchableOpacity style={styles.actionButton} onPress={onAction}>
                    <Text style={styles.actionText}>{actionLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

// ============ Error State ============
interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    message = 'Something went wrong',
    onRetry,
}) => {
    return (
        <View style={styles.container}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
            <Text style={styles.title}>{message}</Text>
            {onRetry && (
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing['3xl'],
        paddingVertical: spacing['5xl'],
    },
    message: {
        ...typography.bodyMd,
        color: colors.textSecondary,
        marginTop: spacing.md,
    },
    title: {
        ...typography.labelLg,
        color: colors.textPrimary,
        marginTop: spacing.lg,
        textAlign: 'center',
    },
    description: {
        ...typography.bodyMd,
        color: colors.textSecondary,
        marginTop: spacing.sm,
        textAlign: 'center',
    },
    actionButton: {
        marginTop: spacing.xl,
        backgroundColor: colors.primary,
        paddingHorizontal: spacing['2xl'],
        paddingVertical: spacing.md,
        borderRadius: 8,
    },
    actionText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 14,
    },
    retryButton: {
        marginTop: spacing.xl,
        backgroundColor: colors.error,
        paddingHorizontal: spacing['2xl'],
        paddingVertical: spacing.md,
        borderRadius: 8,
    },
    retryText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 14,
    },
});
