FROM nginx:alpine

# Копируем билд React
COPY build/ /usr/share/nginx/html

# Экспонируем порт
EXPOSE 3000

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]