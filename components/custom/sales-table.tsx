"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DollarSign, DollarSignIcon } from "lucide-react";
import { DialogDemo } from "./sale-dialog";
import axios from "axios";
import { useQuery, QueryClient } from "@tanstack/react-query";

const invoices = [
  {
    id: "INV001",
    name: "Rice",
    category: "Foodstuff",
    price: "$250",
    quantity: "20",
    status: "false",
  },
];

export function TableDemo() {
  const fetchTodoList = async () => {
    return axios
      .get("http://localhost:3000/products")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return [];
      });
  };

  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: fetchTodoList,
    refetchOnMount: true,
  });

  return (
    <div className=" w-full border-2 border-gray-100 rounded-xl">
      <Table className=" ">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((invoice, index) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.category}</TableCell>
              <TableCell className="text-right">₦{invoice.price}</TableCell>
              <TableCell className="text-right">{invoice.quantity}</TableCell>
              <TableCell className="  ">
                {invoice.active ? (
                  <p className=" text-right font-medium text-emerald-500 border-2 border-emerald-600 p-3 rounded-lg w-fit ml-[75%]">
                    Active
                  </p>
                ) : (
                  <p className=" text-right font-medium text-red-500 border-2 border-red-600 p-3 rounded-lg w-fit ml-[75%]">
                    Low
                  </p>
                )}
              </TableCell>
              <TableCell className=" flex justify-end text-right">
                <DialogDemo
                  id={invoice.id}
                  name={invoice.name}
                  email={invoice.email}
                  category={invoice.category}
                  price={invoice.price}
                  quantity={invoice.quantity}
                  status={invoice.active}
                  initial={invoice.initial}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
}
