FROM node:16

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY swagger.js .
RUN npm install express nodemon mongoose swagger-autogen swagger-ui-express
RUN npm install -g npm@8.19.2

COPY . .


RUN chown node /app/
RUN chgrp node /app/
RUN chmod 755 /app

RUN rm -f ./swagger_output.json

EXPOSE 3300
#CMD ["node", "index.js"]
CMD ["node", "swagger.js"]
#CMD ["npm", "run", "start-gendoc"]


# At the end, set the user to use when running this image
USER node