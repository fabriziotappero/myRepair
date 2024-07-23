A web/phone app to *elegantly* solve the logistic nightmare of motorbike fleet repairs.

<p align="center">
  <a href="https://fabriziotappero.github.io/myRepair/index.html">https://fabriziotappero.github.io/myRepair/index.html</a>
</p>

### Frontend
All styling is done in [Pico CSS](https://picocss.com/) and all icons are from [Font Awesome](https://fontawesome.com/icons). 
Javascript is vanilla Javascript and kept to a minimum with [Alpine JS](https://alpinejs.dev/start-here). 
Future versions of this app will probably use [HTMX](https://htmx.org/) running somewhere.

Where Pico CSS is not enough, thre is CSS.

### Backend
[Golang](https://golang.org/) is the preferred language here but for for the first prototyping we are goind to
use the great [PoketBase](https://pocketbase.io/) hosted on [Pokethost.io](https://app.pockethost.io/).

### HTMX How?
It may seem difficult at first as pocketbase gives out JSON APIs but there is a way to extend pocketbase
functionality using GO/JS and add custom routes (aka event hooks). These routes can be used to send HTML 
back for HTMX. 

Pocketbase has job scheduling for periodic tasks too.

### Main UI

<p align="center" width="100%">
  <kbd>
  <img src="play_around/repair_ui.jpg" width="300px">
  </kbd>
</p>

### Ongoing Work

- [ ] A mechanism to create a new user as well as a reset password mechanism.
- [ ] A cool way to integrate this app with Whatsapp.
- [ ] More functionalities with more UI work.

### Interesting Topics

While developing this app, I faced some interesting problems worth mentioning.

Where to store a token?
https://blog.ropnop.com/storing-tokens-in-browser/

Use AlpineJS for data fetch and table sorting
https://www.raymondcamden.com/2022/05/02/building-table-sorting-and-pagination-in-alpinejs

