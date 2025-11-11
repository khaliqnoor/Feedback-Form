import React, { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios'

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

 

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      if(!name || !message){
           toast.error("Name and Message are required")
        }
    const res = await axios.post("https://feedback-form-ochre-nu.vercel.app/api/feedback", {
      name,
      message
    })
   if (res.data.success) {
    toast.success("Feedback sent successfully!")
      setSubmitted(true)
      setStatus("✅ Thanks for your feedback!");
    } else {
      toast.error("Something went wrong")
      setStatus("⚠️ Something went wrong!");
    }
    setSubmitted(true)
   } catch (error) {
     console.error("Error submitting feedback:", error);
     setStatus("❌ Failed to send feedback. Server error.");
     setTimeout(() => {
      setSubmitted(false)
     }, 2000);
   }
  };

  return (
    <>
  <Toaster
  position="top-center"
  toastOptions={{
    className:
      "bg-gray-900 text-white font-semibold text-lg rounded-xl shadow-lg",
    style: {
      padding: "14px 20px",
    },
  }}
/>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Feedback Form
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your feedback..."
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
                rows="4"
                className="w-full p-3 rounded-lg resize-none bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-500 transition transform hover:scale-[1.02]"
            >
              Submit Feedback
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">{status}</h3>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default FeedbackForm;
