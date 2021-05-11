FROM nginx:latest
COPY nginx.conf /app/nginx.conf
WORKDIR /app
COPY dist ./dist

CMD ["nginx-debug", "-c", "/app/nginx.conf",  "-g", "daemon off;"]

