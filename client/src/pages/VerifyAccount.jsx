import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyAccountQuery } from "../features/auth/authApi";

const VerifyAccount = () => {
  const { userId } = useParams();
  const { data, isLoading } = useVerifyAccountQuery(userId);

  // navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.success) {
      toast.success("Your account has been verified");
      navigate("/login");
    }
  }, [data, navigate]);
  return isLoading ? (
    <div className="py-[60px]">
      <div className="container mx-auto">
        <div className="w-3/6 mx-auto py-5 px-6 rounded-md shadow-md border text-center">
          <img src="/img/loading.gif" className="mx-auto w-28" alt="loading" />
          <h3 className="text-xl mt-3">Account is Verifying...</h3>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default VerifyAccount;
