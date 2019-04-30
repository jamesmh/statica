Ever wish that there was a *really* simple way to generate a static site without all of the extra "stuff" that comes with most of these tools?

Statica allows you to build a static web site, like you normally would with HTML files - _but_ write your main content using markdown!

# Install

`npm install statica`

# Usage

## Create The Template File

Like all static site generators, you need a template that represents the "outer shell" of your HTML site.

First, create a file `_template.html` in the root of your site's folder.

Next, just put whatever HTML you want in your template file!

## Choose Where To Inject Content

Specify where content will be injected by adding the following to the appropriate spot in your template file:

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

To write content and have pages generated for you, simply create markdown files with an extension `.md` anywhere you like. Each markdown file is converted into an HTML for your site.

Excluding any markdown files (which are converted to HTML files) and `_template.html`, all files in your site will be copied into `./www`.

For example, your site layout might look like:

- articles
   - article1.md
   - article2.md
- assets
   - img
      - img1.jpg
   - js
      - jsfile.js
- index.html
- about.md
- _template.html

After generating the site, the compiled layout will be:

- articles
   - article1.html
   - article2.html
- assets
   - img
      - img1.jpg
   - js
      - jsfile.js
- index.html
- about.html


