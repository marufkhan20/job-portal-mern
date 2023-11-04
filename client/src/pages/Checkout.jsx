import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCreateOrderMutation } from "../features/order/orderApi";
import { useGetActivePaymentMethodsQuery } from "../features/payment/paymentApi";
import { useGetServiceQuery } from "../features/service/serviceApi";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [number, setNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [errors, setErrors] = useState({});

  const captureImage = (e) => {
    let file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setScreenshot(reader.result);
    };
  };

  // get all active payment method
  const { data: paymentMethods } = useGetActivePaymentMethodsQuery();

  // set payment details
  useEffect(() => {
    if (paymentMethod) {
      paymentMethods?.forEach((item) => {
        if (item?._id === paymentMethod) {
          setPaymentDetails(item?.paymentDetails);
        }
      });
    } else {
      setPaymentDetails("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod]);

  // get query
  const { search: query } = useLocation();
  const queryArr = query?.split("=");
  const packageName = queryArr[1];

  // service id
  const { id } = useParams();

  // navigate
  const navigate = useNavigate();

  // get service
  const { data: service } = useGetServiceQuery(id);

  // create new order
  const [createOrder, { data: newOrder, isError, error }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (isError) {
      console.log(error?.data);
    }

    if (newOrder?._id) {
      toast.success("Order Place Successfully");
      navigate(`/order/inbox/${newOrder?._id}/${newOrder?.user}`);
    }
  }, [newOrder, isError, error, navigate]);

  // handle submit
  const submitHandler = (e) => {
    e?.preventDefault();

    // check validation
    const validationError = {};

    if (!paymentMethod) {
      validationError.paymentMethod = "Please Select Payment Method!!";
    }

    if (!number) {
      validationError.number = "Please Provide Payment Send Number!!";
    }

    if (!screenshot) {
      validationError.screenshot = "Payment Screenshot is required!!";
    }

    if (!transactionId) {
      validationError.transactionId = "Please Provide Payment Transaction ID!!";
    }

    if (Object.keys(validationError)?.length > 0) {
      return setErrors(validationError);
    }

    createOrder({
      packageName: service?.[`${packageName}Name`],
      packagePrice: service?.[`${packageName}Price`],
      pakcageDescription: service?.[`${packageName}Description`],
      paymentMethod,
      paymentNumber: number,
      transactionId,
      service: service?._id,
      screenshot,
    });
  };
  return (
    <main className="py-[60px] bg-[#F5F7F9]">
      <div className="container mx-auto">
        <h2 className="text-[32px] pb-6 border-b-2">Order Confirmation</h2>

        <div className="flex gap-5 mt-10">
          <div className="w-3/5 bg-white border rounded-md">
            <h3 className="px-5 py-4 text-lg border-b">
              Total Payable Amount : AUD ${service?.[`${packageName}Price`]}
            </h3>

            <div className="p-5">
              <div class="pb-7 border-b">
                <h4 class="text-base font-semibold mb-3">Payment Details:</h4>
                {paymentDetails && (
                  <p class="text-[#717171]">{paymentDetails}</p>
                )}
              </div>

              <form
                onSubmit={submitHandler}
                className="flex flex-col gap-5 mt-5"
              >
                <div className="w-full">
                  <label htmlFor="method" className="font-bold text-sm">
                    Select Payment Method*
                  </label>
                  <select
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="method"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">Select Payment Method</option>
                    {paymentMethods?.map((item) => (
                      <option key={item?._id} value={item?._id}>
                        {item?.methodName}
                      </option>
                    ))}
                  </select>
                  {errors?.paymentMethod && (
                    <p className="mt-2 text-red-600">{errors?.paymentMethod}</p>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="screenshot" className="font-bold text-sm">
                    Screenshot*
                  </label>
                  <label
                    htmlFor="screenshot"
                    className="block bg-green-500 text-white py-2 text-center font-semibold mt-3 rounded-md"
                  >
                    Upload Screenshot
                  </label>
                  <input
                    type="file"
                    onChange={captureImage}
                    id="screenshot"
                    className="hidden"
                  />
                  {errors?.screenshot && (
                    <p className="mt-2 text-red-600">{errors?.screenshot}</p>
                  )}
                </div>

                {screenshot && (
                  <div className="w-full">
                    <img src={screenshot} className="w-1/3" alt="screenshot" />
                  </div>
                )}

                <div className="w-full">
                  <label htmlFor="number" className="font-bold text-sm">
                    Number*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="number"
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter your Number"
                  />
                  {errors?.number && (
                    <p className="mt-2 text-red-600">{errors?.number}</p>
                  )}
                </div>

                <div className="w-full">
                  <label htmlFor="transactionId" className="font-bold text-sm">
                    Transaction ID*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="transactionId"
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter your Transaction ID"
                  />
                  {errors?.transactionId && (
                    <p className="mt-2 text-red-600">{errors?.transactionId}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="w-2/5 bg-white border rounded-md h-fit">
            <h3 className="px-5 py-4 text-lg border-b">Service Information</h3>

            <div className="p-5">
              <div className="flex gap-3 pb-5 border-b">
                <img
                  className="w-[130px] rounded-md"
                  src={`${process.env.REACT_APP_SERVER_URL}${service?.serviceImages[0]}`}
                  alt="service"
                />
                <div>
                  <h4 className="text-lg font-semibold mb-3">
                    {service?.title}
                  </h4>
                  <p className="text-black mb-3">Thu, Jun 30, 2022 4:30 AM</p>
                  <h3>Package: {service?.[`${packageName}Name`]}</h3>
                </div>
              </div>

              <div className="flex items-center justify-between py-5">
                <h3>Total</h3>
                <h3>AUD ${service?.[`${packageName}Price`]}</h3>
              </div>

              <div>
                <button
                  className="text-white bg-primary px-8 py-3 rounded-[4px] gap-[5px] font-semibold transition hover:bg-primary/70 border border-primary block w-full text-center"
                  onClick={submitHandler}
                >
                  <span>Confirm & Pay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
