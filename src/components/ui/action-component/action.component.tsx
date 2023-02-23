import { Button } from "@mui/material";
import { ActionProps } from "./models/action-props.model";

export function ActionComponent(props: ActionProps) {
    const {label, icon, onClick, href, color} = props
    if(!(onClick || href)) throw new Error('ActionComponent needs onClick or href')
    return (
        <div>
        {onClick?(
            <Button
                variant="contained"
                onClick={onClick}
                color={color?color:'primary'}
            >{label}</Button>
        ) : (
            <Button
                variant="contained"
                href={href}
                color={color?color:'primary'}
            >{label}</Button>
            )}
        </div>
    )
}