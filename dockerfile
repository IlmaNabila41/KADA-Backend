FROM node:20-alpine

# Tentukan folder kerja
WORKDIR /app

# Copy daftar library dulu (untuk layer caching agar cepat)
COPY package*.json ./

# Instal library
RUN npm install

# Copy semua file project CRUD 
COPY . .

EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]