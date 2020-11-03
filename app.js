var moneda = document.querySelector(".moneda");
var token = document.querySelector(".token");
var ganador = document.querySelector(".ganador");
var guía = document.querySelector(".guía");
var info = document.querySelector(".info-plus");
var elementosParaAnimar = [
  moneda,
  moneda.parentNode,
  guía,
  info,
  token.parentNode,
];
var tarjeta = document.querySelector(".info");
var estáGirando = false;
var ladoActual = "heads";
var ladoPróximo;
var animación;

function controladorOnLoad() {
  if (document.visibilityState === "visible") animarElementos();
  document.addEventListener("visibilitychange", controladorVisibilityChange);
  window.removeEventListener("load", controladorOnLoad);
}

function controladorVisibilityChange() {
  if (document.visibilityState === "visible") animarElementos();
  document.removeEventListener("visibilitychange", controladorVisibilityChange);
}

function animarElementos() {
  elementosParaAnimar.forEach(function (elemento) {
    elemento.classList.add("inicio");
  });

  moneda.addEventListener("animationend", function () {
    this.classList.remove("inicio");
  });
}

function lanzarMoneda() {
  if (estáGirando) return false;
  estáGirando = true;

  ganador.classList.remove("resultado");

  ladoPróximo = Math.round(Math.random()) ? "heads" : "tails";
  animación = ladoActual + "-" + ladoPróximo;

  moneda.style.setProperty("animation-name", animación);
  moneda.classList = `moneda ${animación}`;

  moneda.addEventListener("animationend", function () {
    moneda.style.removeProperty("animation-name");
    estáGirando = false;

    ganador.textContent = ladoPróximo;
    ganador.classList.add("resultado");

    ladoActual = ladoPróximo;
  });
}

function mostrarTarjeta() {
  tarjeta.classList.add("mostrar-info");
}

function ocultarTarjeta() {
  tarjeta.classList.remove("mostrar-info");
}

function controladorClicEnTarjeta(evento) {
  if (evento.target !== tarjeta) return false;
  ocultarTarjeta();
}

function controladorKeyUp(evento) {
  if (!tarjeta.classList.contains("mostrar-info")) return false;
  if (evento.key !== "Escape") return false;
  ocultarTarjeta();
}

window.addEventListener("load", controladorOnLoad);
moneda.addEventListener("click", lanzarMoneda);

info.addEventListener("click", mostrarTarjeta);
tarjeta.addEventListener("click", controladorClicEnTarjeta);
window.addEventListener("keyup", controladorKeyUp);

token.addEventListener("click", function () {
  token.classList.add("giro");

  token.addEventListener("animationend", function () {
    token.classList.remove("giro");
  });
});
