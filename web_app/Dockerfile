FROM nginx:latest
COPY nginx.conf /app/nginx.conf
WORKDIR /app
COPY dist /app/dist

# TODO - remove before flight - below nginx-debug replaced with nginx

CMD ["nginx-debug", "-c", "/app/nginx.conf",  "-g", "daemon off;"]

