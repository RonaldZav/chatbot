# 🤖 CHATBOT
Generar respuestas automáticas basadas en un conjunto de opciones de entrada y salida, y también permite realizar cálculos matemáticos simples a partir de texto.

## Instalación
Asegúrate de que tienes Node.js instalado. Luego, puedes instalar este paquete en tu proyecto ejecutando:

```bash
npm install @ronaldzav/chatbot
```
## 🛠️ Uso


```js
const ChatGeneration = require('@ronaldzav/chatbot');

const chat = new ChatGeneration()
    .setName("Roni Bot")
    .setOptions([{
        input: ["Hola", "Qué tal"],
        output: ["Hola, ¿cómo estás?", "¡Qué gusto saludarte!"]
    }, {
        input: ["Adiós", "Hasta luego"],
        output: ["Adiós, que tengas un buen día", "Hasta pronto!"]
    }]);

const response = chat.send("Hola");
console.log(response); // => "Hola, ¿cómo estás?" o "¡Qué gusto saludarte!"
```


# 📡 API
## ChatGeneration
La clase ChatGeneration te permite definir opciones de interacción y generar respuestas basadas en las entradas del usuario. Las respuestas se pueden personalizar con un nombre y con un nivel de precisión para mejorar la correspondencia de las respuestas.

## 🔌 Propiedades
### name (string): 
El nombre que usará el bot o el chat en las respuestas.

### accuracy (number): 
Define qué tan precisa debe ser la comparación entre el mensaje del usuario y las entradas definidas. Por defecto, es 40 (40% de coincidencia).

### options (array):
Conjunto de opciones que contienen entradas posibles del usuario y las respuestas correspondientes.

## 📬 Métodos
### setName(name: string): ChatGeneration

Establece el nombre que se utilizará en las respuestas. Retorna la instancia para permitir encadenamiento de métodos.
```js
chat.setName("Roni Bot");
```

### setAccuracy(accuracy: number): ChatGeneration

Define la precisión para las respuestas. Cuanto más alto el valor, más exacta debe ser la coincidencia de texto con las entradas definidas. El valor debe estar entre 0 y 100.
```js
chat.setAccuracy(50); // Se requiere una coincidencia del 50%
```

### setOptions(options: array): ChatGeneration

Define las posibles entradas y respuestas del chat. Cada opción es un objeto que contiene un arreglo input con posibles entradas del usuario y un arreglo output con posibles respuestas.

```js
chat.setOptions([
  {
    input: ["Hola", "Qué tal"],
    output: ["Hola, ¿cómo estás?", "¡Qué gusto saludarte!"]
  },
  {
    input: ["Adiós", "Hasta luego"],
    output: ["Adiós, que tengas un buen día", "Hasta pronto!"]
  }
]);
```

### send(message: string): string

Envía un mensaje al chat para obtener una respuesta. Si el mensaje coincide con alguna de las entradas en las opciones, devolverá una respuesta aleatoria de las definidas. Si no hay coincidencias, se devuelve una respuesta predeterminada.
```js
const response = chat.send("Hola");
console.log(response); // => "Hola, ¿cómo estás?" o "¡Qué gusto saludarte!"
```

## 📐 Resolución de Matematica Basica
Reconocimiento de Expresiones Matemáticas
ChatGeneration también es capaz de detectar cálculos matemáticos en texto. Si el mensaje contiene palabras como "calcula", "resuelve" o "problema", intentará interpretar la expresión matemática y devolver el resultado.

**Ejemplos de expresiones matemáticas soportadas:**

```
5 mas 3 (suma)
10 menos 2 (resta)
4 por 2 (multiplicación)
9 dividido 3 (división)
2 elevado a 3 (potencia)
```

```js
const response = chat.send("Calcula 5 mas 3");
console.log(response); // => "El resultado de 5+3 es 8"
```