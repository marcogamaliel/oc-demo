import './products.view.scss'
import { Box, Card, CardContent, CardMedia, IconButton, LinearProgress, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { PrincipalDataComponent } from "../../components/ui/principal-data/principal-data.component"
import { Product } from "../../domain/models/product.model"
import { ProductsRepository } from "../../domain/repositories/products.repository"
import { priceFormat } from "../../helpers/format.helper"
import { guardRoles } from "../../services/authorization/authorization.service"
import { View } from '../../components/ui/view.component'

export function ProductsView() {
  guardRoles(['seller'])
  const {isLoading, isError, data: products} = useQuery<Product[]>('products', ProductsRepository.findAll)

  return (
    <View className="products-view">
      <section className="principal-section">
        <PrincipalDataComponent
          title="Productos"
          class="container"
          icon="groups"
          activeBack={true}
        />
         {isLoading && <LinearProgress className='principal-loading'/>}
      </section>
      
      <div className="container">
        <div className="products-list">
          {products?.map(product => (
            <Card sx={{ display: 'flex' }} key={`product-${product.id}`}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {product.description}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  {priceFormat(product.price)}
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={product.urlImage}
                alt="Live from space album cover"
              />
            </Card>
          ))}
        </div>
      </div>
    </View>
  )
}