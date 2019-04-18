const express = require('express');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
var DomParser = require('dom-parser');
const app = express()
    .set('view engine', 'ejs')
    .set('views', 'view')
    .use(express.static('./src/css'))
    .use(express.static('./src/js'))
    .use(express.static('./src/images'))
    .get('/', index)

const port = 1400;

const tumblr = require('tumblr.js');
const client = tumblr.createClient({
    credentials: {
        consumer_key: 'hFpTEAwAQYaQB9UwzOCQ6Y5iqKgvJVgJw7xeApG6NPTWXvJlun',
        consumer_secret: '07cC4ZW0TAa9jG0JOznTbEh06gNdduJxJiOZMklWXCgCbi36QN',
        token: 'TqcRICAHPRvavfXV2wK4SD5WsOGD9jtmmv1wJGPSvE3td5Av9a',
        token_secret: '1LYcWXijdS2cWl1kzxvcIzNL19T5c1fIpVZI02l0uLnvT3ZqNQ'
    },
    returnPromises: true,

});


// Make the request
client.userInfo(function(err, data) {
    // console.log(data)
    data.user.blogs.forEach(function(blog) {
        // console.log(blog.name);
    });
});


// client.blogPosts('staff')
//   .then(function(resp) {

//   	console.log(resp.posts)
//     resp.posts;
//   })
//   .catch(function(err) {
//     // oops
//   });

// client.blogPosts('mochi', {type: 'photo', tag: ['cute']}, function(err, resp) {
// 	console.log(resp.posts)
//   resp.posts; // use them for something
// });




      // client.taggedPosts('blue',  function(err, data) {
    //     console.log(data)
    //     for (let i = 0; i < data.length; ++i) {
    //         const post = data[i];

    //         if (post.type === 'photo') {
    //             // console.log(post.blog.name, post.id, post.tags.join(', '));
    //             post.image_permalink
    //             console.log(post.image_permalink);
    //         }
    //     }
    // });
// getData('')

function getImage(url){

    fetch("https://tumbler-of-cats.tumblr.com/image/184278406533")
  .then(response => response.text())
  .then(text => {
    const parser = new DomParser();
    const htmlDocument = parser.parseFromString(text, "text/html");
    // document.querySelector("div").appendChild(section);

    // console.log(htmlDocument)
    // console.log(section)
  })
    // fetch('https://tumbler-of-cats.tumblr.com/image/184278406533')
    // .then(function(response) {
    //     // When the page is loaded convert it to text
    //     return response.text()
    // })
    // .then(function(html) {
    //     // Initialize the DOM parser
    //     const parser = new DomParser();

    //     const htmlDocument = parser.parseFromString(html, "text/html");
    //     const section = htmlDocument.documentElement.querySelector("section");
    //     // document.querySelector("div").appendChild(section);
    //     console.log(htmlDocument);
    //     console.log(section);
    // })
    // .catch(function(err) {  
    //     console.log('Failed to fetch page: ', err);  
    // });

// async function getImage(url){
//     const browser = await puppeteer.launch({devtools: true});
//     const page = await browser.newPage();
//     await page.goto('https://tumbler-of-cats.tumblr.com/image/184278406533');

//     await page.click('.yes')
//     await page.waitForNavigation({ waitUntil: 'networkidle0' })
//     await page.waitFor(3000)
//     const image = await page.evaluate(()=>{return document.querySelector('body')})
//     console.log(image)
//     // try {
//     //     // const shizzle = await page.evaluate((test) => {
//     //     //     console.log(test);
//     //     //     const image = document.querySelector('body');
//     //     //     console.log(image)
//     //     //     return image
//     //     // })
//     //     // console.log(shizzle)
//     //     const data = await fetch('http://cutecornflakes.tumblr.com/image/184269993801');
//     //     console.log(JSON.parse(data));
//     // } catch (err) {
//     //     err
//     // }

//  // await browser.close();

}
getImage()

function getData(value){
    return client.taggedPosts(value)
          .then(function(data) {
            // console.log(data[0])

            const photo = data
                .filter(item => item.type ==="photo")
                .map(photo => {return {
                    photo: photo.photos
                    .map(ding =>
                        console.log("wat is", ding))
                    // photo: photo.image_permalink,
                //     tags: photo.tags
                }})
            console.log(photo)
            return data
          })
          .catch(function(err) {
            // oops
          });
}

function index(req, res, data) {
    // res.sendFile(__dirname + '/view/pages/index.html');
    // client.taggedPosts('blue')
    //       .then(function(data) {
    //         for (let i = 0; i < data.length; ++i) {
    //                 const post = data[i];

    //                 if (post.type === 'photo') {
    //                     // console.log(post.blog.name, post.id, post.tags.join(', '));
    //                     post.image_permalink
    //                     console.log(post.image_permalink);
    //                 }
    //                 console.log("Data is " + post.image_permalink)
    //             }
    //             console.log("wejo data is" + data)
    //             res.render('/pages/index', {data: data});
    //       })
    //       .catch(function(err) {
    //         // oops
    //       });
    getData('cats')
        .then(data=>{
            // console.log(data[0])
            res.render('pages/index',{data: data})
        })
    // res.render(' /pages/index')
    
}




app.listen(1400, () => console.log(`Example app listening on port ${port}!`))