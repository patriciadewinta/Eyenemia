import cv2
import torch
import numpy as np
from ultralytics import YOLO
from PIL import Image

# --- KONFIGURASI ---
# Path ini sesuai dengan struktur folder yang telah kita sepakati
SEGMENTATION_MODEL_PATH = 'models/best-seg.pt'
CLASSIFICATION_MODEL_PATH = 'models/best-cls.pt'

# Nama kelas sesuai dengan output di notebook: (0: Anemic, 1: Non-Anemic)
# NOTE: Di notebook, Anemic adalah 0 dan Non-Anemic adalah 1.
CLASS_NAMES = {0: "Anemia", 1: "Normal"} 

# --- MEMUAT MODEL (Dilakukan sekali saat aplikasi dimulai) ---
# Cek ketersediaan GPU, jika tidak ada, gunakan CPU
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"Menggunakan device: {device}")

try:
    # Muat model segmentasi dan klasifikasi
    segmentation_model = YOLO(SEGMENTATION_MODEL_PATH)
    classification_model = YOLO(CLASSIFICATION_MODEL_PATH)
    print("Model Segmentasi dan Klasifikasi dari tim modeling berhasil dimuat.")
except Exception as e:
    print(f"Error saat memuat model: {e}")
    segmentation_model = None
    classification_model = None

# --- FUNGSI-FUNGSI PIPELINE SESUAI NOTEBOOK ---

def resize_with_letterbox(image_pil, target_size=224):
    """
    Melakukan resize gambar dengan metode letterbox agar rasio aspek terjaga.
    Fungsi ini meniru proses resize yang ada di notebook.
    """
    # Menjaga rasio aspek
    image_pil.thumbnail((target_size, target_size), Image.Resampling.LANCZOS)
    
    # Membuat canvas baru dengan latar belakang transparan (RGBA)
    new_img = Image.new("RGBA", (target_size, target_size), (0, 0, 0, 0))
    
    # Tempel gambar hasil resize di tengah canvas
    paste_position = ((target_size - image_pil.width) // 2, (target_size - image_pil.height) // 2)
    new_img.paste(image_pil, paste_position)
    
    return new_img

def run_prediction_pipeline(image_path):
    """
    Fungsi utama yang menjalankan seluruh pipeline persis seperti di notebook.
    """
    if segmentation_model is None or classification_model is None:
        raise Exception("Model tidak berhasil dimuat.")

    # 1. SEGMENTASI
    # Prediksi menggunakan model segmentasi dengan conf=0.25 seperti di notebook
    seg_results = segmentation_model.predict(source=image_path, conf=0.25, verbose=False)
    
    result = seg_results[0]
    if result.masks is None or len(result.masks.data) == 0:
        return "Bagian Mata Tidak Ditemukan", 0.0

    # Ambil mask pertama yang terdeteksi
    mask_data = result.masks.data[0].cpu().numpy()
    original_img_bgr = result.orig_img
    h_orig, w_orig, _ = original_img_bgr.shape
    
    # Resize mask ke ukuran gambar asli
    mask_resized = cv2.resize(mask_data, (w_orig, h_orig), interpolation=cv2.INTER_LINEAR)
    mask_binary = (mask_resized > 0.5).astype(np.uint8)

    # Buat alpha channel dari mask untuk membuat latar belakang transparan
    alpha_channel = (mask_binary * 255).astype(np.uint8)
    img_bgra = cv2.cvtColor(original_img_bgr, cv2.COLOR_BGR2BGRA)
    img_bgra[:, :, 3] = alpha_channel

    # Konversi ke format PIL (RGBA) untuk diproses lebih lanjut
    img_rgba = cv2.cvtColor(img_bgra, cv2.COLOR_BGRA2RGBA)
    img_pil = Image.fromarray(img_rgba)

    # 2. RESIZE LETTERBOX
    # Gunakan fungsi resize letterbox yang sesuai dengan notebook
    img_letterboxed = resize_with_letterbox(img_pil, target_size=224)

    # 3. KLASIFIKASI
    # Konversi gambar RGBA ke RGB untuk input model klasifikasi
    img_for_classification = img_letterboxed.convert("RGB")
    
    # Lakukan prediksi klasifikasi
    cls_results = classification_model.predict(source=img_for_classification, verbose=False)
    
    cls_result = cls_results[0]
    if cls_result.probs is None:
        return "Gagal Klasifikasi", 0.0

    # Ambil hasil prediksi
    predicted_class_id = cls_result.probs.top1
    confidence = cls_result.probs.top1conf.item()
    
    # Terjemahkan class ID menjadi nama kelas (string)
    predicted_class_name = CLASS_NAMES.get(predicted_class_id, "Tidak Diketahui")

    # Debugging di terminal untuk memastikan hasilnya benar
    print(f"DEBUG: Predicted Class ID: {predicted_class_id} -> {predicted_class_name}, Confidence: {confidence:.4f}")
    
    return predicted_class_name, confidence

