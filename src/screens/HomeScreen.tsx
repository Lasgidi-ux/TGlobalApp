import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    StatusBar,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePublicationsStore, useUserStore } from '../store/index';
import { PublicationCard } from '../components/publications/index';
import { SearchBar, Avatar, LoadingState, EmptyState, ErrorState } from '../components/common/index';
import { colors, spacing } from '../theme/index';
import { Publication } from '../types/index';

export const HomeScreen: React.FC = () => {
    const {
        searchQuery,
        setSearchQuery,
        isLoading,
        error,
        fetchPublications,
        filteredPublications,
    } = usePublicationsStore();
    const { user } = useUserStore();

    const headerOpacity = useRef(new Animated.Value(0)).current;
    const headerTranslateY = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        fetchPublications();
        // Animate header on mount
        Animated.parallel([
            Animated.timing(headerOpacity, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(headerTranslateY, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const publications = filteredPublications();

    const handlePublicationPress = (publication: Publication) => {
        console.log('Publication pressed:', publication.id);
    };

    const renderHeader = () => (
        <Animated.View
            style={[
                styles.headerContainer,
                {
                    opacity: headerOpacity,
                    transform: [{ translateY: headerTranslateY }],
                },
            ]}
        >
            {/* Welcome Row */}
            <View style={styles.welcomeRow}>
                <View style={styles.welcomeTextContainer}>
                    <Text style={styles.welcomeTitle}>Welcome back 👋</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Start exploring puplications
                    </Text>
                </View>
                {user && <Avatar uri={user.avatar} size={44} />}
            </View>

            {/* Search Bar */}
            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search publications"
                style={styles.searchBar}
            />

            {/* Section Title */}
            <Text style={styles.sectionTitle}>Latest publications</Text>
        </Animated.View>
    );

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
                {renderHeader()}
                <LoadingState message="Loading publications..." />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
                {renderHeader()}
                <ErrorState message={error} onRetry={fetchPublications} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <FlatList
                data={publications}
                renderItem={({ item, index }) => (
                    <PublicationCard
                        publication={item}
                        onPress={handlePublicationPress}
                        index={index}
                    />
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <EmptyState
                        icon="documents-outline"
                        title="No publications found"
                        description="Try adjusting your search"
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContent: {
        paddingBottom: spacing['3xl'],
    },
    headerContainer: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
    },
    welcomeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing['2xl'],
    },
    welcomeTextContainer: {
        flex: 1,
    },
    welcomeTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.textPrimary,
        letterSpacing: -0.3,
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },
    searchBar: {
        marginBottom: spacing['2xl'],
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.lg,
    },
});
