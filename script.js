document.getElementById('upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const errorMessageElement = document.getElementById('error-message');

    // Limpar qualquer erro anterior
    errorMessageElement.textContent = '';

    // Escolher um dos dois filtros aleatoriamente
    const filters = ['filtro.jpg', 'filtro2.jpg', 'filtro3.jpg'];
    const chosenFilter = filters[Math.floor(Math.random() * filters.length)];

    // Definir o tamanho da imagem de filtro
    const overlay = new Image();
    overlay.src = chosenFilter; // Caminho do filtro aleatório escolhido
    overlay.onload = function () {
        const overlayWidth = overlay.width;
        const overlayHeight = overlay.height;

        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                // Definir o tamanho do canvas com base na imagem do filtro
                canvas.width = overlayWidth;
                canvas.height = overlayHeight;

                // Limpar o canvas antes de desenhar
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Desenhar o filtro primeiro (o filtro ficará no fundo)
                ctx.drawImage(overlay, 0, 0, overlayWidth, overlayHeight);

                // Calcular a escala correta para cobrir o canvas mantendo a proporção
                const scale = Math.max(overlayWidth / img.width, overlayHeight / img.height);
                const newWidth = img.width * scale;
                const newHeight = img.height * scale;

                // Centralizar a imagem redimensionada no canvas
                const offsetX = (overlayWidth - newWidth) / 2;
                const offsetY = (overlayHeight - newHeight) / 2;

                // Definir a opacidade da imagem do cliente
                ctx.globalAlpha = 0.6; // Ajuste a opacidade da imagem do cliente

                // Desenhar a imagem do cliente no canvas, proporcional e centrada
                ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

                // Restaurar a opacidade do contexto para o valor padrão (1.0)
                ctx.globalAlpha = 1.0;
            };

            img.onerror = function () {
                // Exibir mensagem de erro se houver falha ao carregar a imagem do cliente
                errorMessageElement.textContent = "Erro ao carregar a imagem do cliente.";
            };

            // Carregar a imagem do cliente
            img.src = e.target.result;
        };

        reader.onerror = function () {
            // Exibir mensagem de erro se houver falha ao ler o arquivo
            errorMessageElement.textContent = "Erro ao ler o arquivo.";
        };

        // Ler o arquivo de imagem carregado
        reader.readAsDataURL(file);
    };

    // Adicionar erro se o filtro não carregar corretamente
    overlay.onerror = function () {
        errorMessageElement.textContent = "Erro ao carregar o filtro.";
    };
});
