import { SyncConfigForm } from "../../components/forms/sync-config-form/sync-config.form";
import { PrincipalDataComponent } from "../../components/ui/principal-data/principal-data.component";
import { View } from "../../components/ui/view.component";
import { guardRoles } from "../../services/authorization/authorization.service";

export function SettingsView() {
  guardRoles(['admin'])
  const onSubmit = (data: any) => {
    console.log(data)
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
      </section>
      <section className="container">
        <h2>Parametrización del sincronizador</h2>
        <SyncConfigForm onSubmit={onSubmit}/>
      </section>
    </View>
  )
}