# Используем легкий Nginx образ
FROM nginx:alpine

# Копируем уже готовый билд в папку по умолчанию Nginx
COPY build/ /usr/share/nginx/html

# Экспонируем порт
EXPOSE 3000

# Запускаем Nginx в форграунд режиме
CMD ["nginx", "-g", "daemon off;"]