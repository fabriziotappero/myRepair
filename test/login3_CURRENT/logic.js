async function loadHTML(container, url) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'text/html',
                'Authorization': 'Bearer ' + getCookie('authToken')
            }
        });

        if (response.ok) {
            const html = await response.text();
            container.innerHTML += html;
        } else {
            console.error('Error loading HTML:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function hasToken() {
  return sessionStorage.getItem("token") !== null;
}


// document.addEventListener('DOMContentLoaded', function () {
//     const contentContainer = document.getElementById('content');

//     loadHTML(contentContainer, 'navbar.html');

//     if (hasToken()) {

//         // how do I trigger fetchCollectionData here?

//         loadHTML(contentContainer, 'main.html');

//     } else {
//         loadHTML(contentContainer, 'signin.html');
//     }
// });


document.addEventListener('DOMContentLoaded', async function () {
  const contentContainer = document.getElementById('content');

  if (hasToken()) {

      // Initialize dataTable and fetch collection data
      const dataTableInstance = dataTable();
      await dataTableInstance.fetchCollectionData();

      //loadHTML(contentContainer, 'main.html');

      // Render the fetched data into the DOM
      dataTableInstance.renderData(contentContainer);

  } else {
      loadHTML(contentContainer, 'signin.html');
  }
});


function loginForm() {
  return {
    email: '',
    password: '',
    message: '',
    async signin() {
      try {
        const response = await fetch('https://fabdb.pockethost.io/api/collections/users/auth-with-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({identity: this.email, password: this.password }),
        });

        if (!response.ok) {
          throw new Error('Signin failed');
        }
        const data = await response.json();

        sessionStorage.setItem("token", data.token);
        this.message ='Signin successful.';

        location.reload();

        // Optionally, redirect to a protected page
        //window.location.href = '/protected-page';

      } catch (error) {
        this.message = 'Signin failed: ' + error.message;
      }
    },
  };
}

function signoutLink() {
  return {
    isSignedIn: false,
    init() {
      this.isSignedIn = !!sessionStorage.getItem('token');
    },
    signout() {
      sessionStorage.removeItem('token');
      this.isSignedIn = false;
      location.reload();
    }
  };
}

function dataTable() {
  return {
      collection: [],
      async fetchCollectionData() {
          try {
              this.token = sessionStorage.getItem('token');

              const res = await fetch('https://fabdb.pockethost.io/api/collections/test_collection/records', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${this.token}`
                  }
              });
              const data = await res.json();
              if (res.ok) {
                  this.collection = data.items;
              } else {
                  this.message = 'Failed to fetch collection data: ' + data.message;
              }
          } catch (error) {
              this.message = 'Failed to fetch collection data: ' + error.message;
          }
      },
      renderData(container) {
          const dataContainer = document.createElement('div');
          dataContainer.id = 'data-container';

          this.collection.forEach(item => {
              const itemElement = document.createElement('div');
              itemElement.className = 'data-item';
              itemElement.textContent = `ID: ${item.id}, tName: ${item.name}, text: ${item.text}`;
              dataContainer.appendChild(itemElement);
          });

          container.appendChild(dataContainer);
      }
  };
}