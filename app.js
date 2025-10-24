// Rahman SMM Panel v3 - Frontend
// ✅ Sudah konek ke API: https://to-tr8y.vercel.app

const API_URL = "https://to-tr8y.vercel.app";

async function loadUser() {
  try {
    const res = await fetch(`${API_URL}/api/user`);
    const user = await res.json();
    document.getElementById("username").innerText = user.username;
    document.getElementById("balance").innerText = `Rp${user.balance.toLocaleString()}`;
  } catch (err) {
    console.error("Gagal ambil data user:", err);
  }
}

async function loadServices() {
  try {
    const res = await fetch(`${API_URL}/api/services`);
    const services = await res.json();
    const select = document.getElementById("service");
    select.innerHTML = services.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
  } catch (err) {
    console.error("Gagal ambil layanan:", err);
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
    alert(data.error ? data.error : `Pesanan berhasil! ID: ${data.order.id}`);
    loadUser();
  } catch (err) {
    alert("Gagal konek ke API!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  loadServices();
});

