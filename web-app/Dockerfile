FROM node:12-alpine3.10
ARG TOKEN
ENV TOKEN=${TOKEN}
RUN apk add git
RUN git config --global user.email git-bot@rosmem.com
RUN git config --global user.name "Meme Git Bot"
WORKDIR /home/node/app
RUN git clone https://${TOKEN}github.com/Memes-Company/rosmem.git
WORKDIR rosmem/web-app
RUN yarn
RUN yarn build
RUN yarn deploy:dev
RUN yarn deploy:prod