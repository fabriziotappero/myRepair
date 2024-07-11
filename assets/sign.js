const db_url = 'https://fabdb.pockethost.io';
token = sessionStorage.getItem("token");

function signinForm() {
    return {
        username: '',
        password: '',
        message: '',
        async signin() {
            try {
                const response = await fetch(db_url + '/api/collections/users/auth-with-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        identity: this.username,
                        password: this.password
                    })
                });
                const data = await response.json();

                if (data.token) {
                    this.message = 'Signin successful!';

                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("isSignedIn", "true");

                    // can I avoid reloading the whole page?
                    location.reload();  

                } else {
                    this.message = data.message || 'Invalid username or password.';
                }
            } catch (error) {
                this.message = 'An error occurred. Please try again.';
            }
        }
    }
}

function signoutLink() {
    return {
      signout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isSignedIn');
        // can I avoid reloading the whole page?
        location.reload();
      }
    };
  }