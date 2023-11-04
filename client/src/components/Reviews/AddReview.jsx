/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { BsStar } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useCreateReviewMutation } from "../../features/review/reviewApi";

const AddReview = ({ setReview, order, service }) => {
  const { user } = useSelector((state) => state.auth || {});
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  // create review
  const [createReview, { data: review }] = useCreateReviewMutation();

  useEffect(() => {
    if (review?._id) {
      setReview(review);
      toast.success("Review added successfully");
    }
  }, [review]);

  // handle add review
  const handleAddReview = (e) => {
    if (rating && description) {
      createReview({
        rating,
        description,
        order,
        service,
        profile: user?.profileId,
      });
    }
  };
  return (
    <div className="bg-white py-6 px-5 rounded-md border">
      <div>
        <label for="review" class="font-bold text-sm">
          Add Ratting
        </label>
        <div className="flex gap-2 mt-3">
          {rating >= 1 ? (
            <AiFillStar
              onClick={() => setRating(1)}
              className="text-orange-500 text-lg"
            />
          ) : (
            <BsStar
              onClick={() => setRating(1)}
              className={`cursor-pointer font-bold ${
                rating >= 1 && "text-orange-500"
              }`}
            />
          )}

          {rating >= 2 ? (
            <AiFillStar
              onClick={() => setRating(2)}
              className="text-orange-500 text-lg"
            />
          ) : (
            <BsStar
              onClick={() => setRating(2)}
              className={`cursor-pointer font-bold ${
                rating >= 2 && "text-orange-500"
              }`}
            />
          )}

          {rating >= 3 ? (
            <AiFillStar
              onClick={() => setRating(3)}
              className="text-orange-500 text-lg"
            />
          ) : (
            <BsStar
              onClick={() => setRating(3)}
              className={`cursor-pointer font-bold ${
                rating >= 3 && "text-orange-500"
              }`}
            />
          )}

          {rating >= 4 ? (
            <AiFillStar
              onClick={() => setRating(4)}
              className="text-orange-500 text-lg"
            />
          ) : (
            <BsStar
              onClick={() => setRating(4)}
              className={`cursor-pointer font-bold ${
                rating >= 4 && "text-orange-500"
              }`}
            />
          )}

          {rating >= 5 ? (
            <AiFillStar
              onClick={() => setRating(5)}
              className="text-orange-500 text-lg"
            />
          ) : (
            <BsStar
              onClick={() => setRating(5)}
              className={`cursor-pointer font-bold ${
                rating >= 5 && "text-orange-500"
              }`}
            />
          )}
        </div>
      </div>
      <div className="mt-5">
        <label for="review" class="font-bold text-sm">
          Write Review
        </label>
        <textarea
          class="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-36"
          id="review"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-end mt-5">
        <button
          class="text-base text-white px-5 py-[10px] block bg-primary hover:bg-primary/70 transition text-center rounded-md font-medium"
          onClick={handleAddReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default AddReview;
