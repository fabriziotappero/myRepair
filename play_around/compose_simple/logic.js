// Function to load an HTML file into a container
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

// Function to get the value of a specific cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Check for the existence of the token in cookies
function hasToken() {
    return getCookie('authToken') !== null;
}

document.addEventListener('DOMContentLoaded', function () {
    const contentContainer = document.getElementById('content');

    if (hasToken()) {
        loadHTML(contentContainer, 'navbar.html');
        loadHTML(contentContainer, 'body.html');
    } else {
        contentContainer.innerHTML = `
        <form @submit.prevent="signin">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" x-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" x-model="password" required>
            </div>
            <button type="submit">Sign In</button>
        </form>
        <p x-text="message"></p>`;
    }
});


function signinForm() {
    return {
        email: '',
        password: '',
        message: '',
        token: localStorage.getItem('token') || '',

        async signin() {
            try {
                const res = await fetch('https://fabdb.pockethost.io/api/collections/users/auth-with-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identity: this.email, password: this.password })
                });
                const data = await res.json();
                if (res.ok) {
                    this.message = 'Sign in successful!';
                    this.token = data.token;
                    localStorage.setItem('token', this.token);
                    await this.fetchCollectionData();
                } else {
                    this.message = 'Sign in failed: ' + data.message;
                    this.token = '';
                    localStorage.removeItem('token');
                }
            } catch (error) {
                this.message = 'Sign in failed: ' + error.message;
            }
        }
    }
}