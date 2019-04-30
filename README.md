Ever wish you could simply write some markdown files and convert them into web pages for your no-fuss static site?

Introducing Statica - a dead simple zero config static site builder for people who don't need all that fancy "stuff". 

It's perfect for static sites when you simply want to write content in markdown and easily convert them to web pages!

# Install

`npm install -g statica`

# Usage

## Create The Template File

First, you need a template that represents the "outer shell" of your HTML site.

Create a file `_template.html` in the root of your site's folder.

Next, just put whatever HTML you want into it!

## Injecting Content

Specify where content will be injected (from your markdown files) by adding the following to your template file:

`<!--@Content()-->`

The outer HTML might look like:

```html
<body>
    <h1>This is my header</h1>
    <!--@Content()-->
    <footer>
        This is my footer
    </footer>
</body>
```

## Writing Content

Write your markdown files (with an extension `.md`) anywhere you like. When compiled, each markdown file will be converted into an HTML file.

All other non-markdown files (HTML, JS, CSS, images, etc.) will be copied into `./www` for you too.

For example, your site layout might look like:

- articles
   - article1.md
- assets
   - js
      - jsfile.js
- index.html
- about.md
- _template.html

After generating the site, the compiled layout will be (inside `./www`):

- articles
   - article1.html
- assets
   - js
      - jsfile.js
- index.html
- about.html


