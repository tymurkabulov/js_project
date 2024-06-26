    let urlPost = new URLSearchParams(window.location.search);
    let postId = urlPost.get('id');
    let error = document.createElement('h1');

    error.textContent = 'Check if user`s ID is correct';
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok){
                document.body.appendChild(error);
                throw new Error('Network was not ok')

            }
            return response.json();
        })
        .then(post => {
            let postCard = document.createElement('div');
            let postInfo = document.createElement('p');

            postInfo.style.border = '2px solid black';

            postInfo.style.backgroundColor = '#f0f0f0';
            postInfo.style.padding = '10px';
            postInfo.style.marginBottom = '20px';
            postInfo.style.fontSize = '20px';

            postInfo.innerHTML = `
                Post ID: #${post.id}<br>
                User ID: #${post.userId}<br>
                Title: ${post.title}<br>
                Post: ${post.body}<br>
            `;



            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then(response => {
                    if (!response.ok){
                        document.body.appendChild(error);
                        throw new Error('Network was not ok');
                    }
                    return response.json();
                })
                .then(comments => {

                    comments.forEach(comment => {
                        let commentCard = document.createElement('div');
                        let commentsInfo = document.createElement('p');

                        commentsInfo.style.backgroundColor = 'wheat';
                        commentsInfo.style.padding = '10px';
                        commentsInfo.style.marginBottom = '20px';
                        commentsInfo.style.fontSize = '20px';
                        commentsInfo.style.border = '2px solid black';


                        commentsInfo.innerHTML = `
                            
                            Comment ID: #${comment.id}<br>
                            Name: ${comment.name}<br>
                            Email: ${comment.email}<br>
                            Comment: ${comment.body}<br>
                        `;
                        commentCard.appendChild(commentsInfo);
                        postCard.appendChild(commentCard);
                    });
                });
                postCard.appendChild(postInfo);
                document.body.appendChild(postCard);
        });
