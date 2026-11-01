FROM ruby:3.4-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential libpq-dev \
 && rm -rf /var/lib/apt/lists/*

 WORKDIR /app
 COPY Gemfile Gemfile.lock ./
 RUN bundle install
 COPY . .

 CMD ["sh", "-c", "bundle exec rake db:migrate && bundle exec ruby bot.rb"]