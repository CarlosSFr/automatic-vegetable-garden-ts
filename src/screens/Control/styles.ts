import { TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import styled from "styled-components/native";
import { DropProps } from ".";

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    padding: 12px 30px 30px 30px;
`

export const ModuleConfig = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${props => props.theme.colors.gray_400};
    border-radius: 6px;
    height: 36px;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 15px;
    align-items: center;
`

export const ModuleText = styled.Text`
    color: ${props => props.theme.colors.gray_200};
    font-size: ${props => props.theme.font_size.MD}px;
    font-family: ${props => props.theme.font_family.regular};
`

export const IrrigationText = styled.Text`
    color: ${props => props.theme.colors.off_white};
    font-size: ${props => props.theme.font_size.XL}px;
    font-family: ${props => props.theme.font_family.bold};
    margin-top: 60px;
    width: 100%;
    text-align: center;
`

export const Timer = styled.Text`
    color: ${props => props.theme.colors.off_white};
    font-size: 96px;
    font-family: ${props => props.theme.font_family.bold};
    margin-top: 20px;
    width: 100%;
    text-align: center;
    margin-bottom: 150px;
`

export const DropdownButton = styled(Dropdown).attrs<DropdownProps<DropProps>>(props => ({
    placeholderStyle: {
        color: props.theme.colors.gray_200,
        fontFamily: props.theme.font_family.regular,
        fontSize: props.theme.font_size.MD,
    },
    selectedTextStyle: {
        color: props.theme.colors.gray_200,
        fontFamily: props.theme.font_family.regular,
        fontSize: props.theme.font_size.MD,
    },
    itemTextStyle: {
        color: props.theme.colors.gray_400,
        fontFamily: props.theme.font_family.regular,
        fontSize: props.theme.font_size.MD,
    },
}))`
    height: 36px;
    border-color: ${props => props.theme.colors.gray_400};
    background-color: ${props => props.theme.colors.gray_400};
    border-width: 0.5px;
    border-radius: 8px;
    padding: 0px 8px;
`
