// function getuUserRepos(username){
//     return fetch(`https://api.github.com/users/${username}/repos`).then((raw) =>raw.json())
// }

// getuUserRepos("asynchronousJavascriptor").then(function(data){
//     console.log(data)
// })


let searchBtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp")
let card = document.querySelector(".card")

function getProfileData(username){
    return fetch(`https://api.github.com/users/${username}`).then(raw => {
        if(!raw.ok) throw new Error("User not found")
        return raw.json();
    })
}

function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw => {
        if(!raw.ok) throw Error("Failed to fetch repos")
        return raw.json();
    })
}

function decorateProfileData(details){
    console.log(details)
    let data = `<!-- Profile Header -->
            <div class="flex items-start space-x-6">
                <img 
                    src="${details.avatar_url}" 
                    alt="User Avatar" 
                    class="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-gray-700"
                    onerror="this.onerror=null;this.src='https://placehold.co/120x120/1f2937/ffffff?text=Error';"
                >
                <div class="flex-1">
                    <div class="flex flex-col sm:flex-row justify-between items-start">
                        <div>
                            <h2 class="text-2xl md:text-3xl font-bold text-white">${details.name}</h2>
                            <p class="text-blue-400 text-md mt-1">@${details.login}</p>
                        </div>
                        <p class="text-gray-400 mt-2 sm:mt-0">Joined ${details.created_at.split('T')[0]}</p>
                    </div>
                    <p class="text-gray-300 mt-4 leading-relaxed">
                        ${details.bio ? details.bio : ""}
                    </p>
                </div>
            </div>

            <!-- Profile Stats -->
            <div class="bg-gray-900 rounded-xl p-5 my-8 flex justify-around text-center">
                <div>
                    <p class="text-sm text-gray-400">Repos</p>
                    <p class="text-2xl font-bold text-white mt-1">${details.public_repos ? details.public_repos : ""}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-400">Followers</p>
                    <p class="text-2xl font-bold text-white mt-1">${details.followers ? details.followers : ""}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-400">Following</p>
                    <p class="text-2xl font-bold text-white mt-1">${details.following}</p>
                </div>
            </div>

            <!-- Profile Links & Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-gray-300">
                <!-- Location -->
                <div class="flex items-center space-x-4">
                    <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>${details.location ? details.location : ""}</span>
                </div>
                <!-- Website -->
                <div class="flex items-center space-x-4">
                    <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a href="#" class="hover:underline">${details.blog ? details.blog : "Not Yet"}</a>
                </div>
                <!-- Twitter -->
                <div class="flex items-center space-x-4 text-gray-500">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.053 3.863-.764-.024-1.482-.234-2.11-.583v.062c0 2.256 1.605 4.14 3.737 4.568-.39.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.307 3.2 4.34 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.063 1.328 4.526 2.104 7.177 2.104 8.602 0 13.3-7.25 13.06-13.585.91-.658 1.7-1.473 2.323-2.41z"/>
                    </svg>
                    <span>${details.twitter_username ? details.twitter_username : ""}</span>
                </div>
                <!-- Company -->
                <div class="flex items-center space-x-4">
                    <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <a href="#" class="hover:underline">${details.company ? details.company : ""}</a>
                </div>
            </div>`

    card.innerHTML = data;
}

getRepos("asyc").then(function(data){
    console.log(data)
})

searchBtn.addEventListener("click", function(){
    username = usernameinp.value.trim()
    if(username.length > 0){
        getProfileData(username).then((data) => {
            decorateProfileData(data)
        })
    }else{
        alert();
    }
})