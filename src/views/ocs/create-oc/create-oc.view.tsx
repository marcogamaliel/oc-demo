import { useNavigate } from "react-router-dom";
import { OCForm } from "../../../components/forms/oc-form.component";
import { PrincipalDataComponent } from "../../../components/ui/principal-data/principal-data.component";
import { OC } from "../../../domain/models/oc.model";
import { OCsRepository } from "../../../domain/repositories/ocs.repository";
import { View } from "../../../components/ui/view.component";

const defaultOC: OC = {
  id: "",
  items: [],
  total: 0,
  status: "Pendiente",
  sync: false,
};

export function CreateOCView() {
  const navigate = useNavigate();
  const save = (oc: OC) => {
    OCsRepository.save(oc).then(() => {
      navigate(-1)
    });
    console.log(oc)
  }

  return (
    <View className="create-oc-view">
      <section className="principal-section">
        <PrincipalDataComponent
          title="Nueva OC"
          class="container"
          icon="person"
          activeBack={true}
        />
      </section>
      <div className="container">
        <OCForm onSubmit={save}/>
      </div>
    </View>
  );
}