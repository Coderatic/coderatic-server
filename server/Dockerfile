FROM node:18-buster

RUN apt-get update && apt-get install -y apparmor

# RUN apparmor_parser -r -W --subdomainfs /etc/apparmor.d /etc/apparmor.d/coderatic-bin-policy && \
# 	apparmor_parser -r -W --subdomainfs /etc/apparmor.d /etc/apparmor.d/coderatic-py3-policy

WORKDIR /server

COPY ./package*.json ./
RUN npm install

COPY . .

# RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD sh -c "mount -t securityfs none /mnt && npm run dev"
