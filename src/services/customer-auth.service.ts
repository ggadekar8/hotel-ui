import axiosClient from "./axiosClient";
import customerUsers from "./mock-data/CustomerUser.json";
export interface CustomerOtpRequest {
  name: string;
  phone: string;
  tableId?: string;
}

export interface CustomerOtpVerification extends CustomerOtpRequest {
  otp: string;
}


interface VerifyOtpResponse {
  customer: VerifiedCustomer;
}

export const sendCustomerOtp = async (
  request: CustomerOtpRequest,
): Promise<void> => {
//   await axiosClient.post("/auth/customer/send-otp", request, {
//     withCredentials: true,
//   });
};

export const verifyCustomerOtp = async (
  request: CustomerOtpVerification,
): Promise<VerifiedCustomer> => {
//   const response = await axiosClient.post<VerifyOtpResponse>(
//     "/auth/customer/verify-otp",
//     request,
//     { withCredentials: true },
//   );

//   return response.data.customer;
return customerUsers[0];
};
