
---

### **Explicação do Código**

#### **1. Bibliotecas e Configuração Inicial**
```cpp
#include "BluetoothSerial.h"
#include <Arduino.h>
```
- **BluetoothSerial.h**: Biblioteca para comunicação via Bluetooth em dispositivos compatíveis.
- **Arduino.h**: Biblioteca principal para funções padrão do Arduino.

#### **2. Inicialização de Variáveis Globais**
```cpp
BluetoothSerial serialBT;
char btSignal;
int Speed = 100;
```
- `serialBT`: Objeto para gerenciar a comunicação Bluetooth.
- `btSignal`: Variável que armazena o comando recebido via Bluetooth.
- `Speed`: Controla a velocidade inicial dos motores (de 0 a 255).

#### **3. Definição dos Pinos**
```cpp
int enA = 5; // Controle de velocidade do motor esquerdo (PWM)
int enB = 23; // Controle de velocidade do motor direito (PWM)
int IN1 = 22, IN2 = 21, IN3 = 19, IN4 = 18; // Controle da direção dos motores
```
- Os pinos `IN1`, `IN2`, `IN3` e `IN4` controlam a direção dos motores.
- `enA` e `enB` ajustam a velocidade dos motores via PWM.

#### **4. Configuração do PWM**
```cpp
const int pwmFreq = 5000; // Frequência do PWM (5 kHz)
const int pwmResolution = 8; // Resolução de 8 bits
```
- Define a frequência e a resolução do PWM para controle suave dos motores.

#### **5. Função `setup`**
```cpp
void setup() {
  Serial.begin(115200);
  serialBT.begin("CARRINHO ;)");
  ...
}
```
- **`Serial.begin(115200)`**: Inicializa a comunicação serial para depuração.
- **`serialBT.begin("CARRINHO ;)")`**: Configura o nome do dispositivo Bluetooth.
- Configura os pinos como `OUTPUT` e define o estado inicial dos motores como desligados.

#### **6. Loop Principal**
```cpp
void loop() {
  while (serialBT.available()) {
    btSignal = serialBT.read();
    ...
  }
}
```
- Verifica continuamente se há comandos recebidos via Bluetooth.
- Armazena o comando em `btSignal` e executa ações baseadas no comando.

#### **7. Ajuste da Velocidade**
```cpp
if (btSignal == '0') Speed = 100;
if (btSignal == 'q') Speed = 255;
```
- Ajusta a velocidade dos motores de acordo com o comando recebido ('0' a 'q').

#### **8. Controle de Direção**
Comandos básicos:
- `'B'`: Move para trás.
- `'F'`: Move para frente.
- `'L'`: Vira à esquerda.
- `'R'`: Vira à direita.
- `'S'`: Para o carrinho.

#### **9. Funções de Controle**

**Movimento para Trás:**
```cpp
void backward() {
  ledcWrite(enA, Speed);
  ledcWrite(enB, Speed);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}
```
- Define os motores para girar no sentido contrário, movendo o carrinho para trás.

**Movimento para Frente:**
```cpp
void forward() {
  ledcWrite(enA, Speed);
  ledcWrite(enB, Speed);
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}
```
- Define os motores para girar no sentido direto, movendo o carrinho para frente.

**Virar à Esquerda:**
```cpp
void turnLeft() {
  ledcWrite(enA, Speed);
  ledcWrite(enB, 0);
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}
```
- Desliga o motor direito e mantém o esquerdo ativo, permitindo a curva para a esquerda.

**Virar à Direita:**
```cpp
void turnRight() {
  ledcWrite(enA, 0);
  ledcWrite(enB, Speed);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}
```
- Desliga o motor esquerdo e mantém o direito ativo, permitindo a curva para a direita.

**Parar:**
```cpp
void stop() {
  ledcWrite(enA, 0);
  ledcWrite(enB, 0);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}
```
