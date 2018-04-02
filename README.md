# TryLinks Server

TryLinks server repository.

Live at [here](http://devpractical.com:5000/web).

Powered by [Express](https://expressjs.com/), [Socket.IO](https://socket.io/), and more.

## Usage

First clone this repository using

~~~bash
git clone https://github.com/NickWu007/TryLinks-Server.git
~~~

Then build the relevant node modules

~~~bash
npm install
~~~

You will also need to supply a `secret.js` at the root, as the base of encryption. A template of this file looks like this:

~~~javascript
module.exports = {
  secret: 'YOUR_OWN_SECRET'
}
~~~

After that, the server can be started by using

~~~bash
npm start
~~~
    
## Notes to Contributors

### Fork TryLinks server

If you'd like to contribute back to the core, you can [fork this repository](https://help.github.com/articles/fork-a-repo) and send us a pull request, when it is ready.

If you are new to Git or GitHub, please read [this guide](https://help.github.com/) first.
