import React, { useState, useEffect } from 'react';

export default function PickedCounter() {
  const [count, setCount] = useState(0);
  const targetCount = 1847;

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="text-lg sm:text-xl font-semibold mb-4">
        <span className="text-green-400 font-semibold count-up">{count.toLocaleString()}</span> men have used this system to understand her psychology and get the exact templates that work.
      </div>
    </div>
  );
}