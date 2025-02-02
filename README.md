# IonJS
IonJS is a backend framework (like NextJS). But unlike NextJS IonJS is designed to be lightweight. It does this by prioritizing HTML over JS. IonJS aims to simplify development without making the ```node_modules``` folder huge and without shipping over a MB to the browser. It's recommended to pair IonJS with frontend JS and CSS libraries.

# Why?
There is several reasons why it's important to favor HTML over JS, despite what's popular at the moment. HTML lasts longer. If you wrote a site in plain HTML, and don't touch it for five years, you could load up the site and it work just fine. Where as if you had used a typical JS framework, it's very likely your site would not work anymore. At the very least it'd be very difficult to get it to run. Second it's very fast. Why? Well it doesn't ship tons of code to the browser, only the code you write.

# About IonJS
IonJS provides two elements, `comp` and `import`. `comp` include HTML code inside of your main page, while `import` is for CSS and JS. It can also strip uneeded code from your files, making your site slim and fast.

## How to use ```comp```
```html
<comp>header.html</comp>
<h1>Headline</h1>
```
   
When this code is built (which takes about 40ms on my machine) it will include the content of ```header.html``` inside of index.html giving you one file to ship to the user.
 
## How to use ```import```
```html
<import>library.css;p,button</import>
<button>Play</button>
```
This code will import the CSS styles for ```p``` and ```button```

# Features That May Come Someday
* Filesytem watcher that provide automatic updates (pretty likely)
* A better way to detect used styles and function from files (only happening if I can figure out how to do that)
