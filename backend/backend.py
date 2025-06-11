import os
import sqlite3
import cv2 # Impor OpenCV untuk pemrosesan gambar
from datetime import datetime
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
from io import BytesIO
from PIL import Image
from fpdf import FPDF

# Impor fungsi pipeline model yang sesungguhnya
from model_pipeline import run_prediction_pipeline

# Inisialisasi Aplikasi Flask
app = Flask(__name__)
CORS(app)

# --- KONFIGURASI APLIKASI ---
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'kunci-rahasia-super-aman'

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MIN_IMAGE_SIZE = (120, 120)
MAX_IMAGE_SIZE = (7680, 4320)
DB_NAME = 'riwayat.db'
# Ambang batas untuk deteksi blur. Nilai yang lebih rendah berarti gambar harus lebih buram untuk ditolak.
# Anda mungkin perlu menyesuaikan nilai ini setelah melakukan beberapa tes.
BLUR_THRESHOLD = 50.0

def init_db():
    """Membuat tabel database jika belum ada."""
    with sqlite3.connect(DB_NAME) as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS riwayat (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nama TEXT NOT NULL,
                usia INTEGER NOT NULL,
                gender TEXT NOT NULL,
                gambar TEXT NOT NULL,
                hasil TEXT,
                confidence REAL,
                timestamp TEXT NOT NULL
            )
        ''')

def allowed_file(filename):
    """Memeriksa apakah format file diizinkan."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_image_size(filepath):
    """Memvalidasi ukuran file gambar."""
    try:
        with Image.open(filepath) as img:
            width, height = img.size
            if width < MIN_IMAGE_SIZE[0] or height < MIN_IMAGE_SIZE[1]:
                return False, f"Ukuran gambar terlalu kecil (minimal {MIN_IMAGE_SIZE[0]}x{MIN_IMAGE_SIZE[1]} piksel)"
            if width > MAX_IMAGE_SIZE[0] or height > MAX_IMAGE_SIZE[1]:
                return False, f"Ukuran gambar terlalu besar (maksimal {MAX_IMAGE_SIZE[0]}x{MAX_IMAGE_SIZE[1]} piksel)"
        return True, ""
    except IOError:
        return False, "File bukan gambar yang valid atau rusak."

# --- FUNGSI BARU UNTUK DETEKSI BLUR ---
def is_image_blurry(image_path, threshold):
    """Mendeteksi apakah gambar buram dengan menghitung variansi dari Laplacian."""
    # Baca gambar menggunakan OpenCV
    image = cv2.imread(image_path)
    if image is None:
        return False, "Gagal membaca gambar."

    # Ubah ke grayscale untuk mempermudah deteksi tepi
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Hitung variansi dari operator Laplacian
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    
    # Periksa apakah variansi di bawah ambang batas
    if laplacian_var < threshold:
        # Jika ya, gambar dianggap buram
        return True, f"Gambar terdeteksi buram (Skor: {laplacian_var:.2f})"
    else:
        # Jika tidak, gambar dianggap cukup jelas
        return False, f"Gambar jelas (Skor: {laplacian_var:.2f})"

# --- RUTE-RUTE API ---

@app.route('/api/predict', methods=['POST'])
def api_predict():
    """Menerima data, memvalidasi gambar (termasuk deteksi blur), menjalankan model, dan mengembalikan hasil."""
    if 'gambar' not in request.files:
        return jsonify({"error": "File gambar tidak ditemukan"}), 400
    
    file = request.files['gambar']
    nama = request.form.get('nama', 'Anonymous')
    usia = request.form.get('usia', '0')
    gender = request.form.get('gender', 'Unknown')

    if file.filename == '':
        return jsonify({"error": "Tidak ada file yang dipilih"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # 1. Validasi Ukuran Gambar
        valid_size, msg_size = validate_image_size(filepath)
        if not valid_size:
            os.remove(filepath)
            return jsonify({"error": msg_size}), 400

        # 2. Validasi Keburaman Gambar (Blur Detection)
        is_blurry, msg_blur = is_image_blurry(filepath, BLUR_THRESHOLD)
        print(f"Hasil Deteksi Blur: {msg_blur}") # Untuk debugging di terminal
        if is_blurry:
            os.remove(filepath)
            return jsonify({"error": "Gambar terlihat buram. Harap unggah gambar yang lebih fokus dan jelas."}), 400

        # Jika lolos semua validasi, lanjutkan ke prediksi
        try:
            hasil, confidence = run_prediction_pipeline(filepath)
            waktu = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            with sqlite3.connect(DB_NAME) as conn:
                conn.execute('''INSERT INTO riwayat (nama, usia, gender, gambar, hasil, confidence, timestamp)
                                VALUES (?, ?, ?, ?, ?, ?, ?)''',
                             (nama, usia, gender, filename, hasil, confidence, waktu))

            return jsonify({
                "prediction": hasil,
                "confidence": confidence,
                "image_url": f"/static/uploads/{filename}",
                "message": "Prediksi berhasil"
            })
        except Exception as e:
            return jsonify({"error": f"Gagal melakukan prediksi: {str(e)}"}), 500
        
    else:
        return jsonify({"error": "Format file harus PNG, JPG, atau JPEG"}), 400

# (Rute /riwayat dan /download/<id> tetap sama)
@app.route('/riwayat')
def riwayat():
    #... (kode tidak berubah)
    pass
@app.route('/download/<int:id>')
def download_pdf(id):
    #... (kode tidak berubah)
    pass

@app.route('/')
def index():
    return "<h1>Backend Eyenemia Aktif (dengan Deteksi Blur)</h1><p>Silakan gunakan antarmuka frontend untuk berinteraksi.</p>"

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    init_db()
    app.run(debug=True, port=5000)

