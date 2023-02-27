import './oc-form.component.scss'
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Client } from "../../domain/models/client.model";
import { OC } from "../../domain/models/oc.model";

export type OCFormProps = {
  onSubmit: (data: Pick<OC, 'client' | 'amount'>) => void;
  defaultValues?: Client;
  clients?: Client[];
}

export function OCForm(props: OCFormProps) {
  const navigate = useNavigate()
  const { handleSubmit, reset, control, setValue } = useForm<Pick<OC, 'client' | 'amount'>>({
    defaultValues: {
        client: undefined,
        amount: 0,
    }
  });

  const onSubmit = (ocItem: Pick<OC, 'client' | 'amount'>) => {
    props.onSubmit(ocItem)
  }
    
  return (
    <div>
      <h2>Cliente Empresa</h2>
      <Box
        component="form"
      >
        <div className="inputs-container">
          <Controller
            name="client"
            control={control}
            render={({field}) => <Autocomplete
              options={props.clients ?? []}
              getOptionLabel={(option) => `${option.dni} | ${option.name}` }
              onChange={(_, values) => field.onChange(values)}
              renderInput={(params) => <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password"
                }}
                label="Cliente"
                onChange={field.onChange}
              />}
            />}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field }) => <TextField {...field} label="Monto" />}
          />
        </div>
        <div className="form__actions">
          <Button variant="contained" color="warning" onClick={()=> navigate(-1)}>Cancelar</Button>
          <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>Guardar</Button>
        </div>
      </Box>
    </div>
  )
}