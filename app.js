// Rahman SMM Panel v3 - Frontend (FIXED)
// ✅ Sudah konek ke API: https://rahman-smm-panel-v3-auto.vercel.app

const API_URL = "https://rahman-smm-panel-v3-auto.vercel.app";

async function loadUser() {
  try {
    const res = await fetch(`${API_URL}/api/user`);
    if (!res.ok) throw new Error("Gagal ambil data user");
    const user = await res.json();
    document.getElementById("username").innerText = user.username;
    document.getElementById("balance").innerText = `Rp${user.balance.toLocaleString()}`;
  } catch (err) {
    alert("Gagal konek ke API User. Coba refresh halaman.");
    console.error(err);
  }
}

async function loadServices() {
  try {
    const res = await fetch(`${API_URL}/api/services`);
    if (!res.ok) throw new Error("Gagal ambil layanan");
    const services = await res.json();
    const select = document.getElementById("service");
    select.innerHTML = services
      .map(s => `<option value="${s.id}" data-rate="${s.rate}" data-min="${s.min}" data-max="${s.max}">
        ${s.name} — Rp${s.rate.toLocaleString()} / ${s.unit}
      </option>`)
      .join("");
  } catch (err) {
    alert("Gagal konek ke API Layanan. Pastikan API aktif.");
    console.error(err);
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
    if (data.error) {
      alert("Gagal: " + data.error);
    } else {
      alert(`Pesanan berhasil! ID: ${data.order.id}`);
      loadUser();
    }
  } catch (err) {
    alert("Gagal membuat pesanan.");
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  loadServices();
});
