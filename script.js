// ======== DADOS DOS VEÍCULOS ========
const vehicles = [
  {
    id: 1,
    title: "Chevrolet Onix 2020",
    price: "R$ 129/dia",
    available: true,
    img: "img/onix.jpeg",
    city: "São Paulo, SP",
    desc: "Compacto moderno, com conectividade, baixo consumo e direção elétrica. Ideal para o dia a dia urbano com conforto e eficiência."
  },
  {
    id: 2,
    title: "Volkswagen Gol 2019",
    price: "R$ 109/dia",
    available: true,
    img: "img/gol.jpeg",
    city: "Campinas, SP",
    desc: "Clássico confiável com motor potente e manutenção acessível. Perfeito para quem busca praticidade e desempenho equilibrado."
  },
  {
    id: 3,
    title: "Fiat Uno 2018",
    price: "R$ 89/dia",
    available: true,
    img: "img/uno.jpeg",
    city: "Marília, SP",
    desc: "Econômico, compacto e fácil de estacionar. O Uno é sinônimo de agilidade e custo-benefício, ideal para locações urbanas."
  }
];



// ======== RENDERIZA OS VEÍCULOS ========
const grid = document.getElementById("vehiclesGrid");

function renderVehicles(list){
  grid.innerHTML = list.map(v => `
    <article class="card reveal">
      <img src="${v.img}">
      <h4>${v.title}</h4>
      <div><i class="ri-map-pin-line"></i> ${v.city}</div>
      <strong><i class="ri-money-dollar-circle-line"></i> ${v.price}</strong>
      <p>${v.desc}</p>
      <span class="badge ${v.available? 'available':'unavailable'}">
        ${v.available? "Disponível":"Indisponível"}
      </span>
      ${v.available ? `<button class="btn-primary reservar" data-id="${v.id}"><i class="ri-steering-line"></i> Reservar</button>` : ""}
    </article>
  `).join("");

  // adiciona eventos de reserva
  document.querySelectorAll(".reservar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      const car = vehicles.find(v => v.id === id);
      openBookingModal(car);
    });
  });
}

renderVehicles(vehicles);

// ======== MODAL DE RESERVA ========
function openBookingModal(car){
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" id="closeModal">✕</button>
      <h3>Reservar ${car.title}</h3>
      <p>${car.city}</p>
      <p>${car.desc}</p>
      <p><strong>Preço:</strong> ${car.price}</p>
      <form id="formReserva">
        <label>Data inicial: <input type="date" id="dataInicio" required></label>
        <label>Data final: <input type="date" id="dataFim" required></label>
        <p>Total: <span id="valorTotal">R$ 0,00</span></p>
        <button type="submit" class="btn-primary">Confirmar</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector("#closeModal");
  closeBtn.onclick = () => modal.remove();

  const form = modal.querySelector("#formReserva");
  const inicio = modal.querySelector("#dataInicio");
  const fim = modal.querySelector("#dataFim");
  const total = modal.querySelector("#valorTotal");

  function atualizarTotal(){
    const preco = parseFloat(car.price.replace(/\D/g, ""));
    const valor = calcularTotal(preco, inicio.value, fim.value);
    total.textContent = valor > 0 ? `R$ ${valor.toLocaleString("pt-BR")}` : "R$ 0,00";
  }

  inicio.addEventListener("change", atualizarTotal);
  fim.addEventListener("change", atualizarTotal);

  form.onsubmit = (e) => {
    e.preventDefault();
    const valorFinal = total.textContent;
    alert(`Reserva confirmada para ${car.title}!\nTotal: ${valorFinal}`);
    modal.remove();
  };
}

// ======== CÁLCULO AUTOMÁTICO DE TOTAL ========
function calcularTotal(precoDiaria, dataInicio, dataFim){
  const start = new Date(dataInicio);
  const end = new Date(dataFim);
  const diff = (end - start) / (1000 * 60 * 60 * 24);
  return diff > 0 ? diff * precoDiaria : 0;
}

// ======== CARROSSEL ========
const gridEl = document.getElementById("vehiclesGrid");
document.getElementById("next").onclick = () => gridEl.scrollBy({ left: 320, behavior: "smooth" });
document.getElementById("prev").onclick = () => gridEl.scrollBy({ left: -320, behavior: "smooth" });

// ======== MENU MOBILE ========
document.getElementById("menuToggle").onclick = () => {
  document.getElementById("navMenu").classList.toggle("show");
};

// ======== ANIMAÇÃO DE SCROLL ========
const reveals = document.querySelectorAll(".reveal");

function reveal() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 60){
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    }
  });
}
window.addEventListener("scroll", reveal);
reveal();





