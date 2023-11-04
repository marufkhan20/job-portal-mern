import React from "react";
import { GrAttachment } from "react-icons/gr";

const SendMessage = ({
  setMessage,
  message,
  handleSendMessage,
  captureFile,
}) => {
  return (
    <div>
      <textarea
        class="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-40"
        id="bio"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex items-center gap-5 mt-3">
        <button
          type="submit"
          class="flex items-center text-white bg-primary px-8 py-2 rounded-[4px] gap-[5px] font-medium transition hover:bg-primary/70 border border-primary"
          onClick={handleSendMessage}
        >
          <span>Send Message</span>
        </button>
        <div className="flex items-center">
          <label
            htmlFor="file"
            className="cursor-pointer py-3 px-4 rounded bg-slate-300"
          >
            <GrAttachment />
          </label>
          <input
            onChange={captureFile}
            type="file"
            id="file"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
