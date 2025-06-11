import React, { useState, useEffect } from "react";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Heart,
  GraduationCap,
} from "lucide-react";

interface StatCard {
  title: string;
  percentage: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const Statistik: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState({
    children: 0,
    teens: 0,
    overall: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  const stats: StatCard[] = [
    {
      title: "Anak Usia 5-14 Tahun",
      percentage: 26.8,
      description: "Lebih dari 1 dari 4 anak mengalami anemia",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
    },
    {
      title: "Remaja Usia 15-24 Tahun",
      percentage: 32,
      description: "Kelompok dengan prevalensi tertinggi",
      icon: <AlertTriangle className="w-8 h-8" />,
      color: "text-red-400",
      bgColor: "bg-red-400/20",
    },
    {
      title: "Rata-rata Nasional",
      percentage: 29.4,
      description: "Hampir 3 dari 10 orang Indonesia",
      icon: <Users className="w-8 h-8" />,
      color: "text-purple-400",
      bgColor: "bg-purple-400/20",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("Statistik");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedValues({
          children: 26.8 * easeOutQuart,
          teens: 32 * easeOutQuart,
          overall: 29.4 * easeOutQuart,
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const CircularProgress: React.FC<{
    percentage: number;
    color: string;
    size?: number;
  }> = ({ percentage, color, size = 120 }) => {
    const radius = (size - 12) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Convert Tailwind color classes to actual hex colors
    const colorMap: { [key: string]: string } = {
      "text-purple-400": "#c084fc",
      "text-pink-400": "#f472b6",
      "text-blue-400": "#60a5fa",
      "text-red-400": "#f87171",
      "text-orange-400": "#fb923c",
    };

    const actualColor = colorMap[color] || "#64FFDA";

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={actualColor}
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${actualColor}60)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
    );
  };

  const BarChart: React.FC = () => {
    const data = [
      {
        label: "Anak 5-14 th",
        value: animatedValues.children,
        color: "#60a5fa",
      },
      {
        label: "Remaja 15-24 th",
        value: animatedValues.teens,
        color: "#f87171",
      },
      { label: "Rata-rata", value: animatedValues.overall, color: "#c084fc" },
    ];

    const maxValue = 35;

    return (
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6 text-center">
          Perbandingan Prevalensi Anemia Berdasarkan Usia
        </h3>
        <div className="space-y-6">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-sm text-white/80 text-right">
                {item.label}
              </div>
              <div className="flex-1 bg-white/10 rounded-full h-8 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color,
                    boxShadow: `0 0 10px ${item.color}40`,
                  }}
                />
              </div>
              <div className="w-16 text-sm text-white font-semibold">
                {item.value.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="Statistik" className="py-20 px-6 md:px-12 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-eye">Statistik</span>{" "}
            <span className="text-gradient-nemia">Anemia</span>{" "}
            <span className="text-white">di Indonesia</span>
          </h2>
          <p className="text-white/80 text-xl max-w-4xl mx-auto leading-relaxed">
            Berdasarkan Riset Kesehatan Dasar (Riskesdas) 2018, anemia merupakan
            masalah kesehatan serius yang dialami oleh balita, remaja, ibu hamil
            bahkan usia lanjut di Indonesia
          </p>
        </div>

        {/* Highlight Statistic */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl p-8 border border-red-400/30">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              3 dari 10 orang temanmu
            </h3>
            <p className="text-xl text-white/90 mb-2">menderita anemia</p>
            <p className="text-white/70">
              Itu artinya anemia sangat dekat dengan kehidupan kita sehari-hari
            </p>
          </div>
        </div>

        {/* Main Statistik Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              style={{
                animation: isVisible
                  ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  : "none",
              }}
            >
              <div
                className={`${stat.bgColor} ${stat.color} p-4 rounded-xl w-fit mb-4`}
              >
                {stat.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {stat.title}
              </h3>

              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-bold text-white">
                  {Object.values(animatedValues)[index].toFixed(1)}%
                </span>
                <CircularProgress
                  percentage={Object.values(animatedValues)[index]}
                  color={stat.color}
                  size={80}
                />
              </div>

              <p className="text-white/70 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Visualization */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Bar Chart */}
          <BarChart />

          {/* Key Insights */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">
              Fakta Mengejutkan
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/80">
                  <span className="text-red-400 font-semibold">
                    32% remaja usia 15-24 tahun
                  </span>{" "}
                  mengalami anemia - hampir 1 dari 3 remaja
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/80">
                  <span className="text-blue-400 font-semibold">
                    26.8% anak usia 5-14 tahun
                  </span>{" "}
                  menderita anemia sejak usia dini
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/80">
                  Anemia dapat dialami oleh{" "}
                  <span className="text-purple-400 font-semibold">
                    semua kelompok usia
                  </span>{" "}
                  - dari balita hingga lansia
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-turquoise rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/80">
                  Deteksi dini melalui pemeriksaan mata dapat membantu
                  pencegahan komplikasi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Age Group Breakdown */}
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-16">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Kelompok Usia yang Rentan Anemia
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-yellow-400/20 text-yellow-400 p-4 rounded-xl w-fit mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-white font-semibold mb-2">Balita</h4>
              <p className="text-white/70 text-sm">Masa pertumbuhan pesat</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-400/20 text-blue-400 p-4 rounded-xl w-fit mx-auto mb-3">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-white font-semibold mb-2">Anak Sekolah</h4>
              <p className="text-white/70 text-sm">
                Aktivitas tinggi, nutrisi kurang
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-400/20 text-red-400 p-4 rounded-xl w-fit mx-auto mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-white font-semibold mb-2">Remaja</h4>
              <p className="text-white/70 text-sm">Pubertas & menstruasi</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-400/20 text-pink-400 p-4 rounded-xl w-fit mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-white font-semibold mb-2">Ibu Hamil</h4>
              <p className="text-white/70 text-sm">Kebutuhan zat besi tinggi</p>
            </div>
          </div>
        </div>

        {/* Source */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Sumber: Riset Kesehatan Dasar (Riskesdas) 2018 - Kementerian
            Kesehatan RI
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistik;
