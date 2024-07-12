// Load Signin form at page reload
document.addEventListener('DOMContentLoaded', () => {
    fetch('signin.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('signinContainer').innerHTML = data;
        })
        .catch(error => console.error('Error loading signin.html:', error));
});
