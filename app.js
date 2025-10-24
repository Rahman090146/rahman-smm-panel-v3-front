// Rahman SMM Panel v3 - Frontend
// ✅ Terhubung ke API: https://3-auto.vercel.app

const API_URL = "https://3-auto.vercel.app";

async function loadUser() {
  try {
    const res = await fetch(`${API_URL}/api/user`);
    if (!res.ok) throw new Error("Gagal ambil data user");
    const user = await res.json();
    document.getElementById("username").innerText = user.username || "Guest";
    document.getElementById("balance").innerText = `Rp${user.balance?.toLocaleString() || 0}`;
  } catch (err) {
    console.error("Error user:", err);
    alert("Gagal konek ke API User. Coba refresh halaman.");
  }
}

async function loadServices() {
  try {
    const res = await fetch(`${API_URL}/api/services`);
    if (!res.ok) throw new Error("Gagal ambil data layanan");
    const services = await res.json();
    const select = document.getElementById("service");
    select.innerHTML = services.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
  } catch (err) {
    console.error("Error layanan:", err);
    alert("Gagal konek ke API Layanan. Pastikan API aktif.");
  }
}

async function makeOrder() {
  const serviceId = document.getElementById("service").value;
  const qty = document.getElementById("qty").value;
  const target = document.getElementById("target").value;

  try {
    const res = await fetch(`${API_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId, qty, target })
    });

    const data = await res.json();
    if (data.error) alert(`❌ ${data.error}`);
    else alert(`✅ Pesanan berhasil!\nID: ${data.order.id}`);
    loadUser();
  } catch (err) {
    console.error("Error order:", err);
    alert("Gagal membuat pesanan. Coba lagi nanti.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  loadServices();
});
