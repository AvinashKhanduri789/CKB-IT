import { useEffect, useState } from "react";
import Confetti from 'react-confetti';

const ThankYouPage = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Stop confetti after 8 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Confetti celebration */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 animate-pulse"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#ff9a9e', '#fad0c4', '#a1c4fd', '#c2e9fb', '#ffecd2'][i % 5],
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Main thank you message */}
        <div className="mb-16">
          <div className="text-6xl md:text-8xl mb-8">🎉</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Thank You!
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-4">
            For participating in <span className="font-bold text-yellow-300">Byte 2.0</span>
          </p>
          <p className="text-lg opacity-80">
            Your participation made this event special
          </p>
        </div>

        {/* Appreciation message */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20 shadow-2xl">
          <div className="text-4xl mb-6">🙏</div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">We appreciate you</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Thank you for taking the time to join our coding event. 
            Your enthusiasm and participation contributed to making 
            this competition a memorable experience for everyone involved.
          </p>
        </div>

       

        {/* Final action */}
        <div className="mb-10">
          <button
            className="px-8 py-4 bg-yellow-500 text-purple-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors text-lg"
            onClick={() => window.location.href("https://codex-website-xi.vercel.app/")}
          >
           Who We Are
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-white/20 pt-6">
          <p className="opacity-70">© {new Date().getFullYear()} Byte 2.0</p>
          
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;