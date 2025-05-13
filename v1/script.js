// script.js

// Constantes e Variáveis Globais
const PRECO_PIZZA_BRL = 70.00; // Preço da pizza em Reais
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl';
const precoPizzaElemento = document.getElementById('preco-pizza-btc'); // Elemento HTML onde o preço será exibido

/**
 * Função para buscar o preço atual do Bitcoin e calcular o valor da pizza.
 * Atualiza o elemento HTML com o resultado.
 */
async function atualizarPrecoPizza() {
    if (!precoPizzaElemento) {
        console.error("Elemento 'preco-pizza-btc' não encontrado no HTML.");
        return;
    }

    precoPizzaElemento.textContent = 'Atualizando...'; // Feedback visual durante a carga

    try {
        // 1. Buscar o preço do Bitcoin na API
        const resposta = await fetch(API_URL);

        // 2. Verificar se a requisição foi bem-sucedida
        if (!resposta.ok) {
            // Se a API retornar um erro (ex: 404, 500), lança uma exceção
            throw new Error(`Erro ao buscar dados da API: ${resposta.status} ${resposta.statusText}`);
        }

        // 3. Converter a resposta para JSON
        const dados = await resposta.json();

        // 4. Extrair o preço do Bitcoin em BRL
        // A estrutura da resposta da CoinGecko é: { "bitcoin": { "brl": VALOR } }
        const precoBtcEmBrl = dados.bitcoin.brl;

        if (typeof precoBtcEmBrl !== 'number') {
            throw new Error("Formato de preço inesperado recebido da API.");
        }

        // 5. Calcular o preço da pizza em Bitcoin
        const precoPizzaEmBtc = PRECO_PIZZA_BRL / precoBtcEmBrl;

        // 6. Formatar e exibir o preço
        // Exibe com 8 casas decimais, típico para Bitcoin
        precoPizzaElemento.textContent = `BTC ${precoPizzaEmBtc.toFixed(8)}`;

    } catch (erro) {
        // 7. Lidar com erros (problemas de rede, erros da API, etc.)
        console.error("Falha ao atualizar o preço da pizza:", erro);
        precoPizzaElemento.textContent = 'Erro ao carregar :(';
        // Você pode adicionar uma mensagem de erro mais amigável para o usuário aqui
    }
}

// Função principal para iniciar o processo
function iniciarAtualizacoes() {
    // 1. Chamar a função de atualização imediatamente ao carregar a página
    atualizarPrecoPizza();

    // 2. Configurar a atualização para ocorrer a cada 30 segundos (30000 milissegundos)
    setInterval(atualizarPrecoPizza, 30000);
}

// Iniciar o processo quando o script for carregado
iniciarAtualizacoes();