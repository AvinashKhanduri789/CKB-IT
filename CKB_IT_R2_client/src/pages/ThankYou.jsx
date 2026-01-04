import { useEffect, useState } from "react";
import Confetti from 'react-confetti';

const ThankYouPage = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        const confettiTimer = setTimeout(() => {
            setShowConfetti(false);
        }, 8000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(confettiTimer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 text-white p-4 md:p-6 relative overflow-hidden">
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

            {/* Background bubbles - should be behind content */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-10 animate-pulse"
                        style={{
                            width: `${Math.random() * 100 + 50}px`,
                            height: `${Math.random() * 100 + 50}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            backgroundColor: ['#ff9a9e', '#fad0c4', '#a1c4fd', '#c2e9fb', '#ffecd2'][i % 5],
                            animationDuration: `${Math.random() * 10 + 5}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content - should be above background bubbles */}
            <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
                {/* Main thank you message */}
                <div className="mb-10 md:mb-16">
                    <div className="text-6xl md:text-8xl mb-6 md:mb-8">🎉</div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                        Thank You!
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 mb-2 md:mb-4">
                        For participating in <span className="font-bold text-yellow-300">Byte 2.0</span>
                    </p>
                    <p className="text-lg md:text-xl opacity-80">
                        Your participation made this event special
                    </p>
                </div>

                {/* Appreciation message */}
                <div className="bg-white/10 backdrop-blur-sm md:backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 mb-8 md:mb-12 border border-white/20 shadow-xl">
                    <div className="text-4xl mb-4 md:mb-6">🙏</div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">We appreciate you</h2>
                    <p className="text-base md:text-lg opacity-90 leading-relaxed md:leading-loose">
                        Thank you for taking the time to join our coding event.
                        Your enthusiasm and participation contributed to making
                        this competition a memorable experience for everyone involved.
                    </p>
                </div>

                {/* Final action */}
                <div className="mb-8 md:mb-10">
                    <a
                        href="https://codex-website-xi.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 md:px-8 md:py-4 bg-yellow-500 text-purple-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 text-base md:text-lg hover:scale-105 transform"
                    >
                        Who We Are
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;