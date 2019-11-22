FROM node:12-alpine3.10
ARG REPO_URL
RUN node -v
RUN npm -v
RUN yarn -v
RUN apk add git
RUN git config --global user.email git-bot@rosmem.com
RUN git config --global user.name "Meme Git Bot"
WORKDIR /home/node/app
RUN git clone ${REPO_URL}
WORKDIR rosmem/web-app
RUN yarn
RUN yarn build
RUN yarn deploy:dev
