import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
    Dimensions,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shift } from '../../types';
import { Avatar } from '../common';
import { colors, spacing, borderRadius, shadows } from '../../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ShiftDetailSheetProps {
    shift: Shift | null;
    visible: boolean;
    onClose: () => void;
}

export const ShiftDetailSheet: React.FC<ShiftDetailSheetProps> = ({
    shift,
    visible,
    onClose,
}) => {
    if (!shift) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />
                <View style={styles.sheet}>
                    {/* Handle */}
                    <View style={styles.handleContainer}>
                        <View style={styles.handle} />
                    </View>

                    <ScrollView
                        style={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={onClose} style={styles.backButton}>
                                <Ionicons
                                    name="chevron-back"
                                    size={22}
                                    color={colors.textPrimary}
                                />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Shift Details</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Ionicons name="close" size={22} color={colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        {/* Time and Date */}
                        <View style={styles.timeRow}>
                            <View style={styles.timeItem}>
                                <Ionicons
                                    name="time-outline"
                                    size={16}
                                    color={colors.textSecondary}
                                />
                                <Text style={styles.timeText}>8:00am - 12:00pm</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.timeItem}>
                                <Ionicons
                                    name="calendar-outline"
                                    size={16}
                                    color={colors.textSecondary}
                                />
                                <Text style={styles.timeText}>10 - 02 - 2024</Text>
                            </View>
                        </View>

                        {/* Description */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Beschrijving</Text>
                            <Text style={styles.sectionText}>
                                {shift.description ||
                                    'Dit is een kamer voor gesprekken tussen chirurgische artsen en patiënten over'}
                            </Text>
                        </View>

                        {/* Dienst & Kamers */}
                        <View style={styles.serviceRow}>
                            <View style={styles.serviceCol}>
                                <Text style={styles.sectionTitle}>Dienst</Text>
                                <View style={styles.serviceBadge}>
                                    <Text style={styles.serviceBadgeText}>
                                        {shift.service?.name || 'Ochtend 8:00-12:00'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.roomCol}>
                                <View style={styles.roomHeader}>
                                    <Ionicons
                                        name="business-outline"
                                        size={14}
                                        color={colors.primary}
                                    />
                                    <Text style={styles.roomLabel}>Kamers</Text>
                                </View>
                                <Text style={styles.roomName}>
                                    {shift.room?.name || 'Verkoeverruimte'}
                                </Text>
                            </View>
                        </View>

                        {/* Team */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Team</Text>
                            {(shift.team || []).map((member) => (
                                <View
                                    key={member.id}
                                    style={[
                                        styles.teamMember,
                                        member.isHighlighted && styles.teamMemberHighlighted,
                                    ]}
                                >
                                    <View style={styles.teamMemberLeft}>
                                        <Avatar uri={member.avatar} size={36} />
                                        <Text style={styles.teamMemberName}>{member.name}</Text>
                                    </View>
                                    <Text
                                        style={[
                                            styles.teamMemberTime,
                                            member.isHighlighted && styles.teamMemberTimeHighlighted,
                                        ]}
                                    >
                                        {member.timeRange}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {/* Notities */}
                        <View style={styles.section}>
                            <View style={styles.notitiesHeader}>
                                <Text style={styles.sectionTitle}>Notities</Text>
                                <TouchableOpacity style={styles.notitiesLink}>
                                    <Text style={styles.notitiesLinkText}>
                                        {shift.notes?.length || 3} notities
                                    </Text>
                                    <Ionicons
                                        name="arrow-forward"
                                        size={16}
                                        color={colors.textSecondary}
                                    />
                                </TouchableOpacity>
                            </View>
                            {(shift.notes || []).map((note) => (
                                <View key={note.id} style={styles.noteItem}>
                                    <Avatar uri={note.avatar} size={36} />
                                    <View style={styles.noteContent}>
                                        <View style={styles.noteHeader}>
                                            <Text style={styles.noteAuthor}>{note.author}</Text>
                                            <Text style={styles.noteTime}>{note.timeAgo}</Text>
                                        </View>
                                        <Text
                                            style={styles.noteText}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {note.content}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    sheet: {
        backgroundColor: colors.white,
        borderTopLeftRadius: borderRadius['2xl'],
        borderTopRightRadius: borderRadius['2xl'],
        maxHeight: SCREEN_HEIGHT * 0.85,
        ...shadows.xl,
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: colors.bottomSheetHandle,
        borderRadius: 2,
    },
    scrollContent: {
        paddingHorizontal: spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    backButton: {
        padding: spacing.xs,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    closeButton: {
        padding: spacing.xs,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    timeItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 13,
        color: colors.textSecondary,
        marginLeft: spacing.xs,
    },
    divider: {
        width: 1,
        height: 16,
        backgroundColor: colors.border,
        marginHorizontal: spacing.lg,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    sectionText: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    serviceRow: {
        flexDirection: 'row',
        marginBottom: spacing.xl,
    },
    serviceCol: {
        flex: 1,
    },
    serviceBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFF3E8',
        borderWidth: 1,
        borderColor: colors.accent,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    serviceBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.accent,
    },
    roomCol: {
        flex: 1,
    },
    roomHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    roomLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.primary,
        marginLeft: spacing.xs,
    },
    roomName: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    teamMember: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.sm,
    },
    teamMemberHighlighted: {
        backgroundColor: colors.primaryLight,
    },
    teamMemberLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    teamMemberName: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.textPrimary,
        marginLeft: spacing.sm,
    },
    teamMemberTime: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.accent,
    },
    teamMemberTimeHighlighted: {
        color: colors.accent,
    },
    notitiesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    notitiesLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notitiesLinkText: {
        fontSize: 13,
        color: colors.textSecondary,
        marginRight: spacing.xs,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.lg,
    },
    noteContent: {
        flex: 1,
        marginLeft: spacing.md,
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noteAuthor: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    noteTime: {
        fontSize: 11,
        color: colors.textTertiary,
    },
    noteText: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 2,
    },
});
