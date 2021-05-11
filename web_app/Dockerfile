FROM nginx:latest
# COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

