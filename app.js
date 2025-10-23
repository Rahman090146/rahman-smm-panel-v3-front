// Rahman SMM Panel v3 - Frontend
// Versi sudah konek ke API: https://rahman-smm-panel-v3-auto-tr8y.vercel.app

const API_URL = "https://rahman-smm-panel-v3-auto-tr8y.vercel.app";

async function loadUser() {
  const res = await fetch(`${API_URL}/api/user`);
  const user = await res.json();
  document.getElementById("username").innerText = user.username;
  document.getElementById("balance").innerText = `Rp${user.balance.toLocaleString()}`;
}

async function loadServices() {
  const res = await fetch(`${API_URL}/api/services`);
  const services = await res.json();
  const select = document.getElementById("service");
  select.innerHTML = services.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
}

async function makeOrder() {
  const serviceId = document.getElementById("service").value;
  const qty = document.getElementById("qty").value;
  const target = document.getElementById("target").value;

  const res = await fetch(`${API_URL}/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serviceId, qty, target })
  });

  const data = await res.json();
  alert(data.error ? data.error : `Pesanan berhasil! ID: ${data.order.id}`);
  loadUser();
}

document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  loadServices();
});

