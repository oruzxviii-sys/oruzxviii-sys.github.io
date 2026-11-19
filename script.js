const btnTema = document.getElementById("tema");

function aplicarIcono() {
  const oscuro = document.body.classList.contains("oscuro");
  btnTema.textContent = oscuro ? "☀️" : "🌙";
}

try {
  if (localStorage.getItem("tema") === "oscuro") document.body.classList.add("oscuro");
} catch (e) {}
aplicarIcono();

btnTema.addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  aplicarIcono();
  try {
    localStorage.setItem("tema", document.body.classList.contains("oscuro") ? "oscuro" : "claro");
  } catch (e) {}
});
const navbar = document.getElementById("navbar");
window.onscroll = function () {
  if (window.scrollY > 40) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
};
const menu = document.getElementById("menu");
const hamburguesa = document.getElementById("hamburguesa");

hamburguesa.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  hamburguesa.setAttribute("aria-expanded", abierto);
  hamburguesa.textContent = abierto ? "✕" : "☰";
});
menu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    menu.classList.remove("abierto");
    hamburguesa.setAttribute("aria-expanded", "false");
    hamburguesa.textContent = "☰";
  });
});
const form = document.getElementById("formulario");
const campos = {
  nombre: document.getElementById("nombre"),
  email: document.getElementById("email"),
  mensaje: document.getElementById("mensaje"),
};
const estado = document.getElementById("estado");

function mostrarError(campo, texto) {
  document.getElementById("error-" + campo).textContent = texto;
  campos[campo].classList.toggle("invalido", texto !== "");
  return texto === "";
}

function validar() {
  let ok = true;
  const nombre = campos.nombre.value.trim();
  const email = campos.email.value.trim();
  const mensaje = campos.mensaje.value.trim();

  ok = mostrarError("nombre", nombre.length < 2 ? "Escribí tu nombre." : "") && ok;
  ok = mostrarError("email", !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "Ingresá un email válido (ej: nombre@correo.com)." : "") && ok;
  ok = mostrarError("mensaje", mensaje.length < 10 ? "El mensaje debe tener al menos 10 caracteres." : "") && ok;
  return ok;
}
Object.keys(campos).forEach((k) => campos[k].addEventListener("input", () => {
  if (campos[k].classList.contains("invalido")) validar();
}));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  estado.className = "estado";
  estado.textContent = "";
  if (!validar()) return;

  estado.textContent = "Enviando…";
  try {
    const respuesta = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (respuesta.ok) {
      estado.className = "estado ok";
      estado.textContent = "¡Mensaje enviado! Gracias por escribirme.";
      form.reset();
    } else {
      throw new Error("Formspree respondió con error");
    }
  } catch (err) {
    estado.className = "estado mal";
    estado.textContent = "No se pudo enviar. Revisá tu conexión e intentá de nuevo.";
  }
});

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observador.observe(el));
const anio = document.getElementById("anio");
if (anio) anio.textContent = new Date().getFullYear();
