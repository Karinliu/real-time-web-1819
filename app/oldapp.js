// const Unsplash = require('unsplash-js').default;
// const express = require('express');
// const puppeteer = require('puppeteer');
// const fetch = require('node-fetch');
// const app = express()
//     .set('view engine', 'ejs')
//     .set('views', 'view')
//     .use(express.static('./src/css'))
//     .use(express.static('./src/js'))
//     .use(express.static('./src/images'))
//     .get('/', index)

// const port = 1400;
 
// const unsplash = new Unsplash({
//   applicationId: "1d8b68a16a721465840ebcc7850e052ce3876955e6f9151980ad1481a0fc56f7",
//   secret: "27375a0d54efcff0f8b7cbcfe185721c646fafba004ae692c4f55ab27e78d746"
// });

// const authenticationUrl = unsplash.auth.getAuthenticationUrl([
//   "public",
//   "read_user",
//   "write_user",
//   "read_photos",
//   "write_photos"
// ]);


// const client_id ="1d8b68a16a721465840ebcc7850e052ce3876955e6f9151980ad1481a0fc56f7"
// const query = 'woods';

// function makeCall(){

//   fetch(`https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}`,{method:'get'}).
// 		then(res=>res.json())
// 		.then(res=>console.log("boommer",res))
// 		.catch(res=>console.log("error",res))

// 		}
// makeCall();


// function index(req, res, data) {
// 	location.assign(authenticationUrl);
//     res.render('./pages/index')
// }



// app.listen(1400, () => console.log(`Example app listening on port ${port}!`))