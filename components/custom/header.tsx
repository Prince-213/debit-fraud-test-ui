import { ShoppingBasket } from "lucide-react";
import React from "react";
import { AvatarDemo } from "./avatar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Cart {
  id: string;
  productId: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
}

const Header = () => {
  const fetchCart = async () => {
    const res = await axios.get("http://localhost:3000/cart");
    const data: Cart[] = await res.data;

    return data;
  };

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    refetchOnMount: true,
  });

  return (
    <header className=" bg-blue-600 w-full py-6 px-20 flex justify-between items-center">
      <h1 className=" font-semibold text-3xl text-white">Test-Store</h1>

      <div className=" flex items-center space-x-10">
        <Link href={"/checkout"} className=" relative">
          {cartData?.length != 0 ? (
            <div className=" w-6 absolute -top-2 -right-2 h-6 flex items-center justify-center rounded-full bg-red-500">
              <h1 className=" text-white">{cartData?.length}</h1>
            </div>
          ) : null}

          <ShoppingBasket size={32} className=" text-white" />
        </Link>
        <AvatarDemo />
      </div>
    </header>
  );
};

export default Header;
