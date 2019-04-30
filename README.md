Ever wish that there was a *really* simple way to generate a static site without all of the extra confusing"stuff"?

Statica allows you to build a static web site using plain ol' HTML files _but_ write your main content using markdown!

# Install

`npm install statica`

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

After generating the site, the compiled layout will be:

- articles
   - article1.html
- assets
   - js
      - jsfile.js
- index.html
- about.html


