import theme from "../theme";
import "styled-componenets/native"

declare module "styled-components/native" {
    type ThemeType = typeof theme

    export interface DefaultTheme extends ThemeType { }
}