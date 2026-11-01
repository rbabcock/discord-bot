# OSRS Discord Bot

A Discord bot that looks up Old School RuneScape stats and kill counts from the official hiscores.

## Commands

| Command | Description |
|---|---|
| `/stats [player]` | Show skill levels and XP for a player |
| `/kc [player]` | Show boss kill counts, clue scrolls, and minigame scores |
| `/setname <name>` | Link your OSRS name to your Discord account |
| `/ping` | Check that the bot is alive |

If you've linked a name with `/setname`, `/stats` and `/kc` use it when no player is given.

Boss kill counts only show up once a player has enough kills to be ranked on the hiscores. Kill counts for regular monsters aren't published by Jagex, so the bot can't show them.

## Setup

### Requirements

- Ruby 3.4
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)

### Environment variables

Create a `.env` file in the project root:

```
BOT_TOKEN=your-bot-token
DISCORD_SERVER_IDS=123456789012345678,234567890123456789
```

- `BOT_TOKEN` (required): the bot's token.
- `DISCORD_SERVER_IDS` (optional): comma-separated server IDs to register commands in. Server commands show up immediately. If left empty, commands are registered globally, which can take a while to appear.

### Running locally

```bash
bundle install
bundle exec rake db:migrate
bundle exec ruby bot.rb
```

The database is SQLite, stored at `db/bot.sqlite3` (configured in `config/database.yml`).

## Running with Docker

```bash
docker compose up -d --build
```

The container runs migrations on startup, then starts the bot. `./db` is mounted into the container, so the database survives rebuilds.

View logs:

```bash
docker compose logs -f bot
```

Update after pulling changes:

```bash
git pull && docker compose up -d --build
```

Only run one copy of the bot per token. Two copies will both receive every command and conflict with each other.

## Database tasks

| Task | Description |
|---|---|
| `bundle exec rake db:migrate` | Run pending migrations |
| `bundle exec rake db:rollback` | Roll back the last migration |
| `ruby console.rb` | Open an IRB console connected to the database |

## Project layout

```
bot.rb              Entry point; loads and registers every command in commands/
commands/           One module per slash command
lib/hi_scores.rb    OSRS hiscores client and output formatting
lib/command_helper.rb  Registers commands globally or per server
lib/database.rb     ActiveRecord connection
models/             ActiveRecord models
db/migrate/         Database migrations
```

### Adding a command

Create a file in `commands/` that defines a module under `Commands` with a `self.register(bot)` method. `bot.rb` picks it up automatically:

```ruby
require_relative '../lib/command_helper'

module Commands
  module Hello
    def self.register(bot)
      CommandHelper.register(bot, :hello, 'Say hello')
      bot.application_command(:hello) do |event|
        event.respond(content: "Hello, #{event.user.display_name}!")
      end
    end
  end
end
```
