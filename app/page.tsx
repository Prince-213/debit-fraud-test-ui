"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, CheckCircle, Loader, Minus, Plus, XCircle } from "lucide-react";
import CartItem from "@/components/custom/cart-item";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  aggregateData,
  calculateTotalPrice,
  FinanceInfo,
  isTransactionSuspicious,
} from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
import chip from "@/lib/icons8-chip-card-100.png";
import master from "@/lib/icons8-paypal-96.png";
import { CreditCard } from "lucide-react";

interface Cart {
  id: string;
  product: string;
  productId: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}

const HomePage = () => {
  const fetchCheckout = async () => {
    const res = await axios.get("http://localhost:3000/cart");
    const data: Cart[] = await res.data;
    const aggregated = await aggregateData(data);

    console.log(aggregated);
    return aggregated;
  };

  const { data: checkoutData } = useQuery({
    queryKey: ["checkout"],
    queryFn: fetchCheckout,
  });

  const fetchTransaction = async () => {
    const res = await axios.get("http://localhost:3000/details");
    const data: FinanceInfo = await res.data;

    return data;
  };

  const { data: transData } = useQuery({
    queryKey: ["transaction"],
    queryFn: fetchTransaction,
  });

  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [holder, setHolder] = useState(0);
  const [amount, setAmount] = useState(500);
  const [oldBalance, setOldBance] = useState(1000);
  const [newbalance, setNewBalance] = useState(0);
  const [type, setType] = useState(0);
  const [cardType, setCardType] = useState(0);
  const [expType, setExpType] = useState(0);
  const [gender, setGender] = useState(0);
  const [loading, setLoading] = useState(false);

  const Cards = [
    {
      name: "gold",
      color: "#FFD700",
    },
    { name: "silver", color: "#C0C0C0" },
    { name: "Signature", color: "#000000" },
    { name: "Platinum", color: "#E5E4E2" },
    { name: "Classic", color: "#97E717" },
    { name: "Mass", color: "#12DAE9" },
  ];

  const sendMail = ({
    email,
    name,
    content,
  }: {
    email: string;
    name: string;
    content: string;
  }) => {
    emailjs.send(
      "service_3cs79uj",
      "template_wm40ob8",
      {
        from_name: "Debit Card Fraud Detection",
        to_name: name,
        message: content,
        to_email: email,
        reply_to: email,
      },
      { publicKey: "lXy3uMKebxhwBPRWt" }
    );
  };

  const { toast } = useToast();

  const predict = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await axios.post(
      "http://127.0.0.1:8000/api/predict",
      {
        amount: amount,
        oldbalanceOrg: oldBalance,
        newbalanceOrig: oldBalance - amount,
        type: type,
        cardType: cardType,
        expType: expType,
        gender: gender,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = await res.data;

    setLoading(false);

    if (data.result == "Fraud detected") {
      setError(true);
      setModal(true);
      sendMail({
        email: email,
        name: "User",
        content:
          "Suspicious activity has been detected from your card and your card has been blocked",
      });
    } else {
      setError(false);
      setModal(true);
      sendMail({
        email: email,
        name: "User",
        content: "Transaction with your card is successfull ",
      });
    }

    console.log(data.result);
  };

  const handleSubmit = () => {
    if (transData?.status != "active") {
      console.log("The card has been blocked");
      const sendMail = ({ email, item }: { email: string; item: string }) => {
        emailjs.send(
          "service_3cs79uj",
          "template_wm40ob8",
          {
            from_name: "Store Analysis",
            to_name: "User",
            message: `The product you posted ( ${item} ) stock is low. Please do replenish your inventory`,
            to_email: email,
            reply_to: "princolosh@gmail.com",
          },
          { publicKey: "lXy3uMKebxhwBPRWt" }
        );
      };
      setModal(true);
    }

    if (checkoutData && transData) {
      const newTransaction = {
        id: 61,
        date: `${Date.now()}`,
        amount: calculateTotalPrice(checkoutData), // Example amount to test
        currency: "NGN",
        description: "New Transaction",
      };

      const result = isTransactionSuspicious(newTransaction, transData);
      console.log(result);

      if (
        cardNumber == transData.cardNumber &&
        cvc == transData.cardCVV &&
        exp == transData.cardExpiry &&
        email == transData.email
      ) {
        if (result.suspicious) {
          axios.patch("http://localhost:3000/details", { status: "blocked" });
          sendMail({ email: transData.email, name: transData.name });
          console.log("Suspicious transaction");
          console.log(`Reason: ${result.reason}`);

          toast({
            title: "Suspicious transaction",
            description: `${result.reason}`,
            variant: "destructive",
          });
        } else {
          console.log("Transaction successfull");
          toast({
            title: "Transaction successfull",
          });
        }
      } else {
        console.log("Invalid credentials");
        toast({
          title: "Invalid credentials",
          variant: "destructive",
        });
      }
    }
  };

  const totalPrice = async () => {};

  return (
    <div className=" relative w-full min-h-screen bg-[#FEF4E7]">
      {modal ? (
        <div className=" w-full h-screen z-50 bg-[#00000080] absolute left-0 top-0">
          <div className=" relative w-[50%] items-center bg-white translate-y-[45%] shadow-xl h-[50vh] rounded-xl mx-auto flex flex-col justify-center">
            <button
              onClick={() => setModal(false)}
              className=" absolute right-10 top-10"
            >
              <XCircle />
            </button>
            {error ? (
              <div className=" flex flex-col items-center space-y-5">
                <XCircle size={120} className=" text-red-500" />
                <h1 className=" font-bold text-3xl">
                  This card has been blocked
                </h1>
                <p className=" text-gray-500">
                  A suspicious action has been detected from this card and it
                  has been blocked
                </p>
              </div>
            ) : (
              <div className=" flex flex-col items-center space-y-5">
                <CheckCircle size={120} className=" text-emerald-500" />
                <h1 className=" font-bold text-3xl">Transaction Successful</h1>
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div className=" w-[85%] pt-10 mx-auto grid grid-cols-2 gap-x-32 ">
        <div>
          <h1 className=" font-semibold text-3xl">Summary Order</h1>
          <br />
          <div className=" p-5 shadow-xl rounded-xl  ">
            <div className=" grid grid-cols-3 gap-6">
              {Cards.map((item, index) => {
                return (
                  <button
                    onClick={() => setCardType(index)}
                    key={index}
                    className={`p-5 border-2 transition-all ease-in duration-150 delay-75 w-fit rounded-lg flex items-center space-x-5 border-black ${
                      index == cardType ? "opacity-100" : "opacity-15"
                    } `}
                  >
                    <div>
                      <h1>***8034</h1>
                      <p className=" capitalize">{item.name} Card</p>
                    </div>
                    <CreditCard
                      size={40}
                      className={` text-[${item.color}] `}
                      color={item.color}
                    />
                  </button>
                );
              })}
            </div>

            <br />

            <form className=" max-w-[69%]">
              <label
                htmlFor="category"
                className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
              >
                Select an Expense Category
              </label>
              <select
                id="category"
                value={expType}
                onChange={(e) => setExpType(Number(e.target.value))}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={0}>Food</option>
                <option value={1}>Entertainment</option>
                <option value={2}>Fuel</option>
                <option value={3}>Bills</option>
                <option value={4}>Grocery</option>
                <option value={5}>Travel</option>
                <option value={6}>Personal_Care</option>
                <option value={7}>Health_Fitness</option>
                <option value={8}>Home</option>
              </select>
            </form>

            <br />

            <form className=" max-w-[69%]">
              <label
                htmlFor="gender"
                className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
              >
                Select Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(Number(e.target.value))}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={0}>Female</option>
                <option value={1}>Male</option>
              </select>
            </form>

            <br />

            <form className=" max-w-[69%]">
              <label
                htmlFor="type"
                className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
              >
                Transaction Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(Number(e.target.value))}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={0}>Transfer</option>
                <option value={1}>Cashout</option>

                <option value={3}>Debit</option>
                <option value={4}>Payment</option>
              </select>
            </form>

            <br />
            <div className=" w-[60%] space-y-2">
              <h1>Account Balance</h1>
              <input
                type="nuber"
                className=" w-full p-3 rounded-lg border-2"
                placeholder="Enter balance"
                onChange={(e) => setOldBance(Number(e.target.value))}
                value={oldBalance}
              />
            </div>

            <br />
            <div className=" w-[60%] space-y-2">
              <h1>Checkout Total</h1>
              <input
                type="number"
                className=" w-full p-3 rounded-lg border-2"
                placeholder="Enter balance"
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount}
              />
            </div>
          </div>
        </div>
        <div>
          <div className=" w-full shadow-xl text-white font-medium rounded-xl p-6 bg-gradient-to-r from-[#660202] to-[#2e1717] shadow-[#2e171763] ">
            <div className=" w-full flex items-start justify-between">
              <div className=" flex flex-col justify-start items-start">
                <h1 className=" text-lg">Debit Card</h1>
                <Image src={chip} width={100} height={100} alt="" />
              </div>
              <Image src={master} width={50} height={50} alt="" />
            </div>

            <div className=" w-full text-3xl flex space-x-8 font-semibold">
              <span>1234</span>
              <span>5678</span>
              <span>9012</span>
              <span>3456</span>
            </div>
            <br />

            <div className=" flex items-start space-x-10">
              <div>
                <p className=" text-sm">Expiry Date</p>
                <p>11/21</p>
              </div>

              <div>
                <p className=" text-sm">CVV Number</p>
                <p>123</p>
              </div>
            </div>
            <br />
            <h1 className=" text-xl">ELON MUSK</h1>
          </div>
          <br />
          <h1 className=" font-semibold text-3xl">Payment Details</h1>
          <form className=" space-y-4">
            <br />
            <div>
              <p className=" font-semibold text-lg mb-4">Email Address</p>
              <Input
                type="email"
                className=" h-14 bg-transparent"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p className=" font-semibold text-lg mb-4">Card Detail</p>
              <div className=" w-full border-2 flex justify-between items-center rounded-lg ">
                <input
                  className=" w-[75%] p-6 bg-transparent"
                  type="text"
                  placeholder="Card Number"
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <div className=" flex items-center w-fit">
                  <input
                    className=" bg-transparent border-none outline-none w-[5rem] "
                    type="text"
                    placeholder="MM/YY"
                    onChange={(e) => setExp(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    onChange={(e) => setCvc(e.target.value)}
                    className="w-[5rem] bg-transparent border-none outline-none"
                  />
                </div>
              </div>
            </div>
            {/* <div>
              <p className=" font-semibold text-lg mb-4">Card Holder</p>
              <Input
                type="text"
                className=" h-14"
                onChange={(e) => setHolder(e.target.value)}
              />
            </div> */}
            <div className=" w-full flex items-center justify-between mt-4">
              <h1 className=" font-bold text-xl">Total</h1>
              <h1 className=" font-bold text-xl">${amount}</h1>
            </div>
            <Button
              type="button"
              onClick={predict}
              className=" w-full h-16 text-xl font-bold bg-[#660202] shadow-lg"
            >
              {loading ? (
                <p>
                  <Loader className=" animate-spin" /> processing...
                </p>
              ) : (
                <p>Pay {amount}</p>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
