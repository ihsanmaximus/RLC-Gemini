/**

RIFDAIRA LEARNING CENTER (RLC)

Prototype Interaction & Business Logic Simulation
*/


document.addEventListener('DOMContentLoaded', () => {
setupNavigation();
setupModalInteractions();
});

/* 1. Navigasi & Drawer Mobile */
function setupNavigation() {
const toggle = document.getElementById('mobileMenuBtn');
const drawer = document.getElementById('mobileDrawer');
if (toggle && drawer) {
toggle.addEventListener('click', () => {
drawer.classList.toggle('active');
});
drawer.querySelectorAll('a').forEach(a => {
a.addEventListener('click', () => drawer.classList.remove('active'));
});
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
a.addEventListener('click', function(e) {
const id = this.getAttribute('href');
if (id && id !== '#') {
const target = document.querySelector(id);
if (target) {
e.preventDefault();
target.scrollIntoView({ behavior: 'smooth' });
}
}
});
});
}

/* 2. Modal Controller */
function openCustomModal(modalId) {
const m = document.getElementById(modalId);
if (m) {
m.classList.add('show');
m.setAttribute('aria-hidden', 'false');
document.body.style.overflow = 'hidden';
}
}

function closeActiveModal(modalId) {
const m = document.getElementById(modalId);
if (m) {
m.classList.remove('show');
m.setAttribute('aria-hidden', 'true');
document.body.style.overflow = '';
}
}

window.addEventListener('click', (e) => {
if (e.target.classList.contains('modal-backdrop')) {
e.target.classList.remove('show');
e.target.setAttribute('aria-hidden', 'true');
document.body.style.overflow = '';
}
});

function setupModalInteractions() {
const launchCollab = () => {
openCustomModal('modalInstitutionForm');
const t = document.getElementById('instModalTitle');
if (t) t.innerText = 'Ajukan Kolaborasi Pendidikan Medis';
};

const btnCollab = document.getElementById('btnAjukanKolaborasi');
if (btnCollab) btnCollab.addEventListener('click', launchCollab);
const btnMobCollab = document.getElementById('btnMobileKolaborasi');
if (btnMobCollab) btnMobCollab.addEventListener('click', launchCollab);

const btnInst = document.getElementById('btnDiskusikanInstitusi');
if (btnInst) btnInst.addEventListener('click', () => {
openCustomModal('modalInstitutionForm');
const t = document.getElementById('instModalTitle');
if (t) t.innerText = 'Formulir Pelatihan Institusi (In-House)';
});

const btnEv = document.getElementById('btnOpenEventsModal');
if (btnEv) btnEv.addEventListener('click', () => openCustomModal('modalEventsList'));

const aboutAction = (e) => { e.preventDefault(); openCustomModal('modalAboutCenter'); };
const a1 = document.getElementById('navAboutLink');
const a2 = document.getElementById('mobileAboutLink');
const a3 = document.getElementById('footerAboutLink');
if (a1) a1.addEventListener('click', aboutAction);
if (a2) a2.addEventListener('click', aboutAction);
if (a3) a3.addEventListener('click', aboutAction);
}

/* 3. Program Detail Catalog */
const programs = {
'keselamatan-pasien': {
title: 'Manajemen Keselamatan Pasien',
cat: 'PELATIHAN KLINIS',
duration: '16 Jam Pelajaran (2 Hari)',
method: 'Online / Hybrid Interaktif',
target: 'Dokter, Perawat, Penanggung Jawab Mutu & Komite Mutu Fasyankes',
desc: 'Program intensif penanganan insiden klinis, Root Cause Analysis (RCA), dan mitigasi adverse events di rumah sakit dan puskesmas terstandar akreditasi.',
goals: [
'Memahami 6 Sasaran Keselamatan Pasien (SKP) Kementerian Kesehatan.',
'Melakukan investigasi insiden klinis dengan metodologi RCA komprehensif.',
'Menyusun SOP pelaporan keselamatan pasien terpadu.'
]
},
'mutu-klinik': {
title: 'Peningkatan Mutu Layanan Klinik',
cat: 'MANAJEMEN LAYANAN',
duration: '14 Jam Pelajaran (2 Hari)',
method: 'Online / Hybrid Interaktif',
target: 'Pimpinan Klinik, Dokter Penanggung Jawab, Kepala Mutu Puskesmas',
desc: 'Pelatihan strategis tata kelola continuous quality improvement, pemenuhan Indikator Nasional Mutu (INM), dan kepatuhan akreditasi klinik mandiri.',
goals: [
'Menetapkan dan mengukur indikator mutu prioritas klinik.',
'Meningkatkan survei kepuasan pasien dan resolusi komplain cepat.',
'Kesiapan penuh menghadapi survei akreditasi klinik.'
]
},
'rekam-medis': {
title: 'Manajemen Rekam Medis & Informasi Kesehatan',
cat: 'MANAJEMEN KESEHATAN',
duration: '20 Jam Pelajaran (3 Hari)',
method: 'Online / Hybrid Interaktif',
target: 'Perekam Medis (PMIK), Petugas Koding Klaim, Staf IT Kesehatan',
desc: 'Standarisasi Rekam Medis Elektronik (RME), ketepatan koding diagnosa ICD-10/ICD-9 CM, perlindungan data privasi medis, dan integrasi SatuSehat Kemenkes.',
goals: [
'Implementasi penginputan dan audit rekam medis elektronik.',
'Akurasi koding klinis klaim BPJS Kesehatan & asuransi swasta.',
'Kepatuhan terhadap undang-undang perlindungan data medis pasien.'
]
}
};

function openProgramDetail(key) {
const data = programs[key];
if (!data) return;

document.getElementById('programModalTitle').innerText = data.title;
document.getElementById('programModalContent').innerHTML =   <span class="program-category">${data.cat}</span>   <p style="margin: 12px 0; color: #475569; font-size: 0.94rem;">${data.desc}</p>   <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 0.84rem;">   <p style="margin-bottom: 4px;"><strong>Metode:</strong> ${data.method}</p>   <p style="margin-bottom: 4px;"><strong>Durasi:</strong> ${data.duration}</p>   <p><strong>Sasaran:</strong> ${data.target}</p>   </div>   <h4 style="font-size: 0.9rem; color: #0a2540; margin-bottom: 6px;">Tujuan Pembelajaran:</h4>   <ul style="list-style: disc; padding-left: 20px; font-size: 0.84rem; color: #334155;">   ${data.goals.map(g =><li style="margin-bottom: 4px;">${g}</li>).join('')}   </ul>   ;

document.getElementById('btnProgramRegisterAction').onclick = () => {
closeActiveModal('modalProgramDetail');
openSimulationReg(data.title);
};

openCustomModal('modalProgramDetail');
}

/* 4. Simulasi Verifikasi Sertifikat */
const certStore = {
'RLC-DEMO-2026-001': {
name: 'dr. Hendra Pratama, Sp.A',
prog: 'Manajemen Keselamatan Pasien',
date: '15 Januari 2026',
inst: 'RS Siloam Hospitals Semanggi',
skp: '3 SKP IDI Terakreditasi'
},
'RLC-DEMO-2026-002': {
name: 'Ns. Sarah Amalia, S.Kep',
prog: 'Peningkatan Mutu Layanan Klinik',
date: '20 Februari 2026',
inst: 'Puskesmas Kebayoran Baru',
skp: '2 SKP PPNI Terakreditasi'
}
};

function verifyCertificate() {
const inp = document.getElementById('certNumberInput');
const box = document.getElementById('verifyResultDisplay');
const val = (inp.value || '').trim().toUpperCase();

if (!val) {
showToast('Ketikkan nomor sertifikat terlebih dahulu.');
inp.focus();
return;
}

box.style.display = 'block';

if (certStore[val]) {
const c = certStore[val];
box.className = 'verify-result-container valid';
box.innerHTML =   <p style="font-weight: 700; color: #34d399; margin-bottom: 6px;">✓ SERTIFIKAT TERVERIFIKASI RESMI</p>   <p><strong>No:</strong> ${val}</p>   <p><strong>Peserta:</strong> ${c.name}</p>   <p><strong>Program:</strong> ${c.prog}</p>   <p><strong>Instansi:</strong> ${c.inst}</p>   <p><strong>Tanggal Terbit:</strong> ${c.date}</p>   <p><strong>Akreditasi:</strong> ${c.skp}</p>   <small style="display:block; margin-top: 8px; color: #fbbf24; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 4px;">   ⚠️ DEMO: Simulasi UI/UX prototipe. Belum terhubung ke database Kemenkes.   </small>  ;
showToast('Data sertifikat ditemukan dalam basis data demonstrasi.');
} else {
box.className = 'verify-result-container invalid';
box.innerHTML =   <p style="font-weight: 700; color: #f87171; margin-bottom: 6px;">✕ DATA TIDAK DITEMUKAN</p>   <p>Nomor <strong>"${val}"</strong> tidak terdaftar dalam data demo.</p>   <p>Coba gunakan: <code>RLC-DEMO-2026-001</code> atau <code>RLC-DEMO-2026-002</code>.</p>  ;
showToast('Data sertifikat tidak ditemukan pada database demo.');
}
}

/* 5. Simulasi Form Submission */
function openSimulationReg(title) {
closeActiveModal('modalEventsList');
document.getElementById('regModalHeading').innerText = Pendaftaran: ${title};
openCustomModal('modalRegistration');
}

function submitIndividualReg() {
const name = document.getElementById('userFullname').value;
closeActiveModal('modalRegistration');
document.getElementById('userFullname').value = '';
showToast(Terima kasih, ${name}. Simulasi pendaftaran berhasil dicatat.);
}

function submitInstitutionForm() {
const inst = document.getElementById('instFasyankes').value;
closeActiveModal('modalInstitutionForm');
document.getElementById('instFasyankes').value = '';
showToast(Simulasi kebutuhan pelatihan untuk ${inst} berhasil dikirim.);
}

/* 6. Toast Utility */
function showToast(msg) {
const box = document.getElementById('toastBox');
if (!box) return;

const t = document.createElement('div');
t.className = 'toast-message';
t.innerText = msg;
box.appendChild(t);

setTimeout(() => {
t.style.opacity = '0';
t.style.transition = 'opacity 0.3s ease';
setTimeout(() => t.remove(), 300);
}, 3500);
}
