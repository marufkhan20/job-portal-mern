import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { MdHomeRepairService } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAddServiceMutation } from "../../features/service/serviceApi";

const AddService = () => {
  const editorRef = useRef(null);
  const [serviceImages, setServiceImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [title, setTitle] = useState();
  const [shortDescription, setShortDescription] = useState();
  const [basicName, setBasicName] = useState();
  const [basicPrice, setBasicPrice] = useState();
  const [basicDelivery, setBasicDelivery] = useState();
  const [basicRevision, setBasicRevision] = useState();
  const [basicDescription, setBasicDescription] = useState();
  const [standardName, setStandardName] = useState();
  const [standardPrice, setStandardPrice] = useState();
  const [standardDelivery, setStandardDelivery] = useState();
  const [standardRevision, setStandardRevision] = useState();
  const [standardDescription, setStandardDescription] = useState();
  const [premiumName, setPremiumName] = useState();
  const [premiumPrice, setPremiumPrice] = useState();
  const [premiumDelivery, setPremiumDelivery] = useState();
  const [premiumRevision, setPremiumRevision] = useState();
  const [premiumDescription, setPremiumDescription] = useState();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const captureImage = (e) => {
    setImageLoading(true);
    let files = e.target.files;
    files = [...files];

    const filesArr = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // setCoverImage(reader.result);
        filesArr.push(reader.result);
      };
    });

    setTimeout(() => {
      errors.serviceImages = "";
      setErrors(errors);
      setServiceImages(filesArr);
      setImageLoading(false);
    }, [1000]);
  };

  const [addService, { data: newService }] = useAddServiceMutation();

  useEffect(() => {
    if (newService?._id) {
      toast.success("New Service added successfully");
      navigate("/admin/services");
    }
  }, [newService, navigate]);

  // handle submtit
  const handleSubmit = (e) => {
    e.preventDefault();

    // check validation
    const validationError = {};

    if (!title) {
      validationError.title = "Title is required";
    }

    if (serviceImages?.length === 0) {
      validationError.serviceImages = "Service Images is required";
    }

    if (!editorRef.current.getContent()) {
      validationError.fullDescription = "Full Description is required";
    }

    if (Object.keys(validationError).length > 0) {
      return setErrors(validationError);
    }

    // add new service
    addService({
      title,
      fullDescription: editorRef.current.getContent(),
      shortDescription,
      serviceImages,
      basicName,
      basicPrice,
      basicDelivery,
      basicRevision,
      basicDescription,
      standardName,
      standardPrice,
      standardDelivery,
      standardRevision,
      standardDescription,
      premiumName,
      premiumPrice,
      premiumDelivery,
      premiumRevision,
      premiumDescription,
    });
  };
  return (
    <AdminLayout title="Add New Service" icon={<MdHomeRepairService />}>
      <div className=" bg-white mt-5 rounded-md mb-10">
        {/* edit form */}
        <div className="py-6 px-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="w-full">
              <label htmlFor="firstName" className="font-bold text-sm">
                Service Title*
              </label>
              <input
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                id="firstName"
                type="text"
                placeholder="Enter your service title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {errors?.title && (
                <div>
                  <p className="text-red-600 font-medium mt-2">
                    {errors?.title}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="shortDescription" className="font-bold text-sm">
                Service Short Description
              </label>
              <textarea
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-28"
                id="shortDescription"
                placeholder="Enter your service short description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label className="font-bold text-sm">Add Service Images*</label>
              <input
                id="images"
                className="hidden"
                multiple
                type="file"
                onChange={captureImage}
              />
              <label
                htmlFor="images"
                className="block w-full font-semibold py-4 cursor-pointer px-3 border rounded-[4px] font-regular text-sm outline-none focus:ring-1 mt-3 text-center text-white bg-primary"
              >
                Add Service Images
              </label>
              {errors?.serviceImages && (
                <div>
                  <p className="text-red-600 font-medium mt-2">
                    {errors?.serviceImages}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-7 items-center justify-between">
              {serviceImages.map((image) => {
                return (
                  <div className="w-full border rounded-lg p-3">
                    <img
                      className="rounded-lg mx-auto"
                      src={image}
                      alt="project"
                    />
                  </div>
                );
              })}
            </div>

            {imageLoading && (
              <div className="text-center">
                <img
                  className="mx-auto w-16"
                  src="/img/loading.gif"
                  alt="loading"
                />
              </div>
            )}

            <div className="flex flex-col gap-5">
              <h3 className="text-xl py-3 border-b border-t">Basic Plan</h3>

              <div className="flex gap-6">
                <div className="w-full">
                  <label htmlFor="PlanName" className="font-bold text-sm">
                    Plan Name*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="PlanName"
                    type="text"
                    placeholder="Enter Your Basic Plan Name"
                    value={basicName}
                    onChange={(e) => setBasicName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="basicPrice" className="font-bold text-sm">
                    Plan Price*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="basicPrice"
                    type="text"
                    placeholder="Enter Basic Plan Price"
                    value={basicPrice}
                    onChange={(e) => setBasicPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-full">
                  <label htmlFor="basicDelivery" className="font-bold text-sm">
                    Delivery Days*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="basicDelivery"
                    type="text"
                    placeholder="Enter Your Basic Plan Delivery Days"
                    value={basicDelivery}
                    onChange={(e) => setBasicDelivery(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="basicRevision" className="font-bold text-sm">
                    Revision Number*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="basicRevision"
                    type="text"
                    placeholder="Enter Basic Plan Revision Number"
                    value={basicRevision}
                    onChange={(e) => setBasicRevision(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="basicDescription" className="font-bold text-sm">
                  Plan Description
                </label>
                <textarea
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-28"
                  id="basicDescription"
                  placeholder="Enter your basic plan description"
                  value={basicDescription}
                  onChange={(e) => setBasicDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-xl py-3 border-b border-t">Standard Plan</h3>

              <div className="flex gap-6">
                <div className="w-full">
                  <label htmlFor="standardName" className="font-bold text-sm">
                    Plan Name*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="standardName"
                    type="text"
                    placeholder="Enter Your Standard Plan Name"
                    value={standardName}
                    onChange={(e) => setStandardName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="standardPrice" className="font-bold text-sm">
                    Plan Price*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="standardPrice"
                    type="text"
                    placeholder="Enter Standard Plan Price"
                    value={standardPrice}
                    onChange={(e) => setStandardPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-full">
                  <label
                    htmlFor="standardDelivery"
                    className="font-bold text-sm"
                  >
                    Delivery Days*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="standardDelivery"
                    type="text"
                    placeholder="Enter Your Standard Plan Delivery Days"
                    value={standardDelivery}
                    onChange={(e) => setStandardDelivery(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="standardRevision"
                    className="font-bold text-sm"
                  >
                    Revision Number*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="standardRevision"
                    type="text"
                    placeholder="Enter Standard Plan Revision Number"
                    value={standardRevision}
                    onChange={(e) => setStandardRevision(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="standardDescription"
                  className="font-bold text-sm"
                >
                  Plan Description
                </label>
                <textarea
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-28"
                  id="standardDescription"
                  placeholder="Enter your Standard plan description"
                  value={standardDescription}
                  onChange={(e) => setStandardDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-xl py-3 border-b border-t">Premium Plan</h3>

              <div className="flex gap-6">
                <div className="w-full">
                  <label htmlFor="premiumName" className="font-bold text-sm">
                    Plan Name*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="premiumName"
                    type="text"
                    placeholder="Enter Your Premium Plan Name"
                    value={premiumName}
                    onChange={(e) => setPremiumName(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="premiumPrice" className="font-bold text-sm">
                    Plan Price*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="premiumPrice"
                    type="text"
                    placeholder="Enter Premium Plan Price"
                    value={premiumPrice}
                    onChange={(e) => setPremiumPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-full">
                  <label
                    htmlFor="premiumDelivery"
                    className="font-bold text-sm"
                  >
                    Delivery Days*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="premiumDelivery"
                    type="text"
                    placeholder="Enter Your Premium Plan Delivery Days"
                    value={premiumDelivery}
                    onChange={(e) => setPremiumDelivery(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="premiumRevision"
                    className="font-bold text-sm"
                  >
                    Revision Number*
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="premiumRevision"
                    type="text"
                    placeholder="Enter Premium Plan Revision Number"
                    value={premiumRevision}
                    onChange={(e) => setPremiumRevision(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="premiumDescription"
                  className="font-bold text-sm"
                >
                  Plan Description
                </label>
                <textarea
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-28"
                  id="premiumDescription"
                  placeholder="Enter your Premium plan description"
                  value={premiumDescription}
                  onChange={(e) => setPremiumDescription(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-sm mb-3 block">
                Service Full Description*
              </label>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              {errors?.fullDescription && (
                <div>
                  <p className="text-red-600 font-medium mt-2">
                    {errors?.fullDescription}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="reset"
                className="flex items-center hover:bg-light px-8 py-2 rounded-[4px] gap-[5px] font-medium transition cursor-pointer border"
              >
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="flex items-center text-white bg-primary px-8 py-2 rounded-[4px] gap-[5px] font-medium transition hover:bg-primary/70 border border-primary"
              >
                <span>Add Service</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddService;
