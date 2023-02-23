import { Avatar, Divider, Icon, LinearProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { checkRoles, guardRoles } from "../../services/authorization/authorization.service";
import { PrincipalDataComponent } from "../../components/ui/principal-data/principal-data.component";
import { ActionProps } from "../../components/ui/action-component/models/action-props.model";
import { ClientsRepository } from "../../domain/repositories/clients.repository";
import { Client } from "../../domain/models/client.model";
import { View } from "../../components/ui/view.component";

export function ClientsView() {
  guardRoles(['seller'])
  const navigate = useNavigate()
  const {isLoading, isError, data: clients} = useQuery<Client[]>('users', ClientsRepository.findAll)
  const actions: ActionProps[] = []
  
  return (
    <View className="users-list">
      <section className="principal-section">
        <PrincipalDataComponent
          title="Clientes"
          class="container"
          icon="groups"
          activeBack={true}
          actions={actions}
        />
        {isLoading && <LinearProgress className='principal-loading'/>}
      </section>
      
      <div className="container">
        <List>
          <Divider variant="inset" component="li" />
          {/* TODO: borrar validación users?.length, se puso solo para el ngrok */}
          {clients?.map(user => (
            <div key={`user-${user.dni}`}>
              <ListItem
              disablePadding
              onClick={() => {
                  if(checkRoles(['admin'])) navigate(`/clients/${user.dni}`)
              }}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>person</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={user.dni}
                  />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      </div>
    </View>
  )
}