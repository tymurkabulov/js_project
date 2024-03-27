
    let urlUser = new URLSearchParams(window.location.search);
    let userId = urlUser.get('id');

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            let userInfo = document.createElement('div');
            let userPostsButton = document.createElement('button');

            userInfo.style.backgroundColor = '#f0f0f0';
            userInfo.style.border = '2px solid black';
            userInfo.style.padding = '10px';
            userInfo.style.fontSize = '20px';

            userPostsButton.id = 'posts';
            userPostsButton.innerHTML = `Posts of current user`;


            userPostsButton.style.backgroundColor = '#007bff';
            userPostsButton.style.border = 'none';
            userPostsButton.style.color = 'white';
            userPostsButton.style.width = '90%';
            userPostsButton.style.display = 'block';
            userPostsButton.style.margin = '0 auto';
            userPostsButton.style.marginTop = '1%';
            userPostsButton.style.height = '50px';
            userPostsButton.style.cursor = 'pointer';
            userPostsButton.style.fontSize = '20px';


            userInfo.innerHTML = `
                <strong>Name:</strong> ${user.name}<br>
                <strong>Username:</strong> ${user.username}<br>
                <strong>Email:</strong> ${user.email}<br>
                <strong>Phone:</strong> ${user.phone}<br>
                <strong>Website:</strong> ${user.website}<br>
                <strong>Company:</strong> ${user.company.name}<br>
                <strong>Company's bs:</strong> ${user.company.bs}<br>
                <strong>Catch phrase:</strong> ${user.company.catchPhrase}<br>
                <strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}<br>       
            `;

            userInfo.appendChild(userPostsButton);
            document.body.appendChild(userInfo);

            document.getElementById('posts').addEventListener('click',() =>{
                fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                    .then(response =>{
                        if (!response.ok){
                            throw new Error('Network was not ok');
                        }
                        return response.json();
                    })
                    .then(posts =>{
                     userPostsButton.remove();
                        let postCard = document.createElement('div');

                        postCard.style.border = '2px solid black';
                        postCard.style.marginTop = '10px';
                        postCard.style.padding = '10px';
                        postCard.style.display = 'flex';
                        postCard.style.flexWrap = 'wrap';
                        postCard.style.gap = '10px';
                        postCard.style.justifyContent = 'space-around';


                     posts.forEach(post => {
                         let postBlock = document.createElement('div');
                         let postTitle = document.createElement('p');
                         let postsButton = document.createElement('button');

                         postBlock.style.width = '16%';
                         postBlock.style.border = '2px solid black';
                         postBlock.style.padding = '10px';
                         postBlock.style.margin = '10px';
                         postBlock.style.display = 'flex';
                         postBlock.style.flexDirection = 'column';


                         postTitle.innerHTML = `
                             <strong>Post title #${post.id}:</strong><br>
                             ${post.title}
                         `;

                         postsButton.innerHTML = `<a href="post-details.html?id=${post.id}" style="text-decoration:none; color: white">Post page</a>`;
                         postsButton.style.marginTop = 'auto';
                         postsButton.style.backgroundColor = '#007bff';
                         postsButton.style.border = 'none';
                         postsButton.style.fontSize = '20px';
                         postsButton.style.padding = '10px';

                         postCard.appendChild(postBlock);
                         postBlock.appendChild(postTitle);
                         postBlock.appendChild(postsButton);
                         userInfo.appendChild(postCard);
                     })

                    })
                    .catch(error => console.error('Issue with fetch operation', error));
            })
        })
        .catch(error => console.error('Issue with fetch operation', error));
