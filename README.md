## Explanation Contents of Each Folder

- ### public

Berisikan file tambahan yang diperlukan pada project tersebut seperti icon, image, css dll yang tidak terkena kompres saat build project tersebut.

- ### build

Hasil dari perintah (yarn build / npm run build) project yang telah di compress untuk digunakan pada application server.

- ### node_modules

Sekumpulan library yang telah terinstal dan terdefinisikan pada package.json.

- ### src

Folder yang berisi semua file yang dibutuhkan pada aplikasi mulai dari Component, style, assets dll.

- ### src/_metronic

Berisi file yang berhubungan dengan framework metronic.

- ### src/_metronic/_assets

Merupakan bagian umum framework metronic seperti: js(Layout), plugins(Icons), sass(Style).

- ### src/_metronic/_helpers

Merupakan utilitas global yang digunakan oleh semua modul.

- ### src/_metronic/_partials

Merupakan component global yang digunakan oleh semua modul.

- ### src/_metronic/i18n

Mengatur bahasa yang digunakan pada aplikasi.

- ### src/_metronic/layout
Layouting global yang digunakan pada framework metronic contohnya: SideBar, Header, Footer dll.

- ### src/app

Berisi seluruh modul yang digunakan oleh aplikasi.

- ### src/app/modules

Berisi modules yang penting seperti : Auth, dll.

- ### src/app/pages

Berisi halaman aplikasi seperti : Dashboard, dan halaman lainnya.

- ### src/app/App.js

Merupakan state awal aplikasi dijalankan.

- ### src/app/BasePage.js

Pendefinisian route yang digunakan pada aplikasi.

- ### src/app/Routes.js

Konfigurasi route awal setelah aplikasi dijalankan.

- ### src/app/redux

Berisi mengenai konfigurasi redux store, reducer, setup axios dll.