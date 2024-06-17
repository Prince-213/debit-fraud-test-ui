import React from "react";
import Image from "next/image";

const CartItem = ({
  name,
  image,
  price,
  quantity,
}: {
  name: string;
  image: string;
  price: number;
  quantity: number;
}) => {
  return (
    <div className=" flex items-center  space-x-5">
      <div className=" w-[10rem] h-[8rem] border-2 rounded-lg flex items-center justify-center">
        <Image src={`/images/${image}`} width={100} height={100} alt="" />
      </div>

      <div className=" flex flex-col h-[4rem] justify-between">
        <p className=" text-xl font-bold">{name}</p>
        {/* <div className=" flex items-center space-x-4">
                <Button>
                  <Minus />
                </Button>
                <Input className=" w-14 text-center font-semibold" value={1} />
                <Button>
                  <Plus />
                </Button>
              </div> */}
        <p className=" text-lg font-bold">
          ₦{price} x {quantity}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
