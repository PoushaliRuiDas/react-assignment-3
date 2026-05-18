import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);

      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setSeconds(0);
  };

  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

   return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center w-[400px]">
        <h1 className="text-4xl font-bold mb-8">Stopwatch</h1>

        <div className="text-5xl font-bold mb-8 text-blue-600">
          {formatTime()}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={startTimer}
            className="bg-green-500 text-white px-5 py-2 rounded-lg"
          >
            Start
          </button>

          <button
            onClick={pauseTimer}
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
          >
            Pause
          </button>

          <button
            onClick={resetTimer}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Reset
          </button>
          </div>
      </div>
    </div>
  );
};

export default Stopwatch;