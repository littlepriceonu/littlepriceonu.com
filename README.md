# 👽 [My Personal Site!](https://littlepriceonu.com) (V2)

My Personal Site, Hosted Using Amazon Web Services EC2
Made Using Tailwind & Typescript

## 💾 Hosting 

Heres the steps for hosting this site, if you'd like to know!

* Go to [AWS](https://aws.amazon.com)
* Register, obviously
* Search for [EC2](https://aws.amazon.com/pm/ec2/) and make an instance
* Select your OS as Amazon Linux
* Set up your security groups and make a private key for the server
* SSH into the server and clone this repo
* Run `npm install`
* Setup [Nginx](https://awstip.com/installing-nginx-web-server-on-an-aws-ec2-7727811dacec) with the config in the repo
* Finally, Run `node index.js`!
  
* If you wish, you can use certbot and set it up with nginx to have an SSL connection! 

## 💭 Extras

Heres a few fun facts and such about my site

### 🎶 Music Card
The music card on my site pulls directly from my [last.fm profile](https://www.last.fm/user/littlepriceonu/library) using the last.fm API!
The color of the text in the music title is the most vibrant color pulled from the album image, using `node-vibrant`

### 🏷️ Discord Status
The status in the corner of my profile picture is pulled directly from my discord status using [Lanyard](https://lanyard.eggsy.xyz)! (huge shoutout to lanyard btw)
