import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { OCItem } from "../../../domain/models/oc-item.model";
import { OC } from "../../../domain/models/oc.model";
import { Product } from "../../../domain/models/product.model";
import { ProductsRepository } from "../../../domain/repositories/products.repository";
import { priceFormat } from "../../../helpers/format.helper";

type addProductProps = {
  setProductsItems: (data: OCItem[]) => void;
  defaultValues?: OCItem;
}

export function AddProductsComponent(props: addProductProps) {
  const { handleSubmit, reset, control, setValue } = useForm<Omit<OCItem, 'price' | 'total'>>({
      defaultValues: {
        id: '',
        name: '',
        quantity: 1,
      }
  });

  const [products, setProducts] = useState<OCItem[]>([]);
  const [findedProduct, setFindedProduct] = useState<Product | undefined>(undefined);
  const [total, setTotal] = useState(0);

  function findProduct(e: any) {
    const id = e.target.value
    ProductsRepository.findById(id).then((product) => {
      if(product) {
        setFindedProduct(product)
        setValue('name', product.name)
      }
    })
  }

  function addProduct(itemAdded: Omit<OCItem, 'price' | 'total'>) {
    if(!findedProduct) return
    const totalItem = findedProduct?.price * itemAdded.quantity
    const item = {
      id: findedProduct.id,
      name: findedProduct.name,
      quantity: itemAdded.quantity,
      price: findedProduct?.price,
      total: totalItem
    }
    const items = [...products, item];
    setProducts(items);
    props.setProductsItems(items);
    reset()
    setTotal(total + totalItem);
    setFindedProduct(undefined);
  }

  return (
    <div className="add-products-component">
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        marginBottom: '1rem',
      }}
      >
        <Controller
        name="id"
        control={control}
        render={({ field }) => <TextField {...field} label="Id" onChange={(...event) => {
          findProduct(...event)
          field.onChange(...event)
        }}/>}
        />
        <Controller
        name="name"
        control={control}
        render={({ field }) => <TextField {...field} label="Nombre" />}
        />
        <Controller
        name="quantity"
        control={control}
        render={({ field }) => <TextField {...field} label="Cantidad" />}
        />
        <Button variant="contained" type="submit" onClick={handleSubmit(addProduct)}>Agregar</Button>
      </Box>
      {products.length? (
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
                {products.map((product) => (
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
        <b>Total</b>: {priceFormat(total)}
      </div>
    </div>
  )
}