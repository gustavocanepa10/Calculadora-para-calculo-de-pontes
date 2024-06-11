// Função para calcular e salvar no histórico
function calcular() {
    var nomeBarra = document.getElementById("nomeBarra").value;
    var esforco = parseFloat(document.getElementById("esforco").value);
    var tipo = document.getElementById("tipo").value;
    var comprimento = parseFloat(document.getElementById("comprimento").value);
    var resultadoElement = document.getElementById("resultado");

    var valorRevisado;
    var numeroFios;

    if (tipo === 'C') {
        valorRevisado = Math.sqrt((esforco * Math.pow(comprimento, 2)) / 27906 * Math.pow(1, 4));
        numeroFios = valorRevisado;
    } else if (tipo === 'T') {
        numeroFios = esforco / 42.67;
        valorRevisado = numeroFios;
    } else {
        valorRevisado = 0;
        numeroFios = 0;
    }

    // Fixando o valor revisado para exibir 4 casas decimais
    valorRevisado = valorRevisado.toFixed(4);

    resultadoElement.innerHTML = "Nome da Barra: " + nomeBarra + ", Número de Fios: " + numeroFios + ", Valor Revisado: " + valorRevisado;

    // Salvar resposta no histórico
    var historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push({ nomeBarra: nomeBarra, numeroFios: numeroFios, valorRevisado: valorRevisado });
    localStorage.setItem("historico", JSON.stringify(historico));
}

// Carregar histórico quando a página de histórico é carregada
document.addEventListener("DOMContentLoaded", function () {
    var historico = JSON.parse(localStorage.getItem("historico")) || [];

    var historicoList = document.getElementById("historico");
    if (historicoList) {
        historicoList.innerHTML = "";
        historico.forEach(function (item) {
            var listItem = document.createElement("li");
            listItem.textContent = "Nome da Barra: " + item.nomeBarra + ", Número de Fios: " + item.numeroFios + ", Valor Revisado: " + item.valorRevisado;
            historicoList.appendChild(listItem);
        });
    }
});

function limparHistorico() {
    // Limpa o histórico do localStorage
    localStorage.removeItem("historico");

    // Limpa a lista na página
    var historicoList = document.getElementById("historico");
    historicoList.innerHTML = "";
}
