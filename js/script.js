document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[data-mask]');

    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const maskType = e.target.getAttribute('data-mask');
            e.target.value = applyMask(e.target.value, maskType);
        });

        // Aplica a máscara inicial se já houver valor
        const maskType = input.getAttribute('data-mask');
        input.value = applyMask(input.value, maskType);
    });

    /**
     * Aplica a máscara correta ao valor do input.
     * @param {string} value - O valor atual do input.
     * @param {string} maskType - O tipo de máscara (cpf, telefone, cep).
     * @returns {string} O valor mascarado.
     */
    function applyMask(value, maskType) {
        // Remove todos os caracteres não numéricos
        let cleanedValue = value.replace(/\D/g, '');
        let maskedValue = '';

        switch (maskType) {
            case 'cpf':
                // 000.000.000-00 (11 dígitos)
                if (cleanedValue.length > 11) {
                    cleanedValue = cleanedValue.substring(0, 11);
                }
                maskedValue = cleanedValue.replace(/(\d{3})(\d)/, '$1.$2')
                                         .replace(/(\d{3})(\d)/, '$1.$2')
                                         .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                break;

            case 'telefone':
                // (00) 0000-0000 ou (00) 00000-0000 (10 ou 11 dígitos)
                if (cleanedValue.length > 11) {
                    cleanedValue = cleanedValue.substring(0, 11);
                }
                if (cleanedValue.length <= 10) {
                    // Telefone fixo ou celular antigo: (00) 0000-0000
                    maskedValue = cleanedValue.replace(/^(\d{2})(\d)/g, '($1) $2')
                                             .replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    // Celular: (00) 90000-0000
                    maskedValue = cleanedValue.replace(/^(\d{2})(\d)/g, '($1) $2')
                                             .replace(/(\d{5})(\d)/, '$1-$2');
                }
                break;

            case 'cep':
                // 00000-000 (8 dígitos)
                if (cleanedValue.length > 8) {
                    cleanedValue = cleanedValue.substring(0, 8);
                }
                maskedValue = cleanedValue.replace(/(\d{5})(\d)/, '$1-$2');
                break;
        }

        return maskedValue;
    }
});
