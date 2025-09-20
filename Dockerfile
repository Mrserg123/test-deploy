FROM nginx:alpine

# Копируем билд React
COPY build/ /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]