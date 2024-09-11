# Запускаем Backed на  express

- Открываем IDE и создаем новый проект.
В командной строке прописываем:
***
**Создание проекта.**
```bash
yarn init --yes
```
**Добавление express и библиотеки для работы с переменными окружения.**
```bash
yarn add express dotenv
```
**Добавление библиотек дебагинга, тайпскрипта, тестов.**
```bash
yarn add nodemon typescript ts-node @types/node @types/express 
```
**Включение тайпскрипта.**
```bash
yarn tsc --init
```

**Установка CORS**  
Нужна только в случае если мы будем работать с Front.
```bash
yarn add @types/cors --dev
```
**Установка пакета для запуска команд `watch` и `dev` одновременно:**
```bash
yarn add concurrently --dev
```
**В файле `tsconfig.json` удаляем содержимое и копируем настройки:**

~~~json
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "outDir": "./dist",
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "noImplicitReturns": true,
        "skipLibCheck": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.test.ts"]
}
~~~

**Нужно вставить в `package.json`  настройки и запустить команды:**
- watch - создание джаваскрипт бэкэнда на основе тайпскрипт кода.
- dev - запуск джаваскрипт бэкэнда.
- jest - запуск тестов (для запуска тестов НЕ нужно запускать бэкэнд).
- watch and dev - запуск 2 команд одновременно.
- jest:coverage - отчеты о покрытии кода тестами.
```json
    "scripts": {
    "watch": "tsc -w",
    "dev": "yarn nodemon --inspect dist/index.js",
    "jest": "jest -i",
    "watch and dev": "concurrently \"yarn watch\" \"yarn dev\"",
    "jest:coverage": "jest -i --coverage"
}
```
Правой кнопкой мыши  `package.json` ➡️ `Show npm Scripts`  
***
**Файл создания приложения:**  
Cоздаем файл `src/app.ts` : 

```js
import express from 'express'
 
export const app = express()
app.use(express.json())
 
app.get('/', (req, res) => {
    res.status(200).json({hello: 'world'})
})
// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)
```

**Файл со всеми настройками / константами / хардкодом приложения:**  
Cоздаем файл `src/settings.ts` :
```js
import {config} from 'dotenv'
config()
 
export const SETTINGS = {
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos',
    },
}
```

**Файл с процессом запуска приложения:**  
Cоздаем файл `src/index.ts` :
```js
import {app} from './app'
import {SETTINGS} from './settings'
 
app.listen(SETTINGS.PORT, () => {
    console.log('...server started')
})
```

