 (function() {
     // console.log("log log")
     let contentWrap = document.getElementById("contentWrap");

     let nickForm = document.getElementById("nickForm");
     let nickError = document.getElementById("nickError");
     let nickBox = document.getElementById("nickName");
     let hashtagBox = document.getElementById("hashtagName");
     const socket = io();

     // var socket = io.connect('http://ip:port');

     nickForm.addEventListener("submit", function(e) {
         e.preventDefault();
         socket.emit('new user', nickBox.value, function(username) {
             if (username) {
                 nickWrap.classList.add('hidden');
                 allUsers.classList.remove('hidden');
             } else {
                 nickError.innerHTML = "Username is taken"
             }
         });
         nickBox.value = "";

         socket.emit('hashtag', hashtagBox.value)
     });

     const form = document.querySelector('.message');
     const inputValue = document.querySelector('#m');

     socket.on('usernames', function(username) {
         let html = 'Current users in chat:' + '<br/>';
         for (i = 0; i < username.length; i++) {
             html += '<p>' + "•" + username[i] + '<br>' + '</p>'
         }
         let users = document.getElementById("users");

         users.innerHTML = html;

         // console.log(users)
     });

     socket.on('chat message', function(data) {
         // console.log(data.msg);
         console.log(data);

         const li = document.createElement("li")
         const msgtext = document.createTextNode(data.msg);
         const msgname = document.createTextNode(data.nick);
         li.insertAdjacentHTML('beforeend', data.nick + ": " + data.msg)
         document.querySelector('#messages').appendChild(li);

     });

     socket.on('all users', function(data) {
         // console.log(data)
         let allImages = document.getElementById("allImages");
         allImages.innerHTML = ""
         data.forEach(item => {
             // console.log('Creating image')
             let article = document.createElement("article")
             let createImg = document.createElement("img")
             let createImgPara = document.createElement("p")
                 // createImg.classList.add("transparant")
             const imgtext = document.createTextNode(item.datapic);
             const imgtextPTag = document.createTextNode('User: '+ item.nick);
             createImg.src = item.datapic;
             createImg.id = 'id' + item.socketId

             createImgPara.appendChild(imgtextPTag)
             console.log(createImgPara)
             article.appendChild(createImg);
             article.appendChild(createImgPara);

             allImages.appendChild(article)
             const hashtagImg = document.querySelector(".transparant")

             let users = document.getElementById("users");


             // socket.emit('parsedImg', hashtagImg.src)

             const hashtagImages = document.querySelector('.myHashtagImg');
         })
         addEventForRoom()

         // console.log
     });

     function addEventForRoom() {
         const allImages = document.querySelectorAll("#allImages article img")
         allImages.forEach((img) => {
             img.addEventListener('click', createRoom)
         })
     }

     function createRoom() {
         socket.emit('make room', this.id.slice(2))
             // console.log(this)
     }

     socket.on('join the room plz', (id) => {
         // console.log('can you join the room', id)
         const newElement = `
        <div class='invite' id=${id}>
            <button>yes</button>
            <button>no</button>
        </div>
        `         
        console.log(document.querySelectorAll('.invite > .containerBtn button'))

         document.body.insertAdjacentHTML('beforeend', newElement)
         document.querySelectorAll('.invite button').forEach(button => {
             // console.log(button)
             button.addEventListener('click', acceptOrDeny)
         })
     })

     function acceptOrDeny() {
         console.log(this.textContent)
         if (this.textContent === 'yes') {
             // console.log('acccepted')
             socket.emit('accepted invite', this.parentElement.id)
         } else {
            const invite = document.querySelector('.invite')
            invite.parentNode.removeChild(invite);
             console.log('denied')
         }
     }

     socket.on('joined room', (data) => {

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


         // console.log("wat is joined room the data", data)

         allUsers.classList.add('hidden');
         contentWrap.classList.remove('hidden');


         //Sidebar
         data.forEach(element => {
             const groupRoomUsers = document.getElementById("usersRoom")
             const usersInChat = `<p>• ${element.nick} </p>`

             groupRoomUsers.insertAdjacentHTML('beforeend', usersInChat)
                 // console.log("are this", usersInChat)
         })



         let inviteContainer = document.querySelector('.invite');

         if (inviteContainer !== null) {
             // If class exist
             inviteContainer.classList.add('hidden');
             // console.log()
             mergeImages(data);
         } else {
             mergeImages(data)
         }
     })

     function mergeImages(data) {
         // console.log("mergerd")
         // console.log(data)

         const mySection = document.querySelector(".element1")
         let newNodeImg = document.createElement("img");
         const myImgText = document.createTextNode(data[0].datapic);
         newNodeImg.src = data[0].datapic

         // console.log(myImgText)

         mySection.appendChild(newNodeImg)


         const otherSection = document.querySelector(".element2")
         let newNodeImg2 = document.createElement("img");
         const myImgText2 = document.createTextNode(data[1].datapic);
         newNodeImg2.src = data[1].datapic

         // console.log(myImgText2)

         otherSection.appendChild(newNodeImg2);

         // Merge images to canvas
         const imageObj1 = new Image();
         const imageObj2 = new Image();
         let clone1 = newNodeImg.cloneNode(true);
         let clone2 = newNodeImg2.cloneNode(true);

         imageObj1.src = clone1.src
         imageObj2.src = clone2.src


         var canvas = document.getElementById('myCanvas');
         var context = canvas.getContext('2d');

         canvas.width = imageObj1.width;
         canvas.height = imageObj1.height;

         context.globalAlpha = 1.0;
         context.drawImage(imageObj1, 0, 0);
         context.globalAlpha = 0.5; //Remove if pngs have alpha
         context.drawImage(imageObj2, 0, 0);
     }


     const downloadbtn = document.querySelector('#downloadbtn')

     downloadbtn.addEventListener("click", report);

     async function report() {
         let screenshot = await makeScreenshot(); // png dataUrl
         let img = document.querySelector('#myCanvas');
         img.src = screenshot;

         let c = q(".bug-container");
         c.classList.remove('hide')

         let box = await getBox();
         c.classList.add('hide');

         send(screenshot, box); // sed post request  with bug image, region and description
         alert('To see POST requset with image go to: chrome console > network tab');
     }


     socket.on('delete images with this id', function(data) {
         // console.log(data)

         data.forEach(data => {
             // console.log('id'+data)

             // console.log(data)

             const overviewAllImages = document.querySelectorAll("#allImages article img");

             overviewAllImages.forEach((id) => {
                 // console.log("hoeveel goed?", id.id === data)
                 if (id.id === 'id' + data) {
                     // console.log('founded');
                     id.classList.add('isUsed')

                     // console.log(this)
                     // console.log(data)
                 } else {

                 }
             })
         })
     })

     // socket.on('all images', function(data) {
     //     let article = document.createElement("article")
     //     let img = document.getElementById("allImages");
     //     let image = document.createElement("img")
     //     image.classList.add("myHashtagImg")
     //     image.src = data.url

     //     article.appendChild(image)
     //     img.appendChild(article)

     //     const hashtagclass = document.querySelectorAll(".myHashtagImg")

     //     hashtagclass.forEach(item => {
     //         item.addEventListener('click', function() {
     //             // const room ="example"
     //             // socket.emit('room', room);

     //             let otherPerson = document.querySelector(".element2");
     //             let newNode = document.createElement("img");
     //             newNode.classList.add("hashtagImage")
     //             newNode.src = this.src

     //             const myPerson = document.querySelector(".element1")
     //             let myHashtagImg = document.querySelector(".transparant");
     //             let newNodeImg = document.createElement("img");
     //             newNodeImg.classList.add("hashtagImage");
     //             newNodeImg.src = myHashtagImg.src;


     //             otherPerson.appendChild(newNode);
     //             myPerson.appendChild(newNodeImg);

     //             console.log(this, "this is clicked")


     //            const users = []
     //            socket.emit('chatgroup', data.nick)

     //             // let usernames = 'Current users in chat:' + '<br/>';
     //             //     usernames += '<p>' + "•" + data.nick + '<br>' + '</p>'

     //             // let users = document.querySelector("#contentWrap #users");

     //             // users.innerHTML = usernames;
     //            console.log(data.nick, "joined this room")

     //                socket.emit('subscribe', 'conversation_id');

     //                socket.emit('send message', {
     //                    room: 'conversation_id',
     //                    message: "Some message"
     //                });

     //                socket.on('conversation private post', function(data) {
     //                    //display data.message
     //                });
     //         })
     //     })
     // })

     // socket.on('chat message', function() {});
     socket.on('user disconnected', function(data) {
         console.log(data.nick, "is gone")

         if (data === undefined) {
             console.log(data.nick, "Doe niks")
         } else {
             let messagesUser = document.querySelector('#users p');

             console.log(messagesUser)
             messagesUser.innerHTML = "";
             console.log(data.nick, "user is weg");
         }
     });
 }());