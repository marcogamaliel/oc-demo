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

export function OCView() {
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
        <div>
          <h2>Productos</h2>
          {oc?.items.length? (
            <div className="products-selected">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="right">Producto</TableCell>
                      <TableCell align="right">Precio</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {oc?.items.map((product) => (
                      <TableRow
                        key={product.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {product.id}
                        </TableCell>
                        <TableCell align="right">{product.name}</TableCell>
                        <TableCell align="right">{priceFormat(product.price)}</TableCell>
                        <TableCell align="right">{product.quantity}</TableCell>
                        <TableCell align="right">{priceFormat(product.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <Paper sx={{padding: '.5rem', textAlign: 'center', color: 'gray', fontSize: '1.2rem'}}>
              <p>No hay productos seleccionados</p>
            </Paper>
          )}
          <div className="total" style={{fontSize: '2rem', marginTop: '1rem', textAlign: 'right'}}>
            <b>Total</b>: {priceFormat(oc?.total ?? 0)}
          </div>
        </div>
      </div>
    </View>
  )
}