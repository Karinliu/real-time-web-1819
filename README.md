# Real-Time Web @cmda-minor-web · 2018-2019

### The assignment
The assignment is to build a meaningful real-time application. The application is to setup an open connection between the client and the server. This will enable to send data in real-time both ways, at the same time.

### Live server
See [here](https://karin-rtw.herokuapp.com/) the live version.

### My concept
My concept is to let a user search for a hashtag and to submit his own username. When they submit their hashtag and username the user will get an image. After the user got his/her own image, they come on a page with all other users with their own images. 

Every user can interact with each other by inviting each other to a room. When both users wants to join together, they both going to a private room. After joining the room, both their images willed be merged together. After the images are merged, both users can edit together the merged images and download it to their own computer.

### API
I choosed the [Tumblr](https://www.tumblr.com/docs/en/api/v2) API. 

##### Packages and other technologies I used
This project I used the following packages and technologies: <br>
• [Socket.io](https://socket.io/) <br>
• [Tumblr](https://www.npmjs.com/package/tumblr) <br>
• [NodeJS](https://nodejs.org/en/) <br>
• [Nodemon](https://nodemon.io/) <br>

##### Rate limit
The rate limit for the API is 1,000 requests per hour, and 5,000 requests per day.

#### Authorisation
Tumblr supports OAuth for authentication, which is written in the NodeJS code. Because my access token is filled in, every user who is coming on my website, will be using my access token to interact with other users. Also this token is used for fetching the data from the Tumblr Api.

```
credentials: {
        consumer_key: 'hFpTEAwAQYaQB9UwzOCQ6Y5iqKgvJVgJw7xeApG6NPTWXvJlun',
        consumer_secret: '07cC4ZW0TAa9jG0JOznTbEh06gNdduJxJiOZMklWXCgCbi36QN',
        token: 'TqcRICAHPRvavfXV2wK4SD5WsOGD9jtmmv1wJGPSvE3td5Av9a',
        token_secret: '1LYcWXijdS2cWl1kzxvcIzNL19T5c1fIpVZI02l0uLnvT3ZqNQ'
    }
```

##### The data what is coming from the api
The api gives you the following data:

```
Example app listening on port 1400!
{ type,
  blog_name,
  blog:
   { name,
     title,
     description,
     url,
     uuid,
     updated },
  id,
  original_size.url,
  post_url,
  slug,
  dat,
  timestamp,
  state,
  format,
  reblog_key,
  tags,
  short_url,
  summary,
  should_open_in_legacy,
  recommended_source,
  recommended_color,
  followed,
  liked,
  note_count,
  title,
  reblog,
  trail:
   [ { blog,
       post,
       content_raw,
       content,
       is_current_item,
       is_root_item 
       } ],
  can_like,
  can_reblog,
  can_send_in_message,
  can_reply,
  display_avatar 
}

```

The data what I am using for my application: <br>
• Hashtag <br>
• Type <br>
• The images <br>

### First sketch/main screen
![hashtag-02](https://user-images.githubusercontent.com/32538678/56769566-dca23100-67b1-11e9-801d-f0e56e18f577.png)


### Data life cycle
<details><summary>First version</summary>
<p>

```
![datalifecycle-01](https://user-images.githubusercontent.com/32538678/56769286-0eff5e80-67b1-11e9-99c0-103ef0e86d89.png)
```

</p>
</details>

<details><summary>Second version</summary>
<p>

```
![test-03](https://user-images.githubusercontent.com/32538678/58292661-6f8ab700-7dc2-11e9-96e8-7750c2001b03.png)

![test-04](https://user-images.githubusercontent.com/32538678/58292660-6ef22080-7dc2-11e9-93ad-e55af0479ada.png)

```

</p>
</details>



### How the application works

Here I will tell you how the application works.

###### First screen
The first screen what you will see as user: <br>
<img width="1280" alt="Screenshot 2019-05-24 01 26 59" src="https://user-images.githubusercontent.com/32538678/58292834-428ad400-7dc3-11e9-9649-47f4984be072.png">

The user can type in his own username and hashtag. With socket.emit the username and hashtag will be send to the server.

The usernames will be saved in an object and the hashtag will be used for getting an image.

*Get image with #hashtag*
The hashtag is sended to the server. And with the following function the data will be received from the API. <br>

```
function getData(value) {
    return client.taggedPosts(value)
        .then(function(data) {
            const photo = data
                .filter(item => item.type === "photo")
                .map(photo => {
                    return {
                        pic: photo.photos.map(picture => {
                            return picture.original_size.url
                        }),
                        tags: photo.tags
                    }
                })
            return photo
        })
        .catch(function(err) {
            // oops
        });
}
```

Because the API sends so much data back from the api, I will be using a filter and map to return the correct data from the api to the client. <br>
Namely: <br>
• Tags <br>
• Images <br>

When the correct data is received from the API, the data will be pushed and saved to an empty object where I will save this data.

```
socket.on('hashtag', function(data, callback) {
        const keyWord = data;

        getData(keyWord)
            .then(data => {
                const userObj = {
                    data: data[0],
                    datapic: data[0].pic,
                    datatag: data[0].tags,
                    socketId: socket.id,
                    nick: socket.nickname
                }
                usersObj.push(userObj)
                io.emit('all users', usersObj);
            })
    });
```

After the correct data is saved, this will be emited to the client.

###### Overview all users
When the user submitted their hashtag and username, they will see the following screen: <br>
<img width="1280" alt="Screenshot 2019-05-24 01 40 14" src="https://user-images.githubusercontent.com/32538678/58293240-f9d41a80-7dc4-11e9-8a4a-d1a897212e55.png">

When multiple users are on this page, they can ask you to join a room. <br>
<img width="1280" alt="Screenshot 2019-05-24 01 42 23" src="https://user-images.githubusercontent.com/32538678/58293288-2f790380-7dc5-11e9-9590-efcc37de3ddb.png">

Every user get his own id when they submit their username and hashtag. With their id, you can easily create a room with the following code:
```
    socket.on('make room', (id) => {
        socket.join(socket.id)
        usersObj = usersObj.map(user => {
            if (user.socketId === socket.id) {
                users = user
                users.room = socket.id
                return user
            }
            return user
        })

        io.sockets.connected[id].emit('join the room plz', socket.id)
```

When the user accepted the invite, they can join the created room with their id and will they received their unique roomname.


###### Joined room together
<img width="1280" alt="Screenshot 2019-05-24 01 50 32" src="https://user-images.githubusercontent.com/32538678/58293585-613e9a00-7dc6-11e9-86af-5111530b9e61.png">

After both users joined the room together. They can chat with each other.
```
form.addEventListener("submit", function(e) {
             e.preventDefault();

             const msg = document.querySelector('#m').value;
             socket.emit('chat message', {
                 msg: msg,
                 data: data
             });
             const typedword = document.querySelector('#m').value = "";
             return false;
         });


        socket.on('chat message', function(data) {
        const users = usersObj
            .filter(user => {
                return user.socketId === socket.id
            })
            .map(user => {
                return {
                    nick: user.nick
                }
            })
        io.to(data.data[0].room).emit('chat message', {
            msg: data.msg,
            nick: users[0].nick
        })         
```

Also is it possible to adding an filter over the images. When the filter is added, the other user will also see the changes.

```
socket.on('changed color', function(color){
        const updated = usersObj.map(user=>{
                if(user.socketId === socket.id) {
                    user = user
                    user.color = color
                    return user
                }else{
                    return user
                }
            })
        usersObj = updated

        const usersInRoom = usersObj.filter(user => {
            return user.socketId === socket.id
        })

        io.to(updated[0].room).emit('update mergedImages', {data: updated, color: color})

    })
```

The changes and chats from every user will be emit from the client side to the server side. Also the changes that are made will be pushed and saved in the created array where the data is saved from every user.

<img width="1280" alt="Screenshot 2019-05-24 01 51 59" src="https://user-images.githubusercontent.com/32538678/58293690-d4e0a700-7dc6-11e9-811c-06a0eb794296.png">

##### No rights
With my application I wanted to give the user the possibility to download the merged images and save it into a database. But the problem is that when the images are merged together in a canvas, the canvas is not allowed to export the images. Because of user rights.


### Installing
```
git clone https://github.com/Karinliu/real-time-web-1819.git

cd real-time-web-1819/app

npm install

npm run dev

```

Open: http://localhost:1400/


##### Sources
• [Fetch data from the API](https://github.com/tumblr/tumblr.js/) <br>
• [Combining images](https://stackoverflow.com/questions/7283065/canvas-combing-two-images-return-one-img-html-object) <br>
• [Socket.io](https://socket.io/) <br>
