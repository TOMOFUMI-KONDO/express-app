FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY tsconfig* .
COPY prisma .

RUN npx prisma generate

CMD ["npm", "run" , "dev:watch"]
