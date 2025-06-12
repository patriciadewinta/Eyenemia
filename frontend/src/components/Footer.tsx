import React, { useState, useEffect } from "react";
import { Eye, ArrowDown, Camera, Zap, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("Footer");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Mudah & Cepat",
      description: "Hanya perlu foto mata Anda",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Terpercaya",
      description: "Model yang telah dilatih khusus",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-500/20",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Hasil Instan",
      description: "Dapatkan hasil dalam hitungan detik",
      color: "from-red-400 to-orange-400",
      bgColor: "bg-red-500/20",
    },
  ];

  const FloatingElement: React.FC<{
    delay: number;
    size: string;
    color: string;
    position: string;
    duration?: string;
  }> = ({ delay, size, color, position, duration = "6s" }) => (
    <div
      className={`absolute ${position} ${size} ${color} rounded-full blur-xl opacity-30`}
      style={{
        animation: `float ${duration} ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );

  const ParticleEffect: React.FC = () => {
    const particles = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full opacity-60"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ));
    return <div className="absolute inset-0 overflow-hidden">{particles}</div>;
  };

  return (
    <>
      <section
        id="Footer"
        className="py-20 px-6 md:px-12 relative overflow-hidden min-h-screen flex items-center"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0"></div>

        {/* Floating Elements */}
        <FloatingElement
          delay={0}
          size="w-32 h-32"
          color="bg-turquoise"
          position="top-10 left-10"
        />
        <FloatingElement
          delay={1}
          size="w-24 h-24"
          color="bg-purple-500"
          position="top-20 right-20"
          duration="8s"
        />
        <FloatingElement
          delay={2}
          size="w-40 h-40"
          color="bg-pink-500"
          position="bottom-20 left-20"
          duration="10s"
        />
        <FloatingElement
          delay={0.5}
          size="w-20 h-20"
          color="bg-blue-400"
          position="bottom-10 right-10"
          duration="7s"
        />
        <FloatingElement
          delay={1.5}
          size="w-16 h-16"
          color="bg-yellow-400"
          position="top-1/2 left-1/4"
          duration="9s"
        />

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          {/* Animated Header */}
          <div
            className={`mb-16 ${
              isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-20"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative">
              <h2 className="text-6xl md:text-8xl font-black mb-8 relative">
                <span className="inline-block bg-gradient-to-r from-turquoise via-purple-400 to-pink-400 bg-clip-text text-gradient-eye">
                  Tunggu
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-gradient-nemia">
                  Apa Lagi?
                </span>
              </h2>

              <div className="relative">
                <p className="text-white/90 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
                  Hidup Anda terlalu berharga untuk menunda-nunda!
                  <span className="text-turquoise font-bold">
                    {" "}
                    Deteksi anemia sekarang juga{" "}
                  </span>
                  dan ambil kendali atas kesehatan Anda!
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Features Grid */}
          <div
            className={`grid md:grid-cols-3 gap-8 mb-16 ${
              isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-20"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 cursor-pointer ${
                  hoveredCard === index ? "shadow-2xl shadow-turquoise/25" : ""
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500`}
                />

                {/* Icon with Animation */}
                <div
                  className={`${feature.bgColor} p-6 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-125 transition-transform duration-300`}
                >
                  <div className="text-white group-hover:animate-ping">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-turquoise transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-turquoise/0 group-hover:border-turquoise/50 transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Main CTA Section */}
          <div
            className={`mb-16 ${
              isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-20"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <div className="relative bg-gradient-to-r from-turquoise/20 via-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-turquoise/30 backdrop-blur-xl">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
              </div>

              <div className="relative z-10">
                {/* Eye Icon with Pulse Effect */}
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-turquoise/10 rounded-full animate-none"></div>
                    <div className="relative bg-red-nemia p-6 rounded-full">
                      <Eye className="w-16 h-16 text-gradient-eye animate-pulse" />
                    </div>
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-white mb-10">
                  <span className="bg-gradient-to-r from-turquoise to-purple-400 bg-clip-text text-gradient-eye">
                    Cek Mata Anda
                  </span>
                  <br />

                  <span className="text-gradient-nemia">SEKARANG JUGA!</span>
                </h3>

                {/* Multiple Animated Arrows */}
                <div className="flex justify-center space-x-4 mb-8">
                  <ArrowDown className="w-8 h-8 text-turquoise animate-bounce" />
                  <ArrowDown
                    className="w-10 h-10 text-purple-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <ArrowDown
                    className="w-8 h-8 text-pink-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Super Animated CTA Button */}
          <div
            className={`mb-16 ${
              isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-20"
            }`}
            style={{ animationDelay: "0.8s" }}
          >
            <div className="relative">
              {/* Glowing Ring Effect */}
              <div className="absolute "></div>

              <button
                className="relative group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-500 hover:to-pink-500/90 text-white hover:text-black font-black py-8 px-16 rounded-3xl text-2xl shadow-2xl hover:shadow-purple-500"
                onClick={() => navigate("/eye-check")}
              >
                {/* Button Content */}
                <div className="flex items-center space-x-4">
                  <Eye className="w-8 h-8 group-hover:animate-ping" />
                  <span className="group-hover:animate-pulse">
                    Cek Mata Saya!
                  </span>
                  <Eye className="w-8 h-8 group-hover:animate-ping" />

                  <div className="flex space-x-1"></div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
              </button>
            </div>
          </div>

          {/* Urgency Counter */}
          <div
            className={`mb-12 ${
              isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-20"
            }`}
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Stats with Animation */}
          <div
            className={`grid md:grid-cols-3 gap-6 ${
              isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-20"
            }`}
            style={{ animationDelay: "1.2s" }}
          >
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-4xl font-black text-turquoise mb-2 group-hover:scale-110 transition-transform">
                91%
              </div>
              <p className="text-white/80">Akurasi model kami!</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-4xl font-black text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                {"<5s"}
              </div>
              <p className="text-white/80">waktu pemeriksaan</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-4xl font-black text-pink-400 mb-2 group-hover:scale-110 transition-transform">
                100%
              </div>
              <p className="text-white/80">gratis dan mudah</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
