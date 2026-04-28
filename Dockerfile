FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy ONLY the static site and JS modules
COPY public/ /usr/share/nginx/html/
COPY src/ /usr/share/nginx/html/src/

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
