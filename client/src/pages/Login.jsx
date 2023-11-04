import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // navigation
  const navigate = useNavigate();

  // registation function
  const [login, { data, isLoading, isError, error: responseError }] =
    useLoginMutation();

  useEffect(() => {
    if (isError) {
      console.log(responseError);
      setErrors(responseError?.data?.error);
    }

    console.log(data);

    if (data?.user?.userId) {
      // show aler message
      toast.success("User Logged In Successfully");

      // clear state
      setErrors({});
      setEmail("");
      setPassword("");

      // navigate to login page
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate(`/profile/${data?.user?.userId}`);
      }
    }
  }, [data, isLoading, isError, responseError, navigate]);

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check validation
    const validationError = {};

    if (!email) {
      validationError.email = "Email is required";
    }

    if (!password) {
      validationError.password = "Password is required";
    }

    if (Object.keys(validationError).length > 0) {
      return setErrors(validationError);
    }

    // create new user
    login({ email, password });
  };
  return (
    <main>
      <div className="container mx-auto my-14">
        <div className="w-3/6 mx-auto shadow-md p-10 rounded-lg border">
          <h2 className="text-2xl">Sign up to Trusted Tool</h2>

          <div className="mt-8">
            {/* edit form */}
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="email" className="font-bold text-sm">
                    Email*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-4 px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors?.email && (
                    <div className="mt-2 text-red-600">
                      <p>{errors?.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="font-bold text-sm">
                      Password*
                    </label>
                    <Link className="text-primary font-bold text-base" to="#">
                      Forgot Password?
                    </Link>
                  </div>
                  <input
                    className="block w-full bg-[#F9F9F9] py-4 px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors?.password && (
                    <div className="mt-2 text-red-600">
                      <p>{errors?.password}</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="block text-center text-white bg-primary px-8 py-3 rounded-[4px] gap-[5px] font-medium transition hover:bg-primary/70 border border-primary"
                >
                  <span>Sign In</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
