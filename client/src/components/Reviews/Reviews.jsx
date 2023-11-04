import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useGetReviewsByServiceIdQuery } from "../../features/review/reviewApi";

const Reviews = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);

  // get all reviews
  const { data } = useGetReviewsByServiceIdQuery(serviceId);

  useEffect(() => {
    if (data?.length > 0) {
      setReviews(data);
    }
  }, [data]);
  return (
    <div className="flex flex-col gap-5">
      {reviews?.map((review) => (
        <div key={review?._id} className="bg-white border rounded-md py-6 px-5">
          <div className="flex gap-5">
            <div className="w-10 h-10">
              <img
                className="w-10 h-10 rounded-full"
                src={
                  review?.profile?.profilePic
                    ? `${process.env.REACT_APP_SERVER_URL}${review?.profile?.profilePic}`
                    : "/img/users/1.jpg"
                }
                alt="user"
              />
            </div>
            <div className="w-full">
              <div className="flex items-center gap-3">
                <h3>{`${review?.profile?.firstName} ${review?.profile?.lastName}`}</h3>
                <div className="flex items-center gap-1 text-orange-300 font-bold">
                  <AiFillStar />
                  <span>{review?.rating}</span>
                </div>
              </div>
              <h4 className="mt-2 text-gray-500">
                {review?.profile?.country || "Unknown"}
              </h4>
              <p className="mt-2 font-medium">{review?.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
