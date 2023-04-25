# lts is version 18 at the moment
FROM node:lts
RUN mkdir -p /home/app/
WORKDIR /home/app/
COPY ./ /home/app/
# Can improve app performance by a factor of 3!
ENV NODE_ENV production

RUN npm i
RUN npm run build

CMD ["npm", "run", "start"]
EXPOSE 5070