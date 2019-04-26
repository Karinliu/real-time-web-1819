# Real-Time Web @cmda-minor-web · 2018-2019

### The assignment
The assignment is to build a meaningful real-time application. The application is to setup an open connection between the client and the server. This will enable to send data in real-time both ways, at the same time.

### Live server
https://karin-rtw.herokuapp.com/

### My concept
My concept is to let a user search for a hashtag. From these search results a random image will be displayed.

When user 1 asked user 2  searched for a hashtag and asked each other to join a chatroom, both the images will be merged together. 

After the images are merged, both users can download the merged images.

### API
First I wanted to use the instagram api. but the disadvantage of using this api was that I could only retrieve the data from my own account 

Then I made the choice to use a Tumblr API. 

##### Rate limit
The rate limit for the API is 1,000 requests per hour, and 5,000 requests per day.


#### Authorisation
Tumblr supports OAuth for authentication.

### Main screen
![hashtag-02](https://user-images.githubusercontent.com/32538678/56769566-dca23100-67b1-11e9-801d-f0e56e18f577.png)


### Data life cycle
![datalifecycle-01](https://user-images.githubusercontent.com/32538678/56769286-0eff5e80-67b1-11e9-99c0-103ef0e86d89.png)


### Real time events
The real time events what is happening are:
• User can submit his own hashtag and the api send the image back to the user.
• User can create an account.
• When user is logout, it will be real time updated.

### Buggs
• Images can be merged but the user self does not know that :(
• Images can not be downloaded.


##### Sources
• [Fetch data from the API](https://github.com/tumblr/tumblr.js/) <br>
• [Combining images](https://stackoverflow.com/questions/7283065/canvas-combing-two-images-return-one-img-html-object) <br>
• [Socket.io](https://socket.io/) <br>
