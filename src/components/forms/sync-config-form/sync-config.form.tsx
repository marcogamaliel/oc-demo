import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { SyncConf } from "../../../domain/models/sync-config.model";

type SyncConfigFormProps = {
  onSubmit: (data: SyncConf) => void;
  defaultValues?: SyncConf;
}

export function SyncConfigForm(props: SyncConfigFormProps) {
  const navigate = useNavigate()
  const { handleSubmit, reset, control, setValue } = useForm<SyncConf>({
    defaultValues: {
        retry: 0,
        period: 0,
        retryDelay: 0,
    }
  });

  useEffect(() => {
    if (props.defaultValues) {
      reset(props.defaultValues)
    }
  }, [props.defaultValues])
  
  return (
    <Box
      component="form"
      sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
      }}
    >
      <Controller
        name="retry"
        control={control}
        render={({ field }) => <TextField {...field} label="Cantidad de reintentos" />}
      />
      <Controller
        name="period"
        control={control}
        render={({ field }) => <TextField {...field} label="Tiempo entre cada reintento" />}
      />
      <Controller
        name="retryDelay"
        control={control}
        render={({ field }) => <TextField {...field} label="Periodo del cron" />}
      />
      
      <div className="form__actions">
          <Button variant="contained" color="warning" onClick={()=> navigate(-1)}>Cancelar</Button>
          <Button variant="contained" type="submit" onClick={handleSubmit(props.onSubmit)}>Guardar</Button>
        </div>
    </Box>
  )
}