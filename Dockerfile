WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Собираем проект в продакшн
RUN npm run build

# Берём лёгкий сервер для отдачи собранных файлов
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]