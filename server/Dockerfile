FROM node:18-buster

# Install Docker
RUN apt-get update && apt install docker.io -y

# Install dependencies for gVisor
RUN apt-get update && \
	apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg

# Install gVisor
RUN curl -fsSL https://gvisor.dev/archive.key | gpg --dearmor -o /usr/share/keyrings/gvisor-archive-keyring.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/gvisor-archive-keyring.gpg] https://storage.googleapis.com/gvisor/releases release main" | tee /etc/apt/sources.list.d/gvisor.list > /dev/null
RUN apt-get update && apt-get install -y runsc

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

# RUN systemctl start docker
# RUN docker build -t bin_img -f ./src/microservices/judge/dockerfiles/bin/Dockerfile .
# RUN docker build -t py3_img -f ./src/microservices/judge/dockerfiles/py3/Dockerfile .

# RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD ["/usr/bin/dockerd", "&&", "npm", "run", "dev"]
