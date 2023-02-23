`use strict`;

class Github {
    constructor() {
        this.clientId = 'e19797f2d6b0e6ad8256';
        this.clientSecret = '8839acbbff48629d1d79ceac1b5a21d015d6ba13';
    }

    async getUser(userName) {
        const data = await fetch(`https://api.github.com/user/${userName}?client_id='e19797f2d6b0e6ad8256'&client_secret='8839acbbff48629d1d79ceac1b5a21d015d6ba13'`);
        const profile = await data.json();
        return profile;
    }
};

class UI {
    constructor() {
        this.profile = document.querySelector(`.profile`);
    }
    showProfile(user) {
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
            <div class="row">
            <div class="col-md-3">
                <img class="img-fluid mb-2" src="${user.avatar_url}">
                <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
            </div>
            </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div class="repos"></div>
        `
    }
    showAlert(message, className) {
        this.clearAlert()
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.searchContainer');
        const search = document.querySelector('.search');
        container.insertBefore(div, search);

        setTimeout(() => {
            this.clearAlert();
        }, 2000);
    }
    clearAlert() {
        const alertBlock = document.querySelector('.alert');
        if(alertBlock) {
            alertBlock.remove();
        }
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }
}

const github = new Github;
const ui = new UI;

const searchUser = document.querySelector(`.searchUser`);

searchUser.addEventListener(`keyup`, (e) => {
    const userText = e.target.value;
    
    if(userText.trim() !== '') {
        github.getUser(userText)
            .then(data => {
                console.log(data.message)
                if(data.message === 'Not Found'){
                    //показувати помилку
                    ui.showAlert('User not found', 'alert alert-danger');
                } else {
                    ui.showProfile(data);
                }
            })
    } else {
        //очистити інпут пошуку
        ui.clearProfile();
    }
})