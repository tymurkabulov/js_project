
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network was not ok')
        }
        return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach(user => {
                let userCard = document.createElement('div');
                let userName = document.createElement('p');
                let userButton = document.createElement('button');

                userName.textContent = 'ID ' + user.id + '. ' + user.name;
                userButton.innerHTML = `<a href="user-details.html?id=${user.id}" style="text-decoration:none; color: white">More info</a>`;

                userCard.style.backgroundColor = '#f0f0f0';
                userCard.style.padding = '20px';
                userCard.style.marginBottom = '20px';
                userCard.style.fontSize = '20px';

                userButton.style.backgroundColor = '#007bff';
                userButton.style.border = 'none';
                userButton.style.fontSize = '20px';
                userButton.style.padding = '10px';
                userButton.style.borderRadius = '10%';




                userCard.appendChild(userName);
                userCard.appendChild(userButton);
                document.body.appendChild(userCard);

            })

        })
        .catch(error => {
            console.log('Issue with fetch operation', error);
        });
