import { LinearProgress } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { SyncConfigForm } from "../../components/forms/sync-config-form/sync-config.form";
import { PrincipalDataComponent } from "../../components/ui/principal-data/principal-data.component";
import { View } from "../../components/ui/view.component";
import { SyncConf } from "../../domain/models/sync-config.model";
import { SyncConfRepository } from "../../domain/repositories/sync-conf.repository";
import { guardRoles } from "../../services/authorization/authorization.service";

export function SettingsView() {
  guardRoles(['admin'])
  const [isLoadingSaved, setIsLoading] = useState<boolean>(false)
  const {isLoading, isError, data: defaul} = useQuery<SyncConf>('sync-conf', SyncConfRepository.get)

  const onSubmit = (syncConf: SyncConf) => {
    setIsLoading(true)
    SyncConfRepository.save(syncConf)
    .then(() => {
      console.log('Sync config saved')
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <View className="settings-view">
      <section className="principal-section">
        <PrincipalDataComponent
          title="Configuración"
          class="container"
          icon="settings"
          activeBack={true}
        />
        {(isLoading || isLoadingSaved) && <LinearProgress className='principal-loading'/>}
      </section>
      <section className="container">
        <h2>Parametrización del sincronizador</h2>
        <SyncConfigForm onSubmit={onSubmit} defaultValues={defaul} />
      </section>
    </View>
  )
}