FROM node:12.18.2 as build

WORKDIR /app

# COPY ./package.json /app/package.json
# COPY ./package-lock.json /app/package-lock.json

# RUN npm config set registry https://repo.lab.pl.alcatel-lucent.com/api/npm/npm-remote
# RUN npm config set @nokia-csf-uxr:registry https://repo.lab.pl.alcatel-lucent.com/api/npm/csf-npm-delivered

# RUN yarn install

COPY . .

# RUN yarn build

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html
