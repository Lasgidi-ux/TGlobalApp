import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme';

interface AvatarProps {
    uri: string;
    size?: number;
    style?: ViewStyle;
    borderColor?: string;
    borderWidth?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
    uri,
    size = 36,
    style,
    borderColor,
    borderWidth = 0,
}) => {
    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderColor: borderColor || colors.border,
                    borderWidth,
                },
                style,
            ]}
        >
            <Image
                source={{ uri }}
                style={[
                    styles.image,
                    {
                        width: size - borderWidth * 2,
                        height: size - borderWidth * 2,
                        borderRadius: (size - borderWidth * 2) / 2,
                    },
                ]}
                resizeMode="cover"
                defaultSource={require('../../../assets/favicon.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary,
    },
    image: {
    },
});
