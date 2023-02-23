import './principal-data.component.scss'
import { Avatar, Icon } from "@mui/material";
import { PrincipalDataProps } from "./models/principal-data-props.model";
import { Back } from '../../back/back.component';
import { Actions } from '../action-component/actions.model';

export function PrincipalDataComponent(props: PrincipalDataProps) {
    return (
        <div className={`principal-data ${props.class?props.class:''}`}>
            <div>
                {props.activeBack && <Back />}
                <Avatar sx={{width: '4.3rem', height: '4.3rem'}}><Icon sx={{fontSize: "3.2rem"}}>{props.icon}</Icon></Avatar>
                <div className="principal-data__info">
                    <h1>{props.title}</h1>
                    <h2>{props.subTitle}</h2>
                </div>
            </div>
            {props.actions && props.actions.length > 0 && (
                <div className="actions">
                    <Actions actions={props.actions}/>
                </div>
            ) }
        </div>
    )
}