import './oc.view.scss'
import { Chip, Divider, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { PrincipalDataComponent } from "../../../components/ui/principal-data/principal-data.component"
import { View } from "../../../components/ui/view.component"
import { OC } from "../../../domain/models/oc.model"
import { OCsRepository } from "../../../domain/repositories/ocs.repository"
import { formatDate, priceFormat } from "../../../helpers/format.helper"
import { getChipOCStatus, getChipOCSync } from '../../../helpers/oc.helper'
import { guardRoles } from '../../../services/authorization/authorization.service'

export function OCView() {
    guardRoles(['admin', 'seller'])
    const {id} = useParams<{id: string}>()
    const {isLoading, isError, data: oc} = useQuery<OC | undefined>('oc', () => OCsRepository.findById(id))
  
    console.log(id, oc)
    
  return (
    <View className="oc-view">
      <section className="principal-section">
        <PrincipalDataComponent
          title={`OC: ${oc?.id?.padStart(6, '0')}`}
          subTitle={<div>{getChipOCStatus(oc)} {getChipOCSync(oc)}</div>}
          class="container"
          icon="sell"
          activeBack={true}
        />
        {isLoading && <LinearProgress className='principal-loading'/>}
      </section>
      
      <div className="container">
        <Paper sx={{padding: '.5rem', textAlign: 'center', color: 'gray', fontSize: '1.2rem'}}>
          <div className="oc-view__data">
            <div>
              <p><b>Nombre:</b> {oc?.client?.name}</p>
              <p><b>Rut: </b> {oc?.client?.dni}</p>
              <p><b>Email: </b> {oc?.client?.email}</p>
            </div>
            <div>
              <p><b>Fecha Emisión:</b> {formatDate(oc?.date)}</p>
              <p><b>Fecha Pago:</b> {formatDate(oc?.paymentDate)}</p>
            </div>
          </div>
        </Paper>
        <div className="total" style={{fontSize: '2rem', marginTop: '1rem', textAlign: 'right'}}>
          <b>Total</b>: {priceFormat(oc?.amount ?? 0)}
        </div>
      </div>
    </View>
  )
}