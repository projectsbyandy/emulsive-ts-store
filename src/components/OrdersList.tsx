import { useLoaderData } from "react-router-dom"
import { type OrdersResponse } from "@/api/types"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function OrdersList() {
  const { data, meta } = useLoaderData() as OrdersResponse;

  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize" data-testid='totalOrders'>
        total orders : {meta?.pagination.total}
      </h4>
      <Table data-testid='OrdersTable'>
        <TableCaption>List of recent orders</TableCaption>
        <TableHeader>
          <TableRow>  
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="w-[100px]">Products</TableHead>
            <TableHead className="w-[100px]">Cost</TableHead>
            <TableHead>Purchased</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order) => {              
            return <TableRow data-testid={order.orderId} key={order.orderId}>
              <TableCell data-testid='name'>{order.name}</TableCell>
              <TableCell data-testid='address'>{order.address}</TableCell>
              <TableCell data-testid='numberCartItems' className="text-centre">{order.numberOfItemsInCart}</TableCell>
              <TableCell data-testid='orderTotal'>{order.orderTotal}</TableCell>
              <TableCell data-testid='createdOn'>{order.createdOn}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrdersList