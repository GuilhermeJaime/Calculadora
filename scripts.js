const display = document.getElementById("display");
let operador = "";
let primeiroValor = "0";  // começa com 0
let segundoValor = "";

// Função para atualizar o display
function atualizarDisplay(valor) {
  display.value = valor;
}

// Mostrar 0 logo no início
atualizarDisplay(primeiroValor);

document.querySelectorAll("button").forEach(botao => {
  botao.addEventListener("click", () => {
    const valor = botao.textContent;

    if (!isNaN(valor) || valor === ".") {
      // Se for número ou ponto
      if (operador === "") {
        // Se ainda estiver 0, substitui pelo número clicado
        if (primeiroValor === "0" && valor !== ".") {
          primeiroValor = valor;
        } else {
          primeiroValor += valor;
        }
        atualizarDisplay(primeiroValor);
      } else {
        segundoValor += valor;
        atualizarDisplay(segundoValor);
      }
    }
    else if (valor === "C") {
      primeiroValor = "0";
      segundoValor = "";
      operador = "";
      atualizarDisplay(primeiroValor);
    }
    else if (["+", "-", "*", "/"].includes(valor)) {
      operador = valor;
    }
    else if (valor === "=") {
      let resultado = 0;
      const n1 = parseFloat(primeiroValor);
      const n2 = parseFloat(segundoValor);

      switch (operador) {
        case "+": resultado = n1 + n2; break;
        case "-": resultado = n1 - n2; break;
        case "*": resultado = n1 * n2; break;
        case "/": resultado = n2 !== 0 ? n1 / n2 : "Erro"; break;
        default: resultado = n1; // caso não tenha operador
      }

      atualizarDisplay(resultado);
      // reinicia para permitir cálculos encadeados
      primeiroValor = resultado.toString();
      segundoValor = "";
      operador = "";
    }
  });
});
