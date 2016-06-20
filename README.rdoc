# Nightsprout Shell Project

The Nightsprout Shell Project is a boilerplate project that allows us to get up and running with robust, powerful, and familiar technology. It is configured by default to use Rails and AngularJS and has an opinionated approach to project organization, application architecture, managing events/scripts, and more.

---

### Nightsprout "Shell Project": Setup

##### Setup is Easy:
* MORE DOCUMENTATION REQUIRED HERE.
* Install RVM.
* Install Ruby Version(s).
* Install Rails.
* Install Homebrew.
* Install Postgres.
* Install Pow.

---

### Nightsprout "Shell Project": Troubleshooting

##### Installation Issues:
* Problem with RVM? Try completely closing out your Terminal session and starting over.
* Undiagnosable Rails error? Try restarting your app with `touch tmp/restart.txt` and restarting Pow via System Manager.
* Common things to remember: `bundle install` if gemfile is updated; `bundle exec rake db:migrate` if project has new migrations.

##### JS Issues:
* Problem with JS on Heroku? Did you remember to use "array syntax" with dependency injection when minifying for Heroku?
* Can't load your Angular controller? Did you remember to specify the controller inside of the Rails controller?
* Can't load a JS file? Did you remember to add it to the JS manifest?

---

### Nightsprout "Shell Project": Quirks

##### Quirks:
* We use the Rails router by default, not the Angular router. Avoid using the Angular router for projects which need to be crawled by search engines. Otherwise, other methods are viable, but will require reworking some core assumptions.
* Each view needs an Angular controller defined in the Rails controller method. If it is not specified, it falls back to a default "catch all" Angular controller.
* Nightsprout "plugins" are located in the appropriate CSS/JS/etc. assets subfolder. For CSS, it is in the "shared" subfolder. For JS, it is in `angular/nightsprout`.
* Be sure to include JS Nightsprout plugins in the appropriate JS. manifest if you want to use them.
* Likewise, if you don't need the JS plugin, remove it from the ppropriate JS. manifest.
* CSS plugins are included inside of `main.css.scss` - no the CSS manifest file.
* In terms of JS/Angular, `nsStateMachine` is a property on `$rootScope` that tracks application front end state.
* Nightsprout Angular plugins are defined on `nsStateMachine`.
* Other globally-relevant data, such as "current date" may also be defined on `nsStateMachine`.

---

### Nightsprout "Shell Project": Guidelines

##### Guidelines:
* Please include inline documentation for all new code you write. Use your best judgement, but often complicated blocks of code require a multi-line comment for documenting functionality.
* Avoid overriding "basic" Shell Project code. Override where possible.
* Avoid hard-coding anything in Shell Project. If you must, create a branch with a hard-coded implementation, then refactor it in a generic way before merging to master.

---

### Nightsprout "Shell Project": Deployment

##### Deployment is Easy:
* MORE DOCUMENTATION REQUIRED HERE.
* Make sure Postgres is installed correctly.
* Make sure AngularJS files are minified properly.











