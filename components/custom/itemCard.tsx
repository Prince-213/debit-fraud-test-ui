import React from "react";
import { Button } from "../ui/button";
import { BadgePlusIcon, Loader } from "lucide-react";
import Image from "next/image";
import shirt from "../../lib/images/pngwing.com (1).png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuid4 } from "uuid";

interface Cart {
  id: string;
  product: string;
  productId: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}

const ItemCard = ({
  image,
  name,
  price,
  id,
}: {
  image: string;
  name: string;
  price: number;
  id: string;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newItem: Cart) => {
      return fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }).then((response) => response.json());
    },
    onError(error, variables, context) {
      console.log(error);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onSuccess(data, variables, context) {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <div>
      <div className=" border-2 border-gray-100 flex items-center justify-center rounded-lg w-full h-[20rem]">
        <Image src={`/images/${image}`} width={300} height={300} alt="" />
      </div>
      <br />
      <h1 className=" font-semibold text-xl">{name}</h1>

      <p className=" font-semibold text-lg mt-3 mb-6">₦{price}</p>
      <Button
        variant={"outline"}
        onClick={() =>
          mutation.mutate({
            id: id,
            productId: id,
            product: name,
            quantity: 1,
            price: price,
            total: price,
            image: image,
          })
        }
        className=" h-16 rounded-2xl duration-150 hover:text-white hover:bg-blue-600 transition-all  flex items-center space-x-3 w-full"
      >
        {mutation.isPending ? (
          <Loader className=" animate-spin" />
        ) : (
          <BadgePlusIcon className=" " />
        )}

        <p className=" font-semibold  text-lg">Add to cart</p>
      </Button>
    </div>
  );
};

export default ItemCard;
