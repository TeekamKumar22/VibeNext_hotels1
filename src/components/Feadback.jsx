import { useState, useRef, useEffect } from 'react';

const Feedback = () => {

     const h2Ref = useRef(null);
      const [h2Visible, setH2Visible] = useState(false);
    
      useEffect(() => {
        const node = h2Ref.current;
        if (!node) return;
        const observer = new window.IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setH2Visible(true);
              observer.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(node);
        return () => observer.disconnect();
      }, []);
    
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState('');

  const handleNext = () => {
    if (step === 1 && rating) setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, message });
    setStep(1);
    setRating(null);
    setMessage('');
  };

return (
    <div ref={h2Ref}  className={` flex justify-center items-center h-96  transition-all duration-700 
          ${h2Visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-x-16 scale-95'}`
          }>
        <div className="bg-gray-500 backdrop-blur-md text-white  rounded-2xl w-[85%] p-6 md:p-8 space-y-6 border border-white/10 shadow-xl shadow-gray-700">
            <h2 className="text-2xl font-semibold text-center">We’d love your feedback 💬</h2>

            {step === 1 && (
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-center text-sm text-gray-300">How was your experience with our site?</p>
                    <div className="flex gap-3 text-3xl">
                        {['😩', '😕', '😐', '😊', '🤩'].map((face, i) => (
                            <button
                                key={i}
                                onClick={() => setRating(face)}
                                className={`hover:scale-110 transition-transform ${rating === face ? 'scale-110' : ''}`}
                            >
                                {face}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        disabled={!rating}
                        className="mt-4 bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-200 transition"
                    >
                        Next
                    </button>
                </div>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        placeholder="Tell us how we can do better..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 rounded bg-white/10 border border-white/20 placeholder:text-white/60 resize-none"
                        rows={4}
                    />
                    <div className="flex justify-between items-center gap-4">
                        <button
                            type="submit"
                            className="bg-gray-400 hover:bg-gray-600 text-white px-6 py-2 rounded transition"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-sm text-gray-300 underline hover:text-gray-200"
                        >
                            Go Back
                        </button>
                    </div>
                </form>
            )}
        </div>
    </div>
);
};

export default Feedback;
