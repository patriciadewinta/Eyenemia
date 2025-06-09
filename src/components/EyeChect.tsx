import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Camera, AlertCircle } from "lucide-react";

const EyeCheck: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 4000));

      // Mock prediction result - randomly generate for demo
      const mockResult = {
        prediction: Math.random() > 0.5 ? "anemia" : "normal",
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
        image: imagePreview,
      };

      // Store result in sessionStorage to pass to result page
      sessionStorage.setItem("predictionResult", JSON.stringify(mockResult));

      // Navigate to result page
      navigate("/hasil");
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setError(null);
  };

  // Enhanced Loading Screen Component with Realistic Eye Animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
        <div className="text-center relative">
          {/* Loading Text with Pulse Effect */}
          <h2 className="text-4xl font-bold text-white mb-6 animate-pulse">
            Menganalisis Foto Mata...
          </h2>
          <p className="text-white/80 text-xl mb-8">
            AI sedang memproses gambar Anda dengan teknologi canggih
          </p>

          {/* Enhanced Progress Indicator */}
          <div className="flex justify-center items-center space-x-3 mb-8">
            <div className="progress-dot"></div>
            <div
              className="progress-dot"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="progress-dot"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="progress-dot"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>

          {/* Processing Steps */}
          <div className="text-white/60 text-sm">
            <div className="processing-step">Memproses citra digital...</div>
          </div>
        </div>

        {/* Enhanced CSS Styles for Realistic Eye Animation */}
        <style>{`
          .eye-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 280px;
            height: 160px;
            margin: 0 auto;
            perspective: 1000px;
          }

          .eye-socket {
            position: relative;
            width: 180px;
            height: 100px;
            background: linear-gradient(145deg, #f8f9fa, #e9ecef);
            border-radius: 90px 90px 90px 90px;
            box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1),
              0 0 40px rgba(64, 224, 208, 0.2), 0 0 80px rgba(139, 92, 246, 0.1);
            overflow: hidden;
            transform-style: preserve-3d;
          }

          .eyeball {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 164px;
            height: 84px;
            background: radial-gradient(
              ellipse at center,
              #ffffff 60%,
              #f8f9fa 100%
            );
            border-radius: 82px;
            overflow: hidden;
            transform: rotateX(5deg);
          }

          .sclera {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                ellipse at 30% 30%,
                rgba(255, 255, 255, 0.9) 0%,
                transparent 50%
              ),
              radial-gradient(ellipse at center, #ffffff 0%, #f8f9fa 100%);
          }

          .vein {
            position: absolute;
            background: rgba(220, 53, 69, 0.1);
            border-radius: 1px;
          }

          .vein-1 {
            top: 20px;
            left: 30px;
            width: 40px;
            height: 1px;
            transform: rotate(15deg);
          }

          .vein-2 {
            top: 50px;
            right: 25px;
            width: 35px;
            height: 1px;
            transform: rotate(-20deg);
          }

          .vein-3 {
            bottom: 25px;
            left: 50px;
            width: 30px;
            height: 1px;
            transform: rotate(45deg);
          }

          .iris {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: radial-gradient(
              circle at 30% 30%,
              #87ceeb 0%,
              #4682b4 30%,
              #2c5aa0 70%,
              #1a365d 100%
            );
            border-radius: 50%;
            animation: irisMovement 4s ease-in-out infinite;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3),
              0 0 5px rgba(70, 130, 180, 0.5);
          }

          .iris-pattern {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                circle at 25% 25%,
                transparent 20%,
                rgba(255, 255, 255, 0.1) 21%,
                transparent 22%
              ),
              radial-gradient(
                circle at 75% 75%,
                transparent 20%,
                rgba(0, 0, 0, 0.1) 21%,
                transparent 22%
              ),
              conic-gradient(
                from 0deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent,
                rgba(0, 0, 0, 0.1),
                transparent
              );
            border-radius: 50%;
          }

          .pupil {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 24px;
            height: 24px;
            background: #000000;
            border-radius: 50%;
            animation: pupilDilation 3s ease-in-out infinite;
          }

          .pupil-reflection {
            position: absolute;
            top: 20%;
            left: 30%;
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            animation: reflectionShimmer 2s ease-in-out infinite;
          }

          .tear-film {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              45deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 100%
            );
            border-radius: 82px;
            animation: tearFilm 3s ease-in-out infinite;
          }

          .eyelid {
            position: absolute;
            width: 100%;
            z-index: 10;
          }

          .upper-eyelid {
            top: 0;
            height: 50%;
            background: linear-gradient(
              180deg,
              #d4a574 0%,
              #c49464 50%,
              #b8855a 100%
            );
            border-radius: 90px 90px 0 0;
            transform-origin: bottom center;
            animation: upperEyelidBlink 3s ease-in-out infinite;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
              inset 0 -2px 4px rgba(0, 0, 0, 0.1);
          }

          .lower-eyelid {
            bottom: 0;
            height: 25%;
            background: linear-gradient(0deg, #d4a574 0%, #c49464 100%);
            border-radius: 0 0 90px 90px;
            transform-origin: top center;
            animation: lowerEyelidBlink 3s ease-in-out infinite;
            box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1),
              inset 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          .eyelid-skin {
            position: absolute;
            width: 100%;
            height: 100%;
            background: inherit;
            border-radius: inherit;
          }

          .eyelashes {
            position: absolute;
            width: 100%;
            height: 4px;
          }

          .upper-lashes {
            bottom: -2px;
            background: repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 3px,
              #2d1810 3px,
              #2d1810 4px,
              transparent 4px,
              transparent 8px
            );
            transform: scaleY(2);
          }

          .lower-lashes {
            top: -2px;
            background: repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 4px,
              #2d1810 4px,
              #2d1810 5px,
              transparent 5px,
              transparent 10px
            );
            transform: scaleY(1.5);
          }

          .eye-corner {
            position: absolute;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #ffb3ba 0%, #ff9999 100%);
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
          }

          .left-corner {
            left: 5px;
          }

          .right-corner {
            right: 5px;
          }

          .progress-dot {
            width: 12px;
            height: 12px;
            background: linear-gradient(45deg, #40e0d0, #ff7f7f);
            border-radius: 50%;
            animation: progressPulse 1.5s ease-in-out infinite;
            box-shadow: 0 0 10px rgba(64, 224, 208, 0.5);
          }

          .processing-step {
            animation: textFade 2s ease-in-out infinite;
          }

          /* Keyframe Animations */
          @keyframes upperEyelidBlink {
            0%,
            85%,
            100% {
              transform: scaleY(0.1);
            }
            5%,
            80% {
              transform: scaleY(0.1);
            }
            10%,
            75% {
              transform: scaleY(1);
            }
          }

          @keyframes lowerEyelidBlink {
            0%,
            85%,
            100% {
              transform: scaleY(0.3);
            }
            5%,
            80% {
              transform: scaleY(0.3);
            }
            10%,
            75% {
              transform: scaleY(1);
            }
          }

          @keyframes irisMovement {
            0%,
            100% {
              transform: translate(-50%, -50%);
            }
            20% {
              transform: translate(-65%, -45%);
            }
            40% {
              transform: translate(-35%, -55%);
            }
            60% {
              transform: translate(-45%, -40%);
            }
            80% {
              transform: translate(-55%, -60%);
            }
          }

          @keyframes pupilDilation {
            0%,
            100% {
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
            }
          }

          @keyframes reflectionShimmer {
            0%,
            100% {
              opacity: 0.9;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.2);
            }
          }

          @keyframes tearFilm {
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.1;
            }
          }

          @keyframes progressPulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.7;
            }
          }

          @keyframes textFade {
            0%,
            100% {
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-eye">Eye</span>{" "}
            <span className="text-gradient-nemia">Check</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Upload foto mata Anda untuk deteksi dini anemia menggunakan
            teknologi AI
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
          {/* Upload Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Upload Foto Mata
            </h2>

            {/* Upload Area */}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className={`block w-full p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
                  imagePreview
                    ? "border-turquoise bg-turquoise/10"
                    : "border-white/30 hover:border-white/50 bg-white/5 hover:bg-white/10"
                }`}
              >
                {imagePreview ? (
                  <div className="text-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg mb-4"
                    />
                    <p className="text-white font-medium">
                      Klik untuk mengganti gambar
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-white/50 mx-auto mb-4" />
                    <p className="text-white text-lg font-medium mb-2">
                      Klik untuk upload foto mata
                    </p>
                    <p className="text-white/60 text-sm">
                      Format: JPG, PNG, JPEG (Max 5MB)
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-300">{error}</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mb-8 bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Panduan Pengambilan Foto:
            </h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 flex-shrink-0"></div>
                <span>Pastikan pencahayaan cukup terang</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 flex-shrink-0"></div>
                <span>Fokus pada area kelopak mata bagian bawah</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 flex-shrink-0"></div>
                <span>Hindari bayangan atau refleksi cahaya</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 flex-shrink-0"></div>
                <span>Pastikan gambar tidak blur atau kabur</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {selectedImage && (
              <button
                onClick={resetForm}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20"
              >
                Reset
              </button>
            )}

            <button
              onClick={handlePredict}
              disabled={!selectedImage || isLoading}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                selectedImage && !isLoading
                  ? "bg-gradient-to-r from-turquoise to-coral hover:shadow-lg hover:shadow-turquoise/25 text-white"
                  : "bg-gray-500/50 text-gray-300 cursor-not-allowed"
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>Prediksi Anemia</span>
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200 text-sm text-center">
              <strong>Disclaimer:</strong> Hasil deteksi ini hanya sebagai
              indikasi awal. Konsultasikan dengan dokter untuk diagnosis yang
              akurat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeCheck;
