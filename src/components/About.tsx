import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Brain,
  Eye,
  CheckCircle,
  Database,
} from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const About: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const steps: Step[] = [
    {
      id: 1,
      title: "Pengumpulan Data",
      description: "Mengumpulkan dataset citra mata untuk training model AI",
      icon: <Database className="w-12 h-12 text-turquoise" />,
      details: [
        "Mengumpulkan ribuan gambar mata dari berbagai sumber",
        "Melakukan labeling data untuk mata normal dan anemia",
        "Preprocessing dan augmentasi data untuk meningkatkan kualitas",
        "Validasi kualitas dataset oleh ahli medis",
      ],
    },
    {
      id: 2,
      title: "Training Model AI",
      description: "Melatih model deep learning untuk mendeteksi anemia",
      icon: <Brain className="w-12 h-12 text-coral" />,
      details: [
        "Menggunakan arsitektur Convolutional Neural Network (CNN)",
        "Training dengan teknik transfer learning",
        "Optimasi hyperparameter untuk akurasi terbaik",
        "Validasi model dengan cross-validation",
      ],
    },
    {
      id: 3,
      title: "Upload Foto Mata",
      description: "User mengunggah foto mata melalui website",
      icon: <Upload className="w-12 h-12 text-purple-400" />,
      details: [
        "Interface yang user-friendly untuk upload gambar",
        "Validasi format dan kualitas gambar",
        "Preprocessing otomatis untuk standarisasi input",
        "Keamanan data terjamin dengan enkripsi",
      ],
    },
    {
      id: 4,
      title: "Analisis Citra",
      description: "Model AI menganalisis citra mata yang diunggah",
      icon: <Eye className="w-12 h-12 text-blue-400" />,
      details: [
        "Ekstraksi fitur dari area konjungtiva mata",
        "Analisis warna dan tekstur menggunakan computer vision",
        "Deteksi pola yang mengindikasikan anemia",
        "Perhitungan confidence score hasil prediksi",
      ],
    },
    {
      id: 5,
      title: "Hasil Deteksi",
      description: "Sistem memberikan hasil deteksi anemia kepada user",
      icon: <CheckCircle className="w-12 h-12 text-green-400" />,
      details: [
        "Hasil prediksi: Normal atau Terindikasi Anemia",
        "Tingkat kepercayaan (confidence level) hasil",
        "Rekomendasi tindak lanjut medis",
        "Disclaimer untuk konsultasi dengan dokter",
      ],
    },
  ];

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, steps.length]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
    setIsAutoPlay(false);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    setIsAutoPlay(false);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
    setIsAutoPlay(false);
  };

  return (
    <section id="about" className="py-20 px-6 md:px-12 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-eye">Solusi</span>{" "}
            <span className="text-gradient-nemia">Kami!</span>
          </h2>
          <p className="text-white text-xl max-w-3xl mx-auto leading-relaxed">
            Sistem deteksi anemia berbasis AI yang menganalisis citra mata untuk
            memberikan indikasi awal kondisi anemia secara cepat dan akurat
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
          {/* Progress Bar */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "bg-turquoise scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step Counter */}
          <div className="text-center mb-6">
            <span className="text-turquoise text-lg font-semibold">
              Langkah {currentStep + 1} dari {steps.length}
            </span>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[400px]">
            {/* Left Side - Icon and Title */}
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-6">
                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                  {steps[currentStep].icon}
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {steps[currentStep].title}
              </h3>

              <p className="text-white/80 text-lg leading-relaxed mb-6">
                {steps[currentStep].description}
              </p>

              {/* Navigation Buttons */}
              <div className="flex justify-center md:justify-start space-x-4">
                <button
                  onClick={prevStep}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextStep}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4">
                Detail Proses:
              </h4>
              <ul className="space-y-3">
                {steps[currentStep].details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 text-white/80"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="w-2 h-2 bg-turquoise rounded-full mt-2 flex-shrink-0"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center mt-8 space-x-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === currentStep
                    ? "bg-turquoise text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {step.id}
              </button>
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                isAutoPlay
                  ? "bg-coral text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {isAutoPlay ? "Pause Auto-play" : "Resume Auto-play"}
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
      </div>
    </section>
  );
};

export default About;
