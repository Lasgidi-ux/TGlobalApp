import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Publication } from '../../types';
import { Avatar, TagBadge } from '../common';
import { colors, spacing, borderRadius, shadows } from '../../theme';

interface PublicationCardProps {
    publication: Publication;
    onPress?: (publication: Publication) => void;
    index?: number;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
    publication,
    onPress,
    index = 0,
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 150,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                friction: 8,
                tension: 40,
                delay: index * 150,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            friction: 8,
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

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY }, { scale: scaleAnim }],
            }}
        >
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress?.(publication)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
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
        </Animated.View>
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
