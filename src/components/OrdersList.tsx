import { useLoaderData } from "react-router-dom"
import { type OrdersResponse } from "@/api/types"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function OrdersList() {
  const { data, meta } = useLoaderData() as OrdersResponse;

  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">
        total orders : {meta?.pagination.total}
      </h4>
      <Table>
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
            return <TableRow key={order.orderId}>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell className="text-centre">{order.numberOfItemsInCart}</TableCell>
              <TableCell>{order.orderTotal}</TableCell>
              <TableCell>{order.createdOn}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrdersList