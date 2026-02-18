import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePublicationsStore } from '../store/index';
import { PublicationCard } from '../components/publications/index';
import { SearchBar, LoadingState, EmptyState, ErrorState } from '../components/common/index';
import { colors, spacing } from '../theme/index';
import { Publication } from '../types/index';

export const PublicationsScreen: React.FC = () => {
    const {
        searchQuery,
        setSearchQuery,
        isLoading,
        error,
        fetchPublications,
        filteredPublications,
    } = usePublicationsStore();

    useEffect(() => {
        fetchPublications();
    }, []);

    const publications = filteredPublications();

    const handlePublicationPress = (publication: Publication) => {
        console.log('Publication pressed:', publication.id);
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Publications</Text>

            {/* Search Bar */}
            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search publications"
                style={styles.searchBar}
            />

            <Text style={styles.sectionTitle}>All publications</Text>
        </View>
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
                renderItem={({ item }) => (
                    <PublicationCard
                        publication={item}
                        onPress={handlePublicationPress}
                    />
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <EmptyState
                        icon="documents-outline"
                        title="No publications found"
                        description="Try adjusting your search criteria"
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
    headerTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.textPrimary,
        marginBottom: spacing.lg,
        letterSpacing: -0.3,
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
