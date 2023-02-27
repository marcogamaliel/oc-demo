import { useNavigate } from "react-router-dom";
import { OCForm } from "../../../components/forms/oc-form.component";
import { PrincipalDataComponent } from "../../../components/ui/principal-data/principal-data.component";
import { OC } from "../../../domain/models/oc.model";
import { OCsRepository } from "../../../domain/repositories/ocs.repository";
import { View } from "../../../components/ui/view.component";
import { guardRoles } from "../../../services/authorization/authorization.service";
import { useQuery } from "react-query";
import { ClientsRepository } from "../../../domain/repositories/clients.repository";
import { LinearProgress } from "@mui/material";

export function CreateOCView() {
  guardRoles(["seller"])
  const navigate = useNavigate();
  const {isLoading, isError, error, data: clients} = useQuery('clients', ClientsRepository.findAll)
  const save = (oc: Pick<OC, 'client' | 'amount'>) => {
    OCsRepository.save({
      ...oc,
      status: 'Pendiente',
      sync: false
    }).then(() => {
      navigate(-1)
    });
    console.log({oc})
  }

  return (
    <View className="create-oc-view">
      <section className="principal-section">
        <PrincipalDataComponent
          title="Nueva OC"
          class="container"
          icon="sell"
          activeBack={true}
        />
        {isLoading && <LinearProgress className="principal-loading" />}
      </section>
      <div className="container">
        <OCForm onSubmit={save} clients={clients}/>
      </div>
    </View>
  );
}