FROM node:20-alpine as build
#RUN apk update && apk upgrade && apk add git
#WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build

#production environment
#FROM nginx:1.25.3-alpine-slim
#COPY /scripts/default.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

WORKDIR /app


COPY . .


RUN npm install

# Set the environment variable to customize the port (optional)
ENV PORT=80

EXPOSE 80

CMD ["npm", "run", "start", "--", "--port", "80","facilitymanager"]
