import { Avatar, Chip, Divider, Icon, LinearProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { ActionProps } from "../../../components/ui/action-component/models/action-props.model"
import { PrincipalDataComponent } from "../../../components/ui/principal-data/principal-data.component"
import { View } from "../../../components/ui/view.component"
import { OC } from "../../../domain/models/oc.model"
import { OCsRepository } from "../../../domain/repositories/ocs.repository"
import { priceFormat } from "../../../helpers/format.helper"
import { getChipOCStatus, getChipOCSync } from "../../../helpers/oc.helper"
import { checkRoles, guardRoles } from "../../../services/authorization/authorization.service"

export function OCsView() {
  guardRoles(['seller', 'admin'])
  const navigate = useNavigate()
  const {isLoading, isError, data: ocs} = useQuery<OC[]>('ocs', OCsRepository.findAll)
  const actions: ActionProps[] = []
  if(checkRoles(['seller'])) actions.push({
    key: 'create-oc',
    label: 'Crear OC',
    onClick: () => navigate('/ocs/create')
  })
  
  return (
    <View className="ocs-list">
      <section className="principal-section">
        <PrincipalDataComponent
          title="Ordenes de Compra"
          class="container"
          icon="storefront"
          activeBack={false}
          actions={actions}
        />
        {isLoading && <LinearProgress className='principal-loading'/>}
      </section>
      
      <div className="container">
        <List>
          <Divider variant="inset" component="li" />
          {ocs?.map(oc => (
            <div key={`user-${oc.id}`}>
              <ListItem
              disablePadding
              onClick={() => {
                  if(checkRoles(['seller'])) navigate(`/ocs/${oc.id}`)
              }}
              secondaryAction={<div>{getChipOCStatus(oc)} {getChipOCSync(oc)}</div>}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>sell</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={oc.client?.name}
                    secondary={priceFormat(oc.amount)}
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