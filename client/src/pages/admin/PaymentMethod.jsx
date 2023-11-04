/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdPayment } from "react-icons/md";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  useAddNewPaymentMutation,
  useDeletePaymentMutation,
  useGetPaymentMethodsQuery,
  useUpdatePaymentMutation,
} from "../../features/payment/paymentApi";

const PaymentMethod = () => {
  const [methodName, setMethodName] = useState();
  const [paymentDetails, setPaymentDetails] = useState();
  const [errors, setErrors] = useState({});
  const [addNew, setAddNew] = useState(false);
  const [editedItem, setEditedItem] = useState();
  const [paymentMethods, setPaymentMethods] = useState([]);

  // get all payment methods
  const { data, isLoading, isError, error } = useGetPaymentMethodsQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setPaymentMethods(data);
    }
  }, [data]);

  // api request
  const [addNewPayment, { data: newPayment }] = useAddNewPaymentMutation();

  useEffect(() => {
    if (newPayment?._id) {
      const updatePamentMethods = [...paymentMethods, newPayment];
      setPaymentMethods(updatePamentMethods);
      setAddNew(false);
      toast.success("Payment method added successfully");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPayment]);

  // add Payment Handler
  const addPaymentHandler = (e) => {
    e.preventDefault();

    // check validation
    const validationError = {};

    if (!methodName) {
      validationError.methodName = "Method Name is Required!";
    }

    if (!paymentDetails) {
      validationError.paymentDetails = "Payment Details is Required!";
    }

    if (Object.keys(validationError)?.length > 0) {
      return setErrors(validationError);
    }

    // add new payemnt method
    addNewPayment({
      methodName,
      paymentDetails,
    });
  };

  // delete payment method
  const [deletePayment, { data: deletedPayment }] = useDeletePaymentMutation();

  useEffect(() => {
    if (deletedPayment?._id) {
      const newPaymentMethods = paymentMethods?.filter(
        (item) => item._id !== deletedPayment?._id
      );

      setPaymentMethods(newPaymentMethods);

      toast.success("Payment Method Deleted Success");
    }
  }, [deletedPayment]);

  const deletePaymentHandler = (id) => {
    deletePayment(id);
  };

  // update payment method

  // set payment state
  useEffect(() => {
    if (editedItem?._id) {
      setAddNew(true);
      setMethodName(editedItem?.methodName);
      setPaymentDetails(editedItem?.paymentDetails);
    } else {
      setMethodName("");
      setPaymentDetails("");
    }
  }, [editedItem]);

  // api request
  const [updatePayment, { data: updatedPayment }] = useUpdatePaymentMutation();

  useEffect(() => {
    if (updatedPayment?._id) {
      const updatePaymentMethods = paymentMethods?.map((item) => {
        if (updatedPayment?._id === item?._id) {
          return updatedPayment;
        } else {
          return item;
        }
      });

      setPaymentMethods(updatePaymentMethods);
      toast.success("Payment Method Updated Successfully.");
      setAddNew(false);
    }
  }, [updatedPayment]);

  // update payment handler
  const updatePaymentHandler = (e) => {
    e.preventDefault();

    // check validation
    const validationError = {};

    if (!methodName) {
      validationError.methodName = "Method Name is Required!";
    }

    if (!paymentDetails) {
      validationError.paymentDetails = "Payment Details is Required!";
    }

    if (Object.keys(validationError)?.length > 0) {
      return setErrors(validationError);
    }

    updatePayment({
      id: editedItem?._id,
      data: { methodName, paymentDetails },
    });
  };

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && error) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !error && paymentMethods?.length === 0)
    content = <span>No Payment Method Found!!</span>;

  if (!isLoading && !isError && paymentMethods?.length > 0) {
    content = paymentMethods?.map((method, idx) => {
      const { _id, methodName, paymentDetails, status } = method;

      return (
        <tr key={_id} className="border-b hover:bg-[#F1F5F9]">
          <td className="py-4 px-4 border-r">{idx + 1}</td>
          <td className="py-4 px-4 border-r">{methodName}</td>
          <td className="py-4 px-4 border-r">{paymentDetails}</td>
          <td className="py-4 px-4 border-r">
            <select
              className="border rounded py-2 px-4 outline-none focus:ring-1"
              onChange={(e) =>
                updatePayment({ id: _id, data: { status: e.target.value } })
              }
            >
              <option>Select Status</option>
              <option selected={status === "active"} value="active">
                Active
              </option>
              <option selected={status === "inactive"} value="inactive">
                Inactive
              </option>
            </select>
          </td>
          <td className="py-4 px-4 border-r">
            <div className="flex items-center gap-5">
              <button
                className="bg-primary text-white block py-2 px-4 rounded transition hover:bg-primary/60"
                onClick={() => setEditedItem(method)}
              >
                Edit
              </button>
              <button
                className="bg-red-700 text-white block py-2 px-4 rounded transition hover:bg-red-700/60"
                onClick={() => deletePaymentHandler(_id)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }
  return (
    <AdminLayout title="Payment Method" icon={<MdPayment />}>
      <div className="py-4 px-5 rounded-md bg-white border">
        <h3 className="text-lg mb-4">
          Payment Method Lists ({paymentMethods?.length})
        </h3>
        <div className="flex items-center justify-between">
          <input
            className="py-2 px-4 border min-w-[360px] rounded-[5px] outline-none focus:ring-1 inline-block"
            type="text"
            placeholder="Search payment method by method name"
          />
          <button
            class="bg-primary text-white py-[10px] px-7 inline-block uppercase text-[13px] font-semibold mt-4 transition border border-transparent hover:border-light hover:bg-white hover:text-secondary rounded-md cursor-pointer"
            onClick={() => setAddNew(true)}
          >
            Create New Payment Method
          </button>
        </div>
      </div>

      <div className="p-5 mt-5 bg-white border rounded-lg w-full">
        <table class="table-auto w-full border">
          <thead className="bg-[#F8FAFC] border text-left box-border">
            <tr>
              <th className="text-sm py-2 px-4 border-r">SL</th>
              <th className="text-sm py-2 px-4 border-r">Method Name</th>
              <th className="text-sm py-2 px-4 border-r">Payment Details</th>
              <th className="text-sm py-2 px-4 border-r">Status</th>
              <th className="text-sm py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>

      {/* add payment method box */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/40 flex items-center transition-all duration-300 justify-center ${
          addNew ? "scale-100" : "scale-0"
        }`}
      >
        <div className="bg-white rounded-md min-w-[600px] overflow-hidden">
          <h3 className="text-[17px] font-semibold bg-[#F8F8F8] px-4 py-3">
            {editedItem?._id
              ? "Update Payment Method"
              : "Create New Payment Method"}
          </h3>
          <form
            onSubmit={
              editedItem?._id ? updatePaymentHandler : addPaymentHandler
            }
          >
            <div className="px-4 mt-3">
              <label htmlFor="methodName" className="font-bold text-sm">
                Method Name
              </label>
              <input
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                id="methodName"
                type="text"
                placeholder="Enter Your Method Name"
                value={methodName}
                onChange={(e) => setMethodName(e.target.value)}
              />
              {errors?.methodName && (
                <p className="mt-2 text-red-600">{errors?.methodName}</p>
              )}
            </div>
            <div className="px-4 mt-3">
              <label htmlFor="details" className="font-bold text-sm">
                Payment Details
              </label>
              <textarea
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-28"
                id="details"
                type="text"
                placeholder="Enter Your Payment Details."
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
              />
              {errors?.paymentDetails && (
                <p className="mt-2 text-red-600">{errors?.paymentDetails}</p>
              )}
            </div>
            <div className="flex items-center gap-2 p-4 justify-end">
              <button className="text-sm font-medium py-[8px] px-[14px] rounded-[4px] outline-none bg-[#3085D6] block text-white hover:bg-[#3085D6]/60">
                {editedItem?._id ? "Update Method" : "Add New"}
              </button>
              <div
                className="text-sm font-medium py-[8px] px-[14px] rounded-[4px] outline-none bg-[#DD3333] block text-white hover:bg-[#DD3333]/60 cursor-pointer"
                onClick={() => {
                  setAddNew(false);
                  setEditedItem({});
                }}
              >
                Cancel
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentMethod;
