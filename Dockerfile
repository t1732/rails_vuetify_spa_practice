FROM ruby:2.6.1
LABEL maintainer "t1723 <oo1732oo@gmail.com>"

ENV LANG C.UTF-8
ENV APP_HOME /app
ENV NODE_ENV production
ENV RAILS_ENV production
ENV RAILS_LOG_TO_STDOUT true

RUN apt-get update -qq && apt-get install -y build-essential apt-transport-https apt-utils

# for a JS runtime
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash - && \
  apt-get install -y nodejs

# for yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update -qq && apt-get install -y yarn

RUN apt-get update -qq && \
  apt-get install -y sqlite3 libsqlite3-dev && \
  gem update bundler rake && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /tmp
ADD Gemfile* ./
ADD package.json yarn.lock ./
RUN bundle config --global frozen 1 && \
  bundle install --jobs 4 --retry 3 --without development test && \
  yarn install --prod

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
ADD . ./

RUN cp -R /tmp/node_modules ./ && \
  rm -rf /tmp/node_modules && \
  cp config/database.docker.yml config/database.yml && \
  bundle exec rails tmp:create && \
  bundle exec rails webpacker:compile && \
  mv public/packs $APP_HOME/tmp/dist

RUN echo '#!/bin/bash\n\
  set -ef\n\
  cd $APP_HOME\n\
  rm -rf public/*\n\
  mv $APP_HOME/tmp/dist public/packs\n\
  bundle exec puma -C config/puma.rb\n'\
  > puma-start.sh && \
  chmod +x puma-start.sh
