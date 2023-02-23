import { ReactElement } from "react"
import { ActionProps } from "../../action-component/models/action-props.model"

export type PrincipalDataProps = {
    title?: string
    subTitle?: string | ReactElement
    icon: string
    class?: string
    activeBack?: boolean
    actions?: ActionProps[]
}