Ascent is a social network connecting high-altitude balloonists from around the world by displaying data-driven visualizations of the journey to near space.

```
 ________________________________________
/ Ascent: Connecting Young Minds to Near \
\ Space Adventures!                      /
 ----------------------------------------
        \   ^__^
         \  (**)\_______
            (__)\       )\/\
             U  ||----w |
                ||     ||
```

#Installation

- We prefer using homebrew to install prerequisites.
- Ascent utilizes PostgreSQL for its relational database manager.
```
brew install postgres
```
- You can use brew services to start/halt postgres
```
brew services start postgres
```
- Imagemagick is required as a dependancy to the rmagick gem
```
brew install imagemagick
```
- After installing & starting the above dependencies, gems can be installed by ``` bundle install ```

#Setup

Because life is short, we've included a 'yolo' rake task, which combines drop, create, migrate, and seed actions in one task.  Simply run `bundle exec rake db:yolo` to execute.
