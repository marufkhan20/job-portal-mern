import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authApi";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // navigation
  const navigate = useNavigate();

  // registation function
  const [register, { data, isLoading, isError, error: responseError }] =
    useRegisterMutation();

  useEffect(() => {
    if (isError) {
      console.log(responseError);
      setErrors(responseError?.data?.error);
    }

    if (data?.user?._id) {
      // show aler message
      toast.success("User Created Successfully");

      // clear state
      setErrors({});
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // navigate to login page
      navigate("/login");
    }
  }, [data, isLoading, isError, responseError, navigate]);

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check validation
    const validationError = {};

    if (!firstName) {
      validationError.firstName = "First name is required";
    }

    if (!lastName) {
      validationError.lastName = "Last name is required";
    }

    if (!email) {
      validationError.email = "Email is required";
    }

    if (!password) {
      validationError.password = "Password is required";
    }

    if (!confirmPassword) {
      validationError.confirmPassword = "Confirm password is required";
    }

    if (password !== confirmPassword) {
      validationError.confirmPassword =
        "Password and confirm password does not match";
    }

    if (Object.keys(validationError).length > 0) {
      return setErrors(validationError);
    }

    // create new user
    register({ firstName, lastName, email, password, confirmPassword });
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
                <div className="flex gap-6">
                  <div className="w-full">
                    <label htmlFor="firstName" className="font-bold text-sm">
                      First Name*
                    </label>
                    <input
                      className="block w-full bg-[#F9F9F9] py-4 px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && (
                      <div className="mt-2 text-red-600">
                        <p>{errors?.firstName}</p>
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <label htmlFor="lastName" className="font-bold text-sm">
                      Last Name*
                    </label>
                    <input
                      className="block w-full bg-[#F9F9F9] py-4 px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && (
                      <div className="mt-2 text-red-600">
                        <p>{errors?.lastName}</p>
                      </div>
                    )}
                  </div>
                </div>

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
                  {errors.email && (
                    <div className="mt-2 text-red-600">
                      <p>{errors?.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="font-bold text-sm">
                    Password*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-4 px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="mt-2 text-red-600">
                      <p>{errors?.password}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="font-bold text-sm"
                  >
                    Confirm Password*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-4 px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <div className="mt-2 text-red-600">
                      <p>{errors?.confirmPassword}</p>
                    </div>
                  )}
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="block text-center text-white bg-primary px-8 py-3 rounded-[4px] gap-[5px] font-medium transition hover:bg-primary/70 border border-primary"
                >
                  <span>Sign Up</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
