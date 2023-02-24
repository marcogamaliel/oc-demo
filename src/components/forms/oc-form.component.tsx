import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Client } from "../../domain/models/client.model";
import { OCItem } from "../../domain/models/oc-item.model";
import { OC } from "../../domain/models/oc.model";
import { ClientsRepository } from "../../domain/repositories/clients.repository";
import { AddProductsComponent } from "./components/add-products.component";

export type OCFormProps = {
  onSubmit: (data: OC) => void;
  defaultValues?: Client;
}

export function OCForm(props: OCFormProps) {
  const navigate = useNavigate()
  const { handleSubmit, reset, control, setValue } = useForm<Client>({
    defaultValues: {
        name: '',
        dni: '',
        email: '',
    }
  });
  const [items, setItems] = useState<OCItem[]>([])
  
  const findUser = (e: any) => {
    const dni = e.target.value
    ClientsRepository.findById(dni).then((client) => {
      if(client) {
        setValue('name', client.name)
        setValue('email', client.email)
      }
    })
  }

  const onSubmit = (client: Client) => {
    props.onSubmit({
      client,
      items,
      total: items.reduce((acc, item) => acc + item.total, 0),
      status: 'Pendiente',
      sync: false,
    })
  }
    
  return (
    <div>
      <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <h2>Cliente Empresa</h2>
        <Controller
          name="dni"
          control={control}
          render={({ field }) => <TextField {...field} label="Rut" onChange={(...event) => {
            findUser(...event);
            field.onChange(...event)
          }} />}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField {...field} label="Nombre" />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextField {...field} label="Email" />}
        />
      </Box>
      <h2>Products</h2>
        <AddProductsComponent setProductsItems={setItems}/>

        <div className="form__actions">
          <Button variant="contained" color="warning" onClick={()=> navigate(-1)}>Cancelar</Button>
          <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>Guardar</Button>
        </div>
    </div>
  )
}