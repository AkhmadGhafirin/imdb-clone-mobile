const createSlug = (title) => {
    return title
        .toLowerCase() // Mengubah judul menjadi huruf kecil semua
        .replace(/[^\w\s-]/g, '') // Menghapus karakter khusus
        .replace(/\s+/g, '-') // Mengganti spasi dengan tanda hubung
        .replace(/--+/g, '-') // Menghilangkan tanda hubung berulang
        .trim(); // Menghapus spasi di awal dan akhir judul
}

module.exports = { createSlug }