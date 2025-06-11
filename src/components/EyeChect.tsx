import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Camera, AlertCircle, Check, CameraOff, Image as ImageIcon, Sparkles, X } from "lucide-react";

// Fungsi utilitas untuk mengubah data URL menjadi objek File
function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(','),
        mimeMatch = arr[0].match(/:(.*?);/),
        mime = mimeMatch ? mimeMatch[1] : 'image/jpeg',
        bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

const EyeCheck: React.FC = () => {
  // State untuk data form
  const [nama, setNama] = useState('');
  const [usia, setUsia] = useState('');
  const [gender, setGender] = useState('');
  
  // State untuk gambar dan proses
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State dan Ref untuk fungsionalitas kamera
  const [cameraMode, setCameraMode] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const navigate = useNavigate();
  const BACKEND_URL = "http://127.0.0.1:5000";

  // --- LOGIKA PENANGANAN GAMBAR ---
  const processFile = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Silakan pilih file gambar yang valid.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setError("Ukuran gambar harus kurang dari 5MB.");
        return;
      }
      setSelectedImage(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFile(event.target.files?.[0] || null);
  };
  
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    processFile(event.dataTransfer.files?.[0] || null);
  };

  // --- LOGIKA KAMERA ---
  const startCamera = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        setStream(mediaStream);
        setCameraMode(true);
    } catch (err) {
        setError("Tidak bisa mengakses kamera. Pastikan Anda telah memberikan izin.");
    }
  };

  const stopCamera = () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setCameraMode(false);
  };

  useEffect(() => {
    if (cameraMode && stream && videoRef.current) {
        videoRef.current.srcObject = stream;
    }
    return () => { if (stream) { stream.getTracks().forEach(track => track.stop()); }};
  }, [cameraMode, stream]);

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const dataUrl = canvas.toDataURL('image/jpeg');
            const file = dataURLtoFile(dataUrl, 'capture.jpg');
            processFile(file);
            stopCamera();
        }
    }
  };

  // --- LOGIKA PREDIKSI ---
  const handlePredict = async () => {
    if (!selectedImage || !nama || !usia || !gender) {
      setError("Harap lengkapi semua data diri dan siapkan gambar.");
      return;
    }
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('usia', usia);
    formData.append('gender', gender);
    formData.append('gambar', selectedImage);
    try {
      const response = await fetch(`${BACKEND_URL}/api/predict`, { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Terjadi kesalahan pada server.');
      navigate("/hasil", { state: { result: { ...data, image: imagePreview } } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetImage = () => {
    setImagePreview(null);
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-pulse">Menganalisis Foto Mata...</h2>
          <p className="text-white/80 text-xl">AI sedang memproses gambar Anda...</p>
        </div>
      </div>
    );
  }
  
  // ===== PERUBAHAN DI SINI: Tampilan Kamera Diperbaiki =====
  if (cameraMode) {
     return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <p className="text-white mb-4 text-center">Posisikan mata Anda di dalam frame dan pastikan gambar fokus.</p>
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-2xl h-auto rounded-lg shadow-lg"></video>
            <div className="flex gap-4 mt-6">
                <button onClick={takePicture} className="p-5 bg-white rounded-full shadow-lg transition-transform hover:scale-110"><Camera className="w-8 h-8 text-gray-800" /></button>
                <button onClick={stopCamera} className="p-5 bg-red-500 rounded-full shadow-lg transition-transform hover:scale-110"><X className="w-8 h-8 text-white" /></button>
            </div>
            {/* Canvas tersembunyi harus ada di sini agar bisa diakses oleh takePicture */}
            <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
           <h1 className="text-5xl md:text-6xl font-bold mb-6"><span className="text-gradient-eye">Eye</span> <span className="text-gradient-nemia">Check</span></h1>
           <p className="text-white/80 text-xl max-w-2xl mx-auto">Lengkapi data diri dan unggah foto mata Anda untuk deteksi dini anemia.</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 space-y-8">
            {/* Form Data Diri */}
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="nama" className="block text-white/80 text-sm font-medium mb-2">Nama</label>
                    <input type="text" id="nama" value={nama} onChange={e => setNama(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-turquoise" />
                </div>
                <div>
                    <label htmlFor="usia" className="block text-white/80 text-sm font-medium mb-2">Usia</label>
                    <input 
                        type="number" 
                        id="usia" 
                        value={usia} 
                        min="0"
                        onChange={e => { if (parseInt(e.target.value) >= 0 || e.target.value === "") { setUsia(e.target.value) }}}
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-turquoise" 
                    />
                </div>
                <div>
                    <label htmlFor="gender" className="block text-white/80 text-sm font-medium mb-2">Jenis Kelamin</label>
                    <select 
                        id="gender" 
                        value={gender} 
                        onChange={e => setGender(e.target.value)} 
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:ring-2 focus:ring-turquoise"
                    >
                        <option value="" className="text-black">Pilih...</option>
                        <option value="Laki-laki" className="text-black">Laki-laki</option>
                        <option value="Perempuan" className="text-black">Perempuan</option>
                    </select>
                </div>
            </div>

            {/* Upload Area */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">Upload Foto Mata</h3>
                <div className="w-full min-h-[250px] border-2 border-dashed border-white/30 rounded-lg bg-white/5 flex flex-col justify-center items-center p-4 relative overflow-hidden">
                    {imagePreview ? (
                        <div className="text-center space-y-4">
                            <img src={imagePreview} alt="Preview" className="max-w-xs max-h-[220px] mx-auto rounded-lg shadow-lg" />
                            <button onClick={resetImage} className="text-sm text-red-400 hover:underline">Hapus gambar</button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <ImageIcon className="w-12 h-12 mb-3 text-white/60 mx-auto" />
                            <p className="mb-4 text-sm text-white/60"><span className="font-semibold">Klik tombol di bawah ini</span></p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label htmlFor="image-upload" className="cursor-pointer px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20 flex items-center justify-center gap-2">
                                    <Upload size={18} />
                                    <span>Upload Galeri</span>
                                </label>
                                <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                <button onClick={startCamera} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 border border-white/20 flex items-center justify-center gap-2">
                                   <Camera size={18}/> 
                                   <span>Buka Kamera</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Panduan */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Panduan Pengambilan Foto:</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                    <li className="flex items-start space-x-3"><div className="w-2 h-2 bg-turquoise rounded-full mt-1.5 flex-shrink-0"></div><span>Pastikan pencahayaan cukup terang</span></li>
                    <li className="flex items-start space-x-3"><div className="w-2 h-2 bg-turquoise rounded-full mt-1.5 flex-shrink-0"></div><span>Fokus pada area kelopak mata bagian bawah</span></li>
                    <li className="flex items-start space-x-3"><div className="w-2 h-2 bg-turquoise rounded-full mt-1.5 flex-shrink-0"></div><span>Hindari bayangan atau refleksi cahaya</span></li>
                    <li className="flex items-start space-x-3"><div className="w-2 h-2 bg-turquoise rounded-full mt-1.5 flex-shrink-0"></div><span>Pastikan gambar tidak buram atau kabur</span></li>
                    <li className="flex items-start space-x-3"><div className="w-2 h-2 bg-turquoise rounded-full mt-1.5 flex-shrink-0"></div><span>Pastikan jarak antara mata dan kamera kurang lebih 3 cm</span></li>
                </ul>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
            
            {/* Tombol Aksi */}
            <div className="text-center">
                <button onClick={handlePredict} disabled={!selectedImage || isLoading || !nama || !usia || !gender} 
                className={`w-full md:w-auto px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed ${
                    selectedImage && !isLoading && nama && usia && gender
                      ? "bg-gradient-to-r from-turquoise to-coral text-white shadow-lg hover:shadow-turquoise/25"
                      : "bg-gray-500/50 text-gray-400"
                  }`}>
                  <Sparkles className="w-6 h-6" />
                  <span>Prediksi Anemia</span>
                </button>
            </div>

             {/* Disclaimer */}
            <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-200 text-xs text-center leading-relaxed">
                  <strong>Disclaimer:</strong> Hasil deteksi ini hanya sebagai indikasi awal. Konsultasikan dengan dokter untuk diagnosis yang akurat.
                </p>
            </div>

        </div>
      </div>
      {/* Canvas dipindahkan ke sini agar selalu ada, namun tidak ditampilkan kecuali di mode kamera */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default EyeCheck;
