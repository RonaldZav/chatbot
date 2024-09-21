let default_options = require('../options.json');

class ChatGeneration {
    constructor() {
        this.name = "Roni Bot";
        this.accuracy = 40;
        this.options = default_options;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setAccuracy(accuracy) {
        this.accuracy = accuracy;
        return this;
    }

    setOptions(options) {
        this.options = options || default_options;
        return this;
    }

    send(message) {
        const similarity = (str1, str2) => {
            let longer = str1.length > str2.length ? str1 : str2;
            let shorter = str1.length > str2.length ? str2 : str1;
            let longerLength = longer.length;

            if (longerLength === 0) {
                return 1.0;
            }
            return (longerLength - editDistance(longer, shorter)) / longerLength;
        };

        const editDistance = (str1, str2) => {
            let costs = [];
            for (let i = 0; i <= str1.length; i++) {
                let lastValue = i;
                for (let j = 0; j <= str2.length; j++) {
                    if (i === 0)
                        costs[j] = j;
                    else {
                        if (j > 0) {
                            let newValue = costs[j - 1];
                            if (str1.charAt(i - 1) !== str2.charAt(j - 1))
                                newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                            costs[j - 1] = lastValue;
                            lastValue = newValue;
                        }
                    }
                }
                if (i > 0)
                    costs[str2.length] = lastValue;
            }
            return costs[str2.length];
        };

        const findClosestResponse = (inputText, options, accuracy = 40) => {
            const threshold = accuracy / 100;
            let bestMatch = null;
            let highestSimilarity = 0;
            const inputUpperCase = inputText.toUpperCase();

            options.forEach(option => {
                option.input.forEach(optionInput => {
                    const sim = similarity(inputUpperCase, optionInput.toUpperCase());
                    if (sim > highestSimilarity) {
                        highestSimilarity = sim;
                        bestMatch = option;
                    }
                });
            });

            if (highestSimilarity < threshold) {
                return { response: "Lo siento, no sabría cómo responderte.", similarity: highestSimilarity };
            }

            const randomResponse = bestMatch.output[Math.floor(Math.random() * bestMatch.output.length)];
            return { response: randomResponse, similarity: highestSimilarity };
        };

        const evaluateMathExpression = (input) => {
            const replacements = {
                'MAS': '+',
                'MENOS': '-',
                'POR': '*',
                'DIVIDIDO': '/',
                'ELEVADO A': '**',
                'AL CUADRADO': '**2',
                'AL CUBO': '**3'
            };

            let expression = input.toUpperCase();

            Object.keys(replacements).forEach(word => {
                const regex = new RegExp('\\b' + word + '\\b', 'g');
                expression = expression.replace(regex, replacements[word]);
            });

            const cleanExpression = expression.replace(/[^-()\d/*+.**]/g, '');

            try {
                if (cleanExpression) {
                    const result = eval(cleanExpression);
                    return `El resultado de ${cleanExpression} es ${result}`;
                } else {
                    return "No entendí la expresión matemática. ¿Podrías decirme el cálculo de nuevo?";
                }
            } catch (error) {
                return "Hubo un error al calcular. Asegúrate de que la expresión matemática sea válida.";
            }
        };

        const getResponse = (userInput, options) => {
            const input = userInput.toUpperCase();

            if (input.includes("CALCULA") || input.includes("RESUELVE") || input.includes("PROBLEMA")) {
                return evaluateMathExpression(input);
            }

            const result = findClosestResponse(userInput, options, this.accuracy);
            return result.response;
        };

        return getResponse.call(this, message, this.options)
            .replace(/<time>/g, new Date().toLocaleTimeString())
            .replace(/<name>/g, this.name)
            .replace(/<date>/g, new Date().toLocaleDateString());
    }
}

module.exports = ChatGeneration;