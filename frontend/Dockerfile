# lts is version 18 at the moment
FROM node:lts
RUN mkdir -p /home/app/
WORKDIR /home/app/
COPY ./ /home/app/

# Can improve app performance by a factor of 3!
ENV NODE_ENV production

RUN npm i

ARG NEXT_PUBLIC_API_ENDPOINT
# RUN export NEXT_PUBLIC_API_ENDPOINT='http://api.budgetsmart.ca/api'
# RUN echo ${NEXT_PUBLIC_API_ENDPOINT}

# RUN NEXT_PUBLIC_API_ENDPOINT='http://api.budgetsmart.ca/api' npm run build
RUN NEXT_PUBLIC_API_ENDPOINT=${NEXT_PUBLIC_API_ENDPOINT} npm run build

CMD ["npm", "run", "start"]
EXPOSE 3000