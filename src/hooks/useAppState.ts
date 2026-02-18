import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Hook that fires a callback when the app comes to the foreground.
 * Useful for refreshing data when users return to the app.
 */
export const useAppForeground = (callback: () => void) => {
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState: AppStateStatus) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {
                    callback();
                }
                appState.current = nextAppState;
            }
        );

        return () => {
            subscription.remove();
        };
    }, [callback]);
};

/**
 * Hook that provides a debounced version of a callback.
 */
export const useDebounce = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): T => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    ) as T;

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return debouncedCallback;
};
