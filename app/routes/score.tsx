import { useNavigate, useLocation } from "react-router";
import { RoboflowLogo } from "../components/RoboflowLogo";
import { useEffect } from "react";

type ScoreData = {
  splitScore: number;
  visualizationImages: {
    split: string;
    pint: string;
  };
};

export default function Score() {
  const navigate = useNavigate();
  const location = useLocation();
  const scoreData = location.state as ScoreData;
  
  useEffect(() => {
    if (!scoreData) navigate('/');
  }, [scoreData, navigate]);
  
  if (!scoreData) return null;

  const getScoreMessage = (score: number) => {
    if (score >= 4.70) return "Sláinte! 🏆 A Perfect Split!";
    if (score >= 3.75) return "Beautiful Split! ⭐ Like a True Dubliner!";
    if (score >= 3.0) return "Cheers for trying! 🍺 Have Another Go!";
    return "The Perfect Split Awaits! 🎓 Try Again!";
  };

  return (
    <main className="min-h-screen bg-guinness-black">
      <div className="container mx-auto p-4 md:p-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center">
          <div className="w-28 md:w-36 text-guinness-gold">
            <RoboflowLogo />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-guinness-gold mt-4">
            Split G Results
          </h1>
        </div>

        {/* Score Card */}
        <div className="mt-8 text-center">
          <div className="mt-4 inline-block bg-guinness-gold/10 rounded-xl p-8 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="text-6xl md:text-7xl font-bold text-guinness-gold mb-2">
                {scoreData.splitScore.toFixed(2)}
              </div>
              <div className="text-xl md:text-2xl text-guinness-tan/80 mb-3">
                out of 5.0
              </div>
              <div className="text-lg md:text-xl text-guinness-tan mt-2 max-w-md">
                {getScoreMessage(scoreData.splitScore)}
              </div>
            </div>
          </div>
        </div>

        {/* Image Comparison */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Split Analysis */}
          <div className="bg-guinness-gold/5 rounded-lg p-4">
            <h2 className="text-lg font-bold text-guinness-gold mb-2">Your Split G</h2>
            <div className="aspect-square bg-guinness-black rounded-lg overflow-hidden">
              {scoreData.visualizationImages.split ? (
                <img 
                  src={`data:image/jpeg;base64,${scoreData.visualizationImages.split}`}
                  alt="Split analysis"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-guinness-tan">
                  No image available
                </div>
              )}
            </div>
          </div>

          {/* Original Pour */}
          <div className="bg-guinness-gold/5 rounded-lg p-4">
            <h2 className="text-lg font-bold text-guinness-gold mb-2">Your Pint</h2>
            <div className="aspect-square bg-guinness-black rounded-lg overflow-hidden">
              {scoreData.visualizationImages.pint ? (
                <img 
                  src={`data:image/jpeg;base64,${scoreData.visualizationImages.pint}`}
                  alt="Original pour"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-guinness-tan">
                  No image available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Try Again Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-guinness-gold text-guinness-black rounded-full font-bold hover:bg-guinness-tan transition-colors duration-300 text-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  );
} 