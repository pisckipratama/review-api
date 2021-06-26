## Notes

#### Generate Model User

`sequelize model:generate --name User --attributes email:string,password:string,photo:string,delete_at:date`

#### Generate Model Room

`sequelize model:generate --name Room --attributes room_name:string,room_capacity:string,photo:string,deleted_at:date`

## Soal / ToDo

Sebuah perusahaan ingin membuat aplikasi pendaftaran ruangan meeting.
Buatlah Rest API dari kasus tersebut :
- [x] User admin login dan memasukkan data ruangan
- [x] User Guest register dengan data (email, password, photo profile)
- [x] User Guest login
- [x] User Guest melihat ruangan yang tersedia
- [x] User Guest memboking di ruangan tersebut pada tanggal dan waktu yang telah dia tentukan.
      <b>CATATAN</b>: total orang tidak boleh lebih dari kapasitas ruangan
- [x] User mendapatkan email tentang bokingan
- [x] User mendapatkan email pemberitahuan ketika tanggal booking = tanggal saat ini
- [x] User Cek in ruangan
- [x ] User mendapatkan email Cek In
- [ ] Deployed

## Aturan

- Gunakan pihak ketiga untuk mengirim email dan menyimpan image
- Rest API dan GraphQL menggunakan repository berbeda
- Gunakan migration dan seeder
- Gunakan database MySql dengan ERD seperti berikut [link](https://dbdiagram.io/d/5fd31eb39a6c525a03baabc9)
- Silahkan deploy dan pastikan live (bisa deploy di heroku)
- Pastikan code yang ditulis dengan clean, ter standar dan mudah dibaca
- Rest API buatlah documentation menggunakan postman

## Pengumpulan

Kumpulkan pada [link berikut](https://docs.google.com/forms/d/e/1FAIpQLSdvCHojK761wQzAbOZb-LqoDzs6AKUZxxXVmjklGkJZCTT0mQ/viewform?usp=sf_link)
