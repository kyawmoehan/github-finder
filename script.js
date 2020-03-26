$(document).ready(function() {
    
    // ? get input username
    $('#searchUser').on('keyup', function(e) {
        let userName = e.target.value;
        
        // ? make request to github
        $.ajax({
            url: `https://api.github.com/users/${userName}`,
            data:{
                client_id: 'd52c9758bbd52c5e26f9',
                client_secret: '3dd51657639d8d129d879633d29b94126e7e9b12'
            }
        }).done(function(user) {
            $.ajax({
                url: `https://api.github.com/users/${userName}/repos`,
                data:{
                    client_id: 'd52c9758bbd52c5e26f9',
                    client_secret: '3dd51657639d8d129d879633d29b94126e7e9b12',
                    sort: 'created asc',
                    per_page: 5
                }
            }).done(function(repos) {
                $.each(repos, function(idex, repo) {
                    $('#repos').append(`
                        <div class="card-header my-2 py-3">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong> : ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <p class="badge badge-primary p-2">Fork: ${repo.forks_count}</p>
                                    <p class="badge badge-dark p-2">Watchers: ${repo.watchers_count}</p>
                                    <p class="badge badge-success p-2">Stars: ${repo.stargazers_count}</p>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-info">Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
                console.clear();
            });
            $('#profile').html(`
            <div class="card">
                <h2 class="card-title bg-dark text-white p-2">${user.name}</h2>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${user.avatar_url}" alt="Avatar" class="img-fluid img-thumbnail">
                            <a href="${user.html_url}" class="mt-2 btn btn-primary btn-block" target="_blank">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <div class="mb-2 mt-2">
                                <p class="badge badge-primary p-2">Publie Repos: ${user.public_repos}</p>
                                <p class="badge badge-dark p-2">Publie Gists: ${user.public_gists}</p>
                                <p class="badge badge-success p-2">Followers: ${user.followers}</p>
                                <p class="badge badge-info p-2">Following: ${user.following}</p>
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Webiste/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Email: ${user.email}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4 mb-2">
                <h3 class="font-weight-bold">Latest Repositories</h3>
                <div id="repos">
                </div>
            </div>
            `);
            console.clear();
        });
    });
    console.clear();
});