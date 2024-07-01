A web app to *elegantly solve* motorbike fleet repairs.

https://fabriziotappero.github.io/myRepair/index.html

### Frontend
All styling is done in [Pico CSS](https://picocss.com/) and all icons are from [Boxicon](https://boxicons.com/). 
Javascript is kept to a minimum with [Alpine JS](https://alpinejs.dev/start-here). Future versions of this app 
will use [HTMX](https://htmx.org/) running somewhere.

If Pico CSS is not enough, you can fold back to [Tailwind CSS](https://tailwindcss.com/)

### Backend
[Golang](https://golang.org/) is the preferred language here but for for the first prototyping we are goind to
use the great [PoketBase](https://pocketbase.io/) hosted on [Pokethost.io](https://app.pockethost.io/).

### TODOS

- [x] Implement simple index.html with a table. Use *picocss* and *boxicon*
- [x] Implement *signin.html* and *signup.html*
- [ ] Connect frontend sign in and sign up pages with poketbase database
- [ ] Redesign index.html to include sign in and sign up pages
- [ ] Create a periodic routine to update current database content with a remote
      database using [job scheduling](https://pocketbase.io/docs/go-jobs-scheduling/)
- [ ] Design main data viewer/editor in data.html
- [ ] Modify data.html to provide different subset of data according to what user is logged in
- [ ] Implement simple edit data in data.html
