import React, { useState, useEffect } from "react";
import {
  Shield,
  AlertCircle,
  TrendingUp,
  Utensils,
  Activity,
  Brain,
  Eye,
  Users,
  Pill,
  Apple,
  Fish,
  Beef,
  Leaf,
} from "lucide-react";

interface InfoCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  items: string[];
}

const Informasi: React.FC = () => {
  const [activeTab, setActiveTab] = useState("symptoms");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("anemia-info");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const symptoms: InfoCard[] = [
    {
      id: "physical",
      title: "Gejala Fisik",
      icon: <Activity className="w-6 h-6" />,
      color: "text-red-400",
      bgColor: "bg-red-400/20",
      items: [
        "Kelelahan dan kelemahan yang berlebihan",
        "Sesak napas saat beraktivitas ringan",
        "Pusing dan sakit kepala",
        "Kulit pucat, terutama di wajah dan telapak tangan",
        "Kuku rapuh dan mudah patah",
        "Rambut rontok lebih dari biasanya",
      ],
    },
    {
      id: "neurological",
      title: "Gejala Neurologis",
      icon: <Brain className="w-6 h-6" />,
      color: "text-purple-400",
      bgColor: "bg-purple-400/20",
      items: [
        "Kesulitan berkonsentrasi",
        "Mudah lupa dan gangguan memori",
        "Mood swing dan mudah tersinggung",
        "Gangguan tidur dan insomnia",
        "Restless leg syndrome",
        "Keinginan makan es atau pati (pica)",
      ],
    },
    {
      id: "eye",
      title: "Gejala pada Mata",
      icon: <Eye className="w-6 h-6" />,
      color: "text-turquoise",
      bgColor: "bg-turquoise/20",
      items: [
        "Konjungtiva (bagian dalam kelopak mata) pucat",
        "Sklera (bagian putih mata) kebiruan",
        "Penglihatan kabur atau buram",
        "Mata kering dan mudah lelah",
        "Lingkaran hitam di bawah mata",
      ],
    },
  ];

  const riskFactors: InfoCard[] = [
    {
      id: "demographic",
      title: "Faktor Demografis",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
      items: [
        "Perempuan usia subur (menstruasi)",
        "Ibu hamil dan menyusui",
        "Bayi dan anak-anak dalam masa pertumbuhan",
        "Remaja dalam masa pubertas",
        "Lansia di atas 65 tahun",
        "Vegetarian dan vegan",
      ],
    },
    {
      id: "medical",
      title: "Kondisi Medis",
      icon: <Pill className="w-6 h-6" />,
      color: "text-orange-400",
      bgColor: "bg-orange-400/20",
      items: [
        "Penyakit ginjal kronis",
        "Penyakit radang usus (IBD)",
        "Kanker dan kemoterapi",
        "Penyakit celiac",
        "Thalassemia dan sickle cell disease",
        "Perdarahan internal (ulkus, wasir)",
      ],
    },
    {
      id: "lifestyle",
      title: "Gaya Hidup",
      icon: <Utensils className="w-6 h-6" />,
      color: "text-green-400",
      bgColor: "bg-green-400/20",
      items: [
        "Diet rendah zat besi, folat, atau vitamin B12",
        "Konsumsi alkohol berlebihan",
        "Merokok",
        "Olahraga berlebihan (atlet endurance)",
        "Donor darah terlalu sering",
        "Penggunaan obat tertentu jangka panjang",
      ],
    },
  ];

  const prevention: InfoCard[] = [
    {
      id: "nutrition",
      title: "Nutrisi Seimbang",
      icon: <Apple className="w-6 h-6" />,
      color: "text-green-400",
      bgColor: "bg-green-400/20",
      items: [
        "Konsumsi makanan kaya zat besi (daging merah, hati, bayam)",
        "Makanan tinggi vitamin C (jeruk, tomat, paprika)",
        "Sumber folat (sayuran hijau, kacang-kacangan)",
        "Vitamin B12 (ikan, telur, produk susu)",
        "Hindari teh/kopi saat makan (menghambat penyerapan zat besi)",
        "Kombinasi makanan untuk penyerapan optimal",
      ],
    },
    {
      id: "supplements",
      title: "Suplementasi",
      icon: <Pill className="w-6 h-6" />,
      color: "text-purple-400",
      bgColor: "bg-purple-400/20",
      items: [
        "Suplemen zat besi sesuai anjuran dokter",
        "Asam folat untuk ibu hamil",
        "Vitamin B12 untuk vegetarian/vegan",
        "Multivitamin dengan mineral",
        "Konsultasi dengan dokter sebelum konsumsi",
        "Perhatikan interaksi dengan obat lain",
      ],
    },
    {
      id: "lifestyle-prevention",
      title: "Gaya Hidup Sehat",
      icon: <Shield className="w-6 h-6" />,
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
      items: [
        "Olahraga teratur tapi tidak berlebihan",
        "Tidur cukup 7-9 jam per hari",
        "Kelola stress dengan baik",
        "Hindari merokok dan alkohol berlebihan",
        "Pemeriksaan kesehatan rutin",
        "Tangani kondisi medis yang mendasari",
      ],
    },
  ];

  const foodSources = [
    {
      category: "Sumber Zat Besi Heme",
      icon: <Beef className="w-8 h-8 text-red-400" />,
      foods: [
        "Daging sapi",
        "Hati ayam/sapi",
        "Ikan tuna",
        "Kerang",
        "Daging kambing",
      ],
      absorption: "Penyerapan tinggi (15-35%)",
    },
    {
      category: "Sumber Zat Besi Non-Heme",
      icon: <Leaf className="w-8 h-8 text-green-400" />,
      foods: [
        "Bayam",
        "Kacang merah",
        "Tahu/tempe",
        "Quinoa",
        "Dark chocolate",
      ],
      absorption: "Penyerapan sedang (2-20%)",
    },
    {
      category: "Vitamin C (Meningkatkan Penyerapan)",
      icon: <Apple className="w-8 h-8 text-orange-400" />,
      foods: ["Jeruk", "Strawberry", "Paprika", "Brokoli", "Tomat"],
      absorption: "Meningkatkan penyerapan zat besi",
    },
    {
      category: "Folat & B12",
      icon: <Fish className="w-8 h-8 text-blue-400" />,
      foods: ["Salmon", "Telur", "Alpukat", "Asparagus", "Lentil"],
      absorption: "Penting untuk produksi sel darah merah",
    },
  ];

  const tabs = [
    {
      id: "symptoms",
      label: "Gejala",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      id: "risk-factors",
      label: "Faktor Risiko",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "prevention",
      label: "Pencegahan",
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case "symptoms":
        return symptoms;
      case "risk-factors":
        return riskFactors;
      case "prevention":
        return prevention;
      default:
        return symptoms;
    }
  };

  return (
    <section id="anemia-info" className="py-20 px-6 md:px-12 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient-eye">Informasi</span>{" "}
            <span className="text-gradient-nemia">Anemia</span>
          </h2>
          <p className="text-white/80 text-xl max-w-4xl mx-auto leading-relaxed">
            Pelajari lebih lanjut tentang anemia, mulai dari gejala yang perlu
            diwaspadai, faktor-faktor yang meningkatkan risiko, hingga cara
            pencegahan yang efektif
          </p>
        </div>
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white text-gray-900 shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Content Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {getCurrentData().map((card, index) => (
            <div
              key={card.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              style={{
                animation: isVisible
                  ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  : "none",
              }}
            >
              <div
                className={`${card.bgColor} ${card.color} p-4 rounded-xl w-fit mb-4`}
              >
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">
                {card.title}
              </h3>

              <ul className="space-y-3">
                {card.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start space-x-3 text-white/80"
                  >
                    <div className="w-2 h-2 bg-turquoise rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Food Sources Section */}
        {activeTab === "prevention" && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              Sumber Makanan Penting
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {foodSources.map((source, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center"
                  style={{
                    animation: isVisible
                      ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <div className="flex justify-center mb-4">{source.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {source.category}
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {source.foods.map((food, foodIndex) => (
                      <li key={foodIndex} className="text-white/80 text-sm">
                        {food}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/60 italic">
                    {source.absorption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Warning Box */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl p-8 border border-red-400/30 mb-12">
          <div className="flex items-start space-x-4">
            <div className="bg-red-400/20 p-3 rounded-xl">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Penting untuk Diingat
              </h3>
              <div className="space-y-2 text-white/80">
                <p>
                  • Informasi ini hanya untuk edukasi dan tidak menggantikan
                  konsultasi medis
                </p>
                <p>
                  • Jika mengalami gejala anemia, segera konsultasi dengan
                  dokter
                </p>
                <p>• Diagnosis anemia memerlukan pemeriksaan darah lengkap</p>
                <p>
                  • Pengobatan anemia harus disesuaikan dengan penyebab yang
                  mendasari
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Informasi;
