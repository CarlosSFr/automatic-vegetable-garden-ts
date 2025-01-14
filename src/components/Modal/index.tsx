import { Modal as NModal, ModalProps, View, KeyboardAvoidingView } from 'react-native';

type Props = ModalProps & {
    isOpen: boolean
    withInput?: boolean
}

export function Modal({ isOpen, withInput, children, ...rest }: Props) {
    const content = withInput ? (
        <KeyboardAvoidingView
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 0, backgroundColor: 'rgba(24, 24, 27, 0.6)' }}
        >
            {children}
        </KeyboardAvoidingView>
    ) : (
        <View
            style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 0, backgroundColor: 'rgba(24, 24, 27, 0.6)' }}
        >
            {children}
        </View>
    )

    return (
        <NModal
            visible={isOpen}
            transparent
            animationType='fade'
            statusBarTranslucent
            {...rest}
        >
            {content}
        </NModal>
    )
}