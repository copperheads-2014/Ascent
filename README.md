Ascent is a social network connecting high-altitude balloonists from around the world by displaying data-driven visualizations of the journey to near space.

#Installation

- We prefer using homebrew to install prerequisites.
- Ascent utilizes PostgreSQL for its relational database manager.
```
brew install postgres
```
- Imagemagick is required as a dependancy to the rmagick gem
```
brew install imagemagick
```
- Gems can be installed by ``` bundle install ```

#Setup

Because life is short, we've included a 'yolo' rake task, which combines drop, create, migrate, and seed actions in one task.  Simply run `bundle exec rake db:yolo` to execute.
