import { ActionComponent } from "./action.component";
import { ActionProps } from "./models/action-props.model";

export function Actions({actions}: {actions: ActionProps[]}) {
    return (
        <div className="actions">
            {actions.map(action => (
                <ActionComponent {...action} key={action.key}/>
            ))}
        </div>
    )
}