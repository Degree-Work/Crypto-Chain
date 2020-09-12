## Оглавление

[О проекте](../README.md)

1. **Initial project**
2. **Create block with TDD**
3. **Genesis block**
4. **Mine Block**
5. **Crypto Hash**
6. **Blockchain**
7. **Chain Validation**
8. **Replace Chain**
9. **Difficulty and the Nonce Value**
10. **Dynamic Difficulty and the Mine Rate**
11. **Average Work**
12. **Binary hashes**
13. **Prevent Difficulty Jumps**

### 1. Initial project
1. `npm init`
2. `npm i jest@23.6.0 --save-dev` - *библиотека для тестирования*

### 2. Create block with TDD
- *Создан класс block и тест для проверки*
- *Изменен скрипт test в package.js*

### 3. Genesis block
- *Написаны тесты*
- *Реализован статический метод genesisBlock()*

### 4. Mine Block
- *Добавлена функция для создания блока*

### 5. Crypto Hash
- *Создана фукнция позволяющая получать hash*

### 6. Blockchain
- *Реализованы тесты на проверку добавления/genesis block*
- *Реализован класс*

### 7. Chain Validation
- *Реализована функция проверки chain*
    - *проверка genesis block*
    - *проверка hash*
    - *проверка соответствие всех lastHash*
    
### 8. Replace Chain
- *Реализованы тесты*
- *Реализован алгоритм проверки, что поданная на вход chain валидна и подходит*

### 9. Difficulty and the Nonce Value
- *Реализованы тесты*
- *Изменен алгоритм mineBlock()*
- *Изменены места где генерируется hash добавлены два новых поля*

### 10. Dynamic Difficulty and the Mine Rate
- *Написана функция `adjustDifficulty` регулировка сложности*
- *Написаны тесты под нее*
- *Настроена регулировка сложности при mineBlock()*

**P.S Смайнился первый блок**

### 11. Average Work
- *Реализован скрипт, который генерирует n блоков и позволяет увидеть время на генерацию блока, difficulty и среднее время генерации на блок.*

### 12. Binary hashes
- `npm i hex-to-binary --save` - *библиотека для преобразования 16-ричной в 2-чную*
- *Теперь точность будет проверятся в двоичном виде, но hash будет в 16-ричной*

### 13. Prevent Difficulty Jumps
- *Реализована проверка на difficulty jump*
- *Реализован тест для проверки*

### 14. Install Express
- `npm i express --save` 
- *Реализован /api/blocks*
- `npm i nodemon --save-dev` - *для автоматического перезапуска приложения*

### 15. Post request to Mine Block
- `npm i body-parser --save` - *библиотека для парсинка body*
- *Реализован /api/mine для создания нового блока*



***
**Nonce**
- *Так вот, тот ответ, который позволил нам открыть нужную коробку и достать монету, и является значением Nonce в майнинге. Стоит отметить, что оно является уникальным и никогда больше не повторяется.*
