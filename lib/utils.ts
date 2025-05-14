import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {points} from "@/lib/product-list";
import {paymentMethods} from "@/lib/payment-list";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  return Date.now() + Math.floor(Math.random() * 10000)
}

export function fromHash(value: string) {
  return points.find((item) => item.id === value)
}

export function findPayment(payment: string) {
  const allPayments = [
    ...paymentMethods.ewallets,
    ...paymentMethods.virtualAccounts,
    ...paymentMethods.retailStores,
  ];

  return allPayments.find((item) => item.id === payment)?.name || "Undefined payment";
}

export function formatCurrency(number: number) {
  return new Intl.NumberFormat("id-ID").format(number);
}
