FROM nginx:latest
WORKDIR /app
COPY dist/ ./dist
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]

