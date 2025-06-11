import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Camera,
  Heart,
  Activity,
  FileText,
} from "lucide-react";

interface PredictionResult {
  prediction: "anemia" | "normal" | "Anemia" | "Normal"; // Menangani variasi output
  confidence: number;
  image: string;
}

const Hasil: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result: PredictionResult | null = location.state?.result;

  useEffect(() => {
    if (!result) {
      navigate("/eye-check");
    }
  }, [result, navigate]);

  const handleNewCheck = () => {
    navigate("/eye-check");
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Memuat hasil...</div>
      </div>
    );
  }

  // Menyamakan format output (misal: "anemia" dan "Anemia" dianggap sama)
  const isAnemia = result.prediction.toLowerCase() === "anemia";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-eye">Hasil</span>{" "}
            <span className="text-gradient-nemia">Deteksi</span>
          </h1>
          <p className="text-white/80 text-xl">
            Hasil analisis AI terhadap foto mata Anda
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 mb-8">
          {/* Image Preview */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-white/10 rounded-2xl">
              <img
                src={result.image}
                alt="Analyzed eye"
                className="max-w-64 max-h-64 rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Result Status */}
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center space-x-3 px-6 py-4 rounded-full ${
                isAnemia
                  ? "bg-red-500/20 border border-red-500/30"
                  : "bg-green-500/20 border border-green-500/30"
              }`}
            >
              {isAnemia ? (
                <AlertTriangle className="w-8 h-8 text-red-400" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-400" />
              )}
              <div className="text-left">
                <h2
                  className={`text-2xl font-bold ${
                    isAnemia ? "text-red-300" : "text-green-300"
                  }`}
                >
                  {isAnemia ? "Terindikasi Anemia" : "Normal"}
                </h2>
              </div>
            </div>
          </div>

          {/* Detailed Information & Recommendations */}
          {/* Mengubah layout agar rekomendasi menjadi komponen utama */}
          <div className="flex justify-center">
            {/* Right Column - Recommendations */}
            <div className="w-full md:w-2/3 bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-coral" />
                <span>Rekomendasi</span>
              </h3>
              <ul className="space-y-3">
                {isAnemia ? (
                  <>
                    <li className="flex items-start space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-coral rounded-full mt-2 flex-shrink-0"></div>
                      <span>Konsultasi dengan dokter segera</span>
                    </li>
                    <li className="flex items-start space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-coral rounded-full mt-2 flex-shrink-0"></div>
                      <span>Lakukan tes darah lengkap</span>
                    </li>
                    <li className="flex items-start space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-coral rounded-full mt-2 flex-shrink-0"></div>
                      <span>Perbanyak makanan kaya zat besi</span>
                    </li>
                    <li className="flex items-start space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-coral rounded-full mt-2 flex-shrink-0"></div>
                      <span>Istirahat yang cukup</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Pertahankan pola hidup sehat</span>
                    </li>
                    <li className="flex items-start space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Konsumsi makanan bergizi seimbang</span>
                    </li>
                    <li className="flex items-start space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Lakukan pemeriksaan rutin</span>
                    </li>
                    <li className="flex items-start space-x-3 text-white/80">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Tetap aktif berolahraga</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </button>

            <button
              onClick={handleNewCheck}
              className="px-8 py-3 bg-gradient-to-r from-turquoise to-coral hover:shadow-lg hover:shadow-turquoise/25 text-white rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Cek Lagi</span>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <FileText className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-yellow-200 font-semibold mb-2">
                Penting untuk Diketahui:
              </h4>
              <p className="text-yellow-200/80 text-sm leading-relaxed">
                Hasil deteksi ini menggunakan teknologi AI dan hanya sebagai
                indikasi awal. Untuk diagnosis yang akurat dan penanganan yang
                tepat, sangat disarankan untuk berkonsultasi dengan dokter atau
                tenaga medis profesional. Jangan menunda pemeriksaan medis jika
                Anda mengalami gejala anemia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hasil;
