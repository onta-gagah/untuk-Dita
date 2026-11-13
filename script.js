/* ============ PENGATURAN: bagian yang boleh kamu ganti ============ */
var KONFIG = {
  // Tantangan di halaman awal. Jawaban yang sama harus diisi beberapa kali berturut-turut,
  // dan formnya berpindah tempat setiap kali jawabannya benar.
  PERTANYAAN_GERBANG: "Siapa cowo terganteng di dunia?",
  KODE: "brian",                 // jawaban sekaligus password, huruf besar atau kecil dianggap sama
  JUMLAH_ULANG: 3,               // berapa kali jawaban harus diisi
  PESAN_SALAH: "Hmm, kayaknya bukan itu. Coba lagi ya.",

  // Petunjuk kecil di bawah form. Kosongkan ("") kalau tidak mau ada petunjuk.
  PETUNJUK: "Petunjuk: orang yang membuat kejutan ini.",

  // Kotak hadiah di halaman kedua. Diketuk, bergetar, lalu meledak.
  TEKS_AJAKAN: "Ketuk untuk membuka kotaknya",
  TEKS_TIUP: "Ketuk untuk meniup lilinnya",
  TEKS_POTONG: "Sekarang ketuk untuk memotong kuenya",

  // Format surat
  TEMPAT_TANGGAL: "",                       // contoh: "Surabaya, 31 Oktober 2026". Kosongkan kalau tidak perlu.
  SALAM: "Kepada Dita yang tersayang,",
  PENUTUP: "Dengan sayang,",
  PENGIRIM: "Brian",
  TTD: "ttd.png",                           // file tanda tangan, taruh sejajar dengan index.html. Kalau belum ada, otomatis dilewati.

  // Satu item satu paragraf. Ini masih pesan sementara.
  PESAN: [
    "Selamat ulang tahun yang ke 23, Dita Ristyani. Terima kasih sudah menjadi tempat paling nyaman untuk pulang, paling nyaman untuk berkabar, paling diandalkan dalam setiap penentuan dalam setiap keadaan.",
    "Semoga di usia 23 th ini membawa lebih banyak tawa, kabar baik, dan kesempatan untuk semua rencana yang sedang kamu jaga pelan-pelan. Apa pun yang kamu kejar, cinta, jiwa, dan ragaku ku ada di sampingmu. Ingat itu ya tuyycan:)"
    "Maaf atas segala dosa yang kuperbuat dan menyakitimu selama ini. Terimakasih atas kesempatan yang telah diberikan kembali. Akan ku jaga dirimu, akan ku pegang janjiku padamu."
  ],

  // Kotak balasan dan tombol WhatsApp di bawah pesan.
  // Nomor ditulis dengan awalan 62, tanpa 0 di depan dan tanpa tanda plus.
  NOMOR_WA: "6285851918299",
  PESAN_WA: "aku sudah baca pesannya sayangg",
  JUDUL_BALASAN: "Ada yang ingin kamu sampaikan?",
  PLACEHOLDER_BALASAN: "Tulis di sini, boleh dikosongkan",
  TEKS_TOMBOL_WA: "Kirim ke Brian lewat WhatsApp",

  // Video lewat link Google Drive (atau link lain). Tempel linknya di LINK_VIDEO.
  // Di Google Drive: klik kanan videonya, Bagikan, ubah akses jadi "Siapa saja yang memiliki link", lalu salin link.
  // Kosongkan ("") kalau tidak mau ada tombol video.
  LINK_VIDEO: "https://drive.google.com/file/d/1vTXpw0-jS5YlxDFrhY0BYQgq5Prmzb6e/view?usp=sharing",
  TEKS_TOMBOL_VIDEO: "Ada satu hal lagi untukmu",

  // Foto latar. Taruh di folder foto dengan nama 1, 2, 3 dan seterusnya.
  // Ekstensi jpg, jpeg, png, dan webp dikenali otomatis. Penomoran harus urut tanpa lompat.
  FOLDER_FOTO: "foto",
  FOTO_MAKS: 40,

  // Kalau ada foto dengan nama lain, tulis lengkap di sini. Boleh dikosongkan.
  FOTO_LAIN: [
    // "foto/kenangan-pantai.jpg",
  ],

  UKURAN_KOTAK: 170,     // ukuran satu kotak foto dalam piksel, makin kecil makin ramai
  KECEPATAN_KEDIP: 600,  // selang ganti foto dalam milidetik, makin kecil makin cepat

  // Musik latar. Taruh file mp3 sejajar dengan index.html. Kosongkan ("") kalau tidak mau ada musik.
  // Browser tidak mengizinkan suara otomatis sebelum halaman disentuh, jadi musik mulai
  // saat Dita pertama kali mengetuk atau menekan tombol apa pun di halaman.
  MUSIK: "musik.mp3",
  VOLUME: 0.6            // 0 sampai 1
};
/* ================================================================= */

(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  function acak(a, b) { return a + Math.random() * (b - a); }

  /* ---------- isi teks dari pengaturan ---------- */
  $("petunjuk").textContent = KONFIG.PETUNJUK;
  $("ajakan").textContent = KONFIG.TEKS_AJAKAN;
  $("ajakan-kue").textContent = KONFIG.TEKS_TIUP;
  $("salam").textContent = KONFIG.SALAM;
  $("penutup").textContent = KONFIG.PENUTUP;
  $("pengirim").textContent = KONFIG.PENGIRIM;
  if (KONFIG.TEMPAT_TANGGAL) {
    $("tempat-tanggal").textContent = KONFIG.TEMPAT_TANGGAL;
    $("tempat-tanggal").hidden = false;
  }
  if (KONFIG.TTD) {
    var gambarTtd = new Image();
    gambarTtd.onload = function () {
      $("ttd").src = KONFIG.TTD;
      $("ttd").hidden = false;
    };
    gambarTtd.src = KONFIG.TTD;
  }
  KONFIG.PESAN.forEach(function (teks) {
    var p = document.createElement("p");
    p.textContent = teks;
    $("isi-pesan").appendChild(p);
  });
  $("judul-balasan").textContent = KONFIG.JUDUL_BALASAN;
  $("balasan").placeholder = KONFIG.PLACEHOLDER_BALASAN;

  // Tautan WhatsApp selalu diperbarui mengikuti isi kotak balasan.
  // Halaman web tidak bisa mengirim pesan WhatsApp sendiri, jadi tombol ini
  // membuka WhatsApp dengan pesan yang sudah terisi dan Dita tinggal menekan kirim.
  var tombolWa = $("tombol-wa");
  tombolWa.textContent = KONFIG.TEKS_TOMBOL_WA;
  function perbaruiWa() {
    var isi = $("balasan").value.trim();
    var teks = KONFIG.PESAN_WA + (isi ? "\n\n" + isi : "");
    tombolWa.href = "https://wa.me/" + KONFIG.NOMOR_WA + "?text=" + encodeURIComponent(teks);
  }
  $("balasan").addEventListener("input", perbaruiWa);
  perbaruiWa();

  /* ---------- musik latar ---------- */
  var musik = $("musik");
  var tombolMusik = $("tombol-musik");
  var dijedaManual = false;   // true kalau Dita sengaja menjeda
  var naikan = null;

  function perbaruiMusik() {
    var main = !musik.paused;
    tombolMusik.classList.toggle("jeda", !main);
    tombolMusik.setAttribute("aria-label", main ? "Jeda musik" : "Putar musik");
  }

  function mainkan() {
    musik.volume = 0;
    var janji = musik.play();
    if (janji && janji.then) {
      janji.then(function () {
        // volume naik pelan-pelan
        clearInterval(naikan);
        naikan = setInterval(function () {
          musik.volume = Math.min(KONFIG.VOLUME, musik.volume + KONFIG.VOLUME / 20);
          if (musik.volume >= KONFIG.VOLUME) clearInterval(naikan);
        }, 75);
        perbaruiMusik();
      }).catch(function () { perbaruiMusik(); });
    }
  }

  if (KONFIG.MUSIK) {
    musik.src = KONFIG.MUSIK;
    tombolMusik.hidden = false;
    musik.addEventListener("error", function () { tombolMusik.hidden = true; });
    musik.addEventListener("play", perbaruiMusik);
    musik.addEventListener("pause", perbaruiMusik);
    perbaruiMusik();

    // Musik mulai pada sentuhan pertama, dan berhenti menunggu sentuhan setelah benar-benar bunyi.
    var pemicu = ["click", "touchend", "keydown"];
    var mulaiPertama = function (e) {
      if (tombolMusik.contains(e.target)) return;
      if (dijedaManual || !musik.paused) return;
      mainkan();
    };
    var lepaskan = function () {
      pemicu.forEach(function (n) { document.removeEventListener(n, mulaiPertama); });
      musik.removeEventListener("playing", lepaskan);
    };
    pemicu.forEach(function (n) { document.addEventListener(n, mulaiPertama); });
    musik.addEventListener("playing", lepaskan);

    tombolMusik.addEventListener("click", function (e) {
      e.stopPropagation();
      if (musik.paused) { dijedaManual = false; mainkan(); }
      else { dijedaManual = true; musik.pause(); }
    });
  }

  /* ---------- tombol video (link Google Drive) ---------- */
  var tombolVideo = $("tombol-video");
  var musikSebelumVideo = false;

  if (KONFIG.LINK_VIDEO) {
    tombolVideo.textContent = KONFIG.TEKS_TOMBOL_VIDEO;
    tombolVideo.hidden = false;
    tombolVideo.addEventListener("click", function () {
      musikSebelumVideo = !!(KONFIG.MUSIK && !musik.paused);
      if (musikSebelumVideo) musik.pause();   // supaya tidak bertabrakan dengan suara video
      window.open(KONFIG.LINK_VIDEO, "_blank", "noopener");
    });
    // musik menyala lagi saat Dita kembali ke halaman ini
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible" && musikSebelumVideo && !dijedaManual) {
        musikSebelumVideo = false;
        mainkan();
      }
    });
  }

  /* ---------- pindah halaman ---------- */
  function pindah(id) {
    var lama = document.querySelector(".halaman.aktif");
    var baru = $("halaman-" + id);
    if (lama === baru) return;
    if (lama) {
      lama.classList.add("keluar");
      lama.classList.remove("aktif");
      setTimeout(function () { lama.classList.remove("keluar"); }, 450);
    }
    baru.classList.add("aktif");
  }

  /* ---------- gerbang kode ---------- */
  var form = $("form-kode");
  var galat = $("galat");
  var ronde = 0;            // jumlah jawaban benar sejauh ini
  var sedangPindah = false;
  var jedaPindah = reduce ? 0 : 340;

  $("pertanyaan").textContent = KONFIG.PERTANYAAN_GERBANG;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sedangPindah) return;
    var masukan = $("kode").value.trim().toLowerCase();

    if (masukan !== KONFIG.KODE.toLowerCase()) {
      galat.textContent = KONFIG.PESAN_SALAH;
      galat.hidden = false;
      form.classList.remove("datang");
      form.classList.remove("goyang");
      void form.offsetWidth;
      form.classList.add("goyang");
      $("kode").select();
      return;
    }

    galat.hidden = true;
    ronde++;
    sedangPindah = true;
    form.classList.remove("datang");
    form.classList.remove("goyang");
    form.classList.add("pergi");

    if (ronde >= KONFIG.JUMLAH_ULANG) {
      setTimeout(masuk, reduce ? 200 : 700);
      return;
    }

    // form menghilang, lalu muncul lagi di tempat lain
    setTimeout(function () {
      form.setAttribute("data-posisi", String(ronde % 4));
      $("kode").value = "";
      form.classList.remove("pergi");
      void form.offsetWidth;
      form.classList.add("datang");
      sedangPindah = false;
      $("kode").focus();
    }, jedaPindah);
  });

  function masuk() {
    pindah("ucapan");   // halaman kotak hadiah
  }

  /* ---------- kotak hadiah ---------- */
  var kado = $("kado");
  var hadiah = $("hadiah");
  var kadoDibuka = false;

  kado.addEventListener("click", function (e) {
    e.stopPropagation();
    if (kadoDibuka) return;
    kadoDibuka = true;
    kado.classList.add("dibuka");
    if (!reduce) hadiah.classList.add("getar");

    // kotak bergetar dulu, lalu meledak
    setTimeout(function () {
      var r = hadiah.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      hadiah.classList.add("meledak");
      $("kilat").classList.add("nyala");
      semburan(cx, cy, 90, 18, true);
      semburan(cx, cy, 70, 12, true);
      rayakan();
      // latar foto muncul bersama ledakan
      $("dasar").classList.add("tampil");
      bangunLatar();
      mulaiKedip();
      setTimeout(ucapanMuncul, reduce ? 100 : 550);
    }, reduce ? 150 : 750);
  });

  function ucapanMuncul() {
    kado.hidden = true;
    var isi = $("ucapan-isi");
    isi.hidden = false;
    isi.classList.add("muncul-besar");
    semburan(window.innerWidth * 0.5, window.innerHeight * 0.35, 50, 12);
  }

  /* ---------- kue: tiup lilin, lalu potong ---------- */
  var pesta = $("pesta");
  var tahapKue = 0;   // 0 lilin menyala, 1 lilin padam, 2 sudah dipotong

  pesta.addEventListener("click", function (e) {
    e.stopPropagation();
    var r = pesta.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height * 0.4;
    if (tahapKue === 0) {
      tahapKue = 1;
      pesta.classList.add("padam");
      $("ajakan-kue").textContent = KONFIG.TEKS_POTONG;
      semburan(cx, cy, 30, 9);
    } else if (tahapKue === 1) {
      tahapKue = 2;
      pesta.classList.add("potong", "selesai");
      $("ajakan-kue").textContent = "";
      setTimeout(function () {
        semburan(cx, cy, 90, 15, true);
        balon(reduce ? 0 : 6);
        var kartu = $("kartu-pesan");
        kartu.hidden = false;
        kartu.classList.add("muncul");
        $("rayakan").hidden = false;
        setTimeout(function () {
          kartu.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        }, 300);
      }, reduce ? 150 : 1100);
    }
  });

  /* ---------- pencarian foto ---------- */
  var ada = [];  // foto yang berhasil dimuat
  var EKSTENSI = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP", "jpg.jpg", "png.png"];

  function coba(src, berhasil, gagal) {
    var im = new Image();
    im.onload = function () { berhasil(src); };
    im.onerror = gagal;
    im.src = src;
  }

  function cariNomor(n) {
    if (n > KONFIG.FOTO_MAKS) return;
    var i = 0;
    (function lanjut() {
      if (i >= EKSTENSI.length) return;  // nomor ini tidak ada, pencarian berhenti
      var src = KONFIG.FOLDER_FOTO + "/" + n + "." + EKSTENSI[i++];
      coba(src, function (s) { ada.push(s); cariNomor(n + 1); }, lanjut);
    })();
  }
  cariNomor(1);
  KONFIG.FOTO_LAIN.forEach(function (src) {
    coba(src, function (s) { if (ada.indexOf(s) < 0) ada.push(s); }, function () {});
  });

  /* ---------- latar grid foto ---------- */
  var latar = $("latar");
  var kotakKotak = [];
  var pinkan = ["#ee6a9b", "#ff9fc0", "#f8b4cb", "#ffd8e5", "#c42f6c", "#ffc2d6"];

  function bangunLatar() {
    var u = KONFIG.UKURAN_KOTAK;
    var kolom = Math.ceil(window.innerWidth / u);
    var baris = Math.ceil(window.innerHeight / u);
    latar.innerHTML = "";
    kotakKotak = [];
    latar.style.gridTemplateColumns = "repeat(" + kolom + ", 1fr)";
    latar.style.gridTemplateRows = "repeat(" + baris + ", 1fr)";
    for (var i = 0; i < kolom * baris; i++) {
      var k = document.createElement("div");
      k.className = "kotak";
      k.style.background = pinkan[Math.floor(Math.random() * pinkan.length)];
      for (var j = 0; j < 2; j++) {
        var l = document.createElement("img");
        l.className = "lapis";
        l.alt = "";
        l.draggable = false;
        l.decoding = "async";
        k.appendChild(l);
      }
      latar.appendChild(k);
      kotakKotak.push(k);
      ganti(k, true);
    }
  }

  function ganti(k, tanpaKedip) {
    if (!ada.length) {
      // belum ada foto, ganti warna saja
      k.style.background = pinkan[Math.floor(Math.random() * pinkan.length)];
    } else {
      var lapis = k.querySelectorAll(".lapis");
      var depan = k.querySelector(".lapis.tampil");
      var belakang = lapis[0] === depan ? lapis[1] : lapis[0];
      var sekarang = depan ? depan.getAttribute("src") : "";
      var pilih = sekarang;
      for (var n = 0; n < 5 && pilih === sekarang; n++) {
        pilih = ada[Math.floor(Math.random() * ada.length)];
      }
      belakang.src = pilih;
      belakang.classList.add("tampil");
      if (depan) depan.classList.remove("tampil");
    }
    if (!tanpaKedip) {
      k.classList.remove("kedip");
      void k.offsetWidth;
      k.classList.add("kedip");
    }
  }

  var pewaktu = null;
  function mulaiKedip() {
    if (pewaktu) clearInterval(pewaktu);
    var selang = reduce ? 2500 : KONFIG.KECEPATAN_KEDIP;
    pewaktu = setInterval(function () {
      if (!kotakKotak.length) return;
      var banyak = reduce ? 1 : 1 + Math.floor(Math.random() * 2);
      for (var i = 0; i < banyak; i++) {
        ganti(kotakKotak[Math.floor(Math.random() * kotakKotak.length)]);
      }
    }, selang);
  }

  var tundaUkuran;
  window.addEventListener("resize", function () {
    clearTimeout(tundaUkuran);
    tundaUkuran = setTimeout(function () {
      ukuranKanvas();
      if (kadoDibuka && $("halaman-ucapan").classList.contains("aktif")) bangunLatar();
    }, 200);
  });

  /* ---------- konfeti ---------- */
  var kanvas = $("konfeti");
  var ctx = kanvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var warna = ["#ee6a9b", "#ff9fc0", "#ffd8e5", "#ffffff", "#c42f6c", "#f8b4cb", "#ffc9a8"];
  var partikel = [];
  var jalan = false;

  function ukuranKanvas() {
    kanvas.width = Math.floor(window.innerWidth * dpr);
    kanvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  ukuranKanvas();

  // semua = true berarti meledak ke segala arah, bukan hanya ke atas
  function semburan(x, y, jumlah, kuat, semua) {
    if (reduce) jumlah = Math.round(jumlah / 4);
    for (var i = 0; i < jumlah; i++) {
      var sudut = semua ? acak(0, 6.28) : acak(-Math.PI, 0) + acak(-0.3, 0.3);
      var laju = acak(4, kuat);
      partikel.push({
        x: x, y: y,
        vx: Math.cos(sudut) * laju, vy: Math.sin(sudut) * laju,
        w: acak(6, 11), h: acak(4, 7),
        r: acak(0, 6.28), vr: acak(-0.25, 0.25),
        c: warna[Math.floor(Math.random() * warna.length)],
        hidup: acak(70, 120),
        bulat: Math.random() < 0.25
      });
    }
    if (!jalan) { jalan = true; requestAnimationFrame(gambar); }
  }

  function gambar() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = partikel.length - 1; i >= 0; i--) {
      var p = partikel[i];
      p.vy += 0.17; p.vx *= 0.99;
      p.x += p.vx; p.y += p.vy; p.r += p.vr; p.hidup -= 1;
      if (p.hidup <= 0 || p.y > window.innerHeight + 20) { partikel.splice(i, 1); continue; }
      ctx.save();
      ctx.globalAlpha = Math.min(1, p.hidup / 30);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      if (p.bulat) { ctx.beginPath(); ctx.arc(0, 0, p.h / 1.6, 0, 6.28); ctx.fill(); }
      else { ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
      ctx.restore();
    }
    if (partikel.length) requestAnimationFrame(gambar);
    else { jalan = false; ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
  }

  /* ---------- balon ---------- */
  var kotakBalon = $("balon");
  var warnaBalon = ["#ee6a9b", "#ff9fc0", "#f8b4cb", "#c42f6c", "#ffd8e5"];

  function balon(jumlah) {
    for (var i = 0; i < jumlah; i++) {
      var b = document.createElement("div");
      var w = Math.round(acak(52, 92));
      var putih = Math.random() < 0.28;
      b.className = "balon" + (putih ? " putih" : "");
      b.style.left = acak(2, 92).toFixed(1) + "%";
      b.style.setProperty("--w", w + "px");
      b.style.setProperty("--c", putih ? "#ffffff" : warnaBalon[Math.floor(Math.random() * warnaBalon.length)]);
      b.style.setProperty("--d", acak(7, 11).toFixed(1) + "s");
      b.style.setProperty("--t", acak(0, 1.4).toFixed(2) + "s");
      b.style.setProperty("--s", Math.round(acak(-40, 40)) + "px");
      b.addEventListener("animationend", function (e) {
        if (e.target.parentNode) e.target.parentNode.removeChild(e.target);
      });
      kotakBalon.appendChild(b);
    }
  }

  function rayakan() {
    var w = window.innerWidth, h = window.innerHeight;
    semburan(w * 0.2, h * 0.7, 70, 15);
    semburan(w * 0.5, h * 0.75, 90, 17);
    semburan(w * 0.8, h * 0.7, 70, 15);
    balon(reduce ? 0 : (w < 500 ? 10 : 16));
  }

  $("rayakan").addEventListener("click", function (e) { e.stopPropagation(); rayakan(); });

  // sentuh di mana saja di halaman ucapan memunculkan konfeti kecil, setelah kotak dibuka
  document.addEventListener("click", function (e) {
    if (!kadoDibuka || !$("halaman-ucapan").classList.contains("aktif")) return;
    if (e.target.closest && e.target.closest("button, a, input, textarea")) return;
    semburan(e.clientX, e.clientY, 26, 9);
    if (Math.random() < 0.4 && !reduce) balon(2);
  });
})();
