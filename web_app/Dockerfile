FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
COPY dist/ ./dist

CMD ["nginx", "-g", "daemon off;"]

