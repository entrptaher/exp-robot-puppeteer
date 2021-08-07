FROM automatio/xvfb-puppeteer:10.0.0
WORKDIR /app
RUN apt update
RUN apt-get install -yq libx11-dev
RUN apt-get install -yq libglu1-mesa
RUN apt-get install -yq libxrandr-dev
RUN apt-get install -yq libxi-dev
RUN apt-get install -yq libxtst-dev
RUN apt-get install -yq libz-dev
RUN apt-get install -yq libpng++-dev

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
COPY ./app/pnpm-lock.yaml ./app/package.json ./
RUN --mount=type=cache,target=/app/pnpm-store \
    pnpm config set store-dir /app/pnpm-store && \
    pnpm install
COPY ./app ./
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENTRYPOINT ["/usr/bin/dumb-init", "--"]