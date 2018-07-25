module.exports.startingLinksTitles = [
  'Hello, world!',
  'Simple forms',
  'Client-side forms',
  'Client-side TODO list',
  'Factorial: \nQuerying tables',
  'Database TODO list'
]

module.exports.startingLinksDescription = [
  `## Lesson 1 Hello World
  
#### You can navigate to other tutorials by click the menu icon on the upper left corner.

### Goal: make a web page that says "Hello World!".

Let's start with the simplest possible program: one that just prints "Hello, world" (albeit on a Web page). The starter code will not work right away, but you can fix it real quick!

This is a tiny bit more complicated than you might expect. Let's go through the main components of the program:

The \`mainPage\` function defines what to do to render the main page of the program. The keyword fun starts a function definition, and we write \`(_)\` to indicate that there is one argument but that we don't care about its value. (The underscore \`_\` is a wildcard that can be used as a variable if we don't care about the variable's value.) The body of the function is enclosed in curly braces.

The body of the function defines the return value. In Links, the body of a function is evaluated to a value, which is returned. In this case, the return value is a *page*, defined using the \`page\` keyword. Pages can be defined using XML literals; for example, here we write \`<html>\` and \`<body>\` tags, then the appropriate closing tags. The difference between a \`page\` and an \`XML\` value is that a page has additional structure needed for Links to render the page as the result of a web request (for example to handle any forms embedded in the page).

The \`main\` function calls \`addRoute\` to install the \`mainPage\` handler as the default response to any HTTP request, and \`startServer()\` starts the Links web server.

If you run the program now, it would show an empty page. Change the \`page\` returned by \`mainPage\` to include a \`<h1>\` tag that has the text "Hello World!". Once you have done that. Click the "Compile" button and see the result!

If you don't see the page and got some errors, double check you have your tags properly closed.

### Exercises
 
1. Change the program by modifying the content of the HTML body, or adding content (such as a page title) under the \`<head>\` tag. Does this work? What happens if you add HTML with unbalanced tags, e.g. \`<p> test <b> bold </p>\`?

2. In Links, there is a difference between a \`page\` (which is a legitimate response to an HTTP request) and plain XML. What happens if you omit the keyword \`page\` from \`mainPage\`?

3. If you are familiar with CSS or JavaScript, what happens if you include a \`<style>\` or \`<script>\` tag in the page content?

#### You can find the solution to this tutorial here 

<https://github.com/links-lang/links-tutorial/wiki/Lesson-1%3A-Hello%2C-world%21>`,
  `## Lesson 2: Simple Forms

#### You can navigate to other tutorials by click the menu icon on the upper left corner.

### Goal: make a web form that takes a string and an integer. When the form submits you should be able to see the values you inputted.

This tutorial illustrates how to create a form in Links and how to handle form submission. There are several ways to do this in Links:

 * HTML forms with submission handled by POSTing the form response to the server
 * HTML forms with submission handled by client-side (JavaScript) code
 * formlets, a higher-level abstraction for forms that allows for validation

This lesson is about the first approach, which is simplest and probably most familiar from other HTML or web programming settings. The form is defined in the \`mainPage\` function. This function creates a page that contains a submittable form. This is done largely as in ordinary HTML using the \`<form>\` tag to delimit the form, \`<input>\` tags to describe the form inputs, and the \`<button>\` tag to define a submission button.  

There are also some important differences. In Links, there are special attributes that should be used with forms, so that Links can recognize and bind input values to Links variables, and likewise to give Links code that should be executed when the form is submitted. Take a look at the \`<form>\` tag and its children on the right.

The \`<input>\` tags includes an attribute \`l:name\` which is given value \`s\` in the string field and \`i\` in the integer field. Using this attribute means that when the form is submitted, Links will bind the value in the string field to \`s\` and bind the value of the integer field to 'i'. (The values are considered as strings in either case, since they are provided in a text field. For HTML forms, Links does not perform any validation.) The \`value\` attribute is just as in plain HTML: it gives the initial value of the field.

The \`<form>\` tag includes an attribute \`l:action\` whose value is a piece of Links code to be called when the form is submitted. The code is enclosed in \`{}\` braces in order to ensure Links parses it as Links code rather than as a string literal. Because the \`l:action\` field is used, the Links code is expected to return a page. (Unfortunately, the error message you get if this is wrong is quite opaque.)

Right now \`l:action\` is not wired to anything, and if you run it, you are going to see a weird error message. Try to make it call the function \`handleForm\` that constructs the page resulting from submitting the form. Remember you need to include the Links code in \`{}\`. Be sure to include the variables \`s\` and \`i\` introduced in the form using \`l:name\` as parameters. Since they are both strings, we need to convert the integer parameter to an actual integer (this will fail if the submitted string doesn't parse to an integer).

The \`handleForm\` function simply constructs a new page that shows the submitted string and integer values. Both need to be coerced to XML strings using \`stringToXml\` or \`intToXml\`.

### Exercises

1. What happens if you leave off the \`l:\` prefix of the \`name\` attribute? Is the error message you get enlightening?

2. What happens if you leave off the \`l:\` prefix of the \`action\` attribute? Is the error message you get enlightening?

3. What happens if you leave off the curly braces in the \`l:action\` attribute value \`"{handleForm(s,stringToInt(i))}"\`?

4. What happens if you return something other than a page from the \`l:action\` attribute value? For example, change to \`{(s,i)}\`?

5. Experiment with including other standard HTML form elements such as \`textarea\`, \`radio\`, \`checkbox\`.

#### You can find the solution to this tutorial here

https://github.com/links-lang/links-tutorial/wiki/Lesson-2:-Simple-forms`
]
