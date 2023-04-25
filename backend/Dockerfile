FROM node
RUN mkdir -p /home/app/
WORKDIR /home/app/
COPY ./ /home/app/
RUN npm i
RUN npm run build

CMD ["npm", "run", "start"]
EXPOSE 5070