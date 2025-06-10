# EyeNemia

Sistem deteksi anemia non-invasif berbasis citra konjungtiva palpebra mata menggunakan teknologi computer vision dan machine learning. Aplikasi ini memanfaatkan model YOLOv11 untuk mendeteksi dan menyegmentasi area palpebral mata, kemudian mengklasifikasikan potensi anemia berdasarkan analisis visual konjungtiva tanpa perlu pengambilan sampel darah.

## Tujuan
- Menyediakan metode skrining anemia awal yang cepat, aman, dan nyaman melalui deteksi konjungtiva palpebra
- Mengembangkan pendekatan non-invasif berbasis visual yang bisa digunakan di berbagai kondisi, termasuk fasilitas layanan kesehatan dengan sumber daya terbatas
- Memberikan solusi berbasis web yang dapat diakses secara luas untuk mendukung praktik telediagnosis dalam layanan kesehatan jarak jauh

## Fitur Utama
- 📷 Deteksi Anemia Berdasarkan Citra Konjungtiva Palpebra
Menggunakan citra konjungtiva palpebra (bagian dalam kelopak mata bawah) untuk mengidentifikasi indikasi anemia berdasarkan parameter warna dan pencahayaan.
- 🧠 Model Deteksi dan Segmentasi Berbasis YOLO
Menerapkan model YOLOv11 untuk mendeteksi dan menyegmentasi area palpebral mata secara otomatis dan presisi, menghasilkan ROI (region of interest) dari konjungtiva.
- 🎯 Klasifikasi Otomatis Kondisi Anemia
Mengklasifikasikan potensi anemia berdasarkan analisis citra konjungtiva palpebra yang telah tersegmentasi, membedakan antara kondisi anemik dan non-anemik.
- 🌐 Antarmuka Web Interaktif
Sistem terintegrasi dengan platform web yang memungkinkan pengguna mengunggah citra mata dan memperoleh hasil prediksi secara real-time dengan aksesibilitas tinggi dan kompatibilitas antar perangkat.
