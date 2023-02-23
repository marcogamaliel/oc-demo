import { Chip } from "@mui/material";
import { ReactElement } from "react";
import { OC } from "../domain/models/oc.model";

export function getChipOCStatus(oc?: OC): ReactElement | undefined {
  if(!oc) return undefined
  return (
    <Chip label={oc.status} color={oc.status === 'Pagada' ? 'success' : undefined} />
  )
}

export function getChipOCSync(oc?: OC): ReactElement | undefined {
  if(!oc) return undefined
  return (
    <Chip label={oc.sync?"Sincronizada": "No sincronizada"} color={oc.sync ? 'success' : undefined} />
  )
}