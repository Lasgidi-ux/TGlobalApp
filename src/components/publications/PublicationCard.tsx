import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Publication } from '../../types';
import { Avatar, TagBadge } from '../common';
import { colors, spacing, borderRadius, shadows } from '../../theme';

interface PublicationCardProps {
    publication: Publication;
    onPress?: (publication: Publication) => void;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
    publication,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress?.(publication)}
            activeOpacity={0.9}
        >
            {/* Publication Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: publication.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            {/* Tags */}
            <View style={styles.tagsContainer}>
                {publication.tags.map((tag) => (
                    <TagBadge
                        key={tag.id}
                        label={tag.label}
                        color={tag.color}
                        textColor={tag.textColor}
                    />
                ))}
            </View>

            {/* Title */}
            <Text style={styles.title} numberOfLines={2}>
                {publication.title}
            </Text>

            {/* Description */}
            <Text style={styles.description} numberOfLines={2}>
                {publication.description}
            </Text>

            {/* Author Row */}
            <View style={styles.authorRow}>
                <Avatar uri={publication.author.avatar} size={36} />
                <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{publication.author.name}</Text>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>{publication.publishedDate}</Text>
                        <View style={styles.metaDot} />
                        <Text style={styles.metaText}>{publication.readTime}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.cardBackground,
        borderRadius: borderRadius.xl,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.borderLight,
        ...shadows.md,
    },
    imageContainer: {
        borderTopLeftRadius: borderRadius.xl,
        borderTopRightRadius: borderRadius.xl,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: colors.backgroundSecondary,
    },
    tagsContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textPrimary,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        lineHeight: 22,
    },
    description: {
        fontSize: 13,
        color: colors.textSecondary,
        lineHeight: 19,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xs,
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.lg,
    },
    authorInfo: {
        marginLeft: spacing.sm,
        flex: 1,
    },
    authorName: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    metaText: {
        fontSize: 11,
        color: colors.textTertiary,
    },
    metaDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.textTertiary,
        marginHorizontal: spacing.xs,
    },
});
