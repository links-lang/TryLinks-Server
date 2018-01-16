module.exports.startingLinksSources = [
  `fun mainPage (_) {
    page 
      <html>
      <body>
      <h1>Hello world!</h1>
      </body>
      </html>
  }
  
  fun main () {
    addRoute("",mainPage);
    servePages()
  }
  
  main()`,
  `fun handleForm(s,i) {
    page 
      <html>
        <body>
        <p>The string was: {stringToXml(s)}</p>
        <p>The integer was: {intToXml(i)}</p>
        </body>
      </html>
  }
  
  fun mainPage (_) {
    page 
      <html>
      <body>
        <h1>Example form</h1>
        <form l:action="{handleForm(s,stringToInt(i))}">
          A string: <input l:name="s" value="foo"/>
          An integer: <input l:name="i" value="42"/>
          <button type="submit">Submit!</button>
        </form>
        </body>
      </html>
  }
  
  
  fun main () {
    addRoute("",mainPage);
    servePages()
  }
  
  main()`,
  `fun handleForm(s,i) {
    replaceNode(<div id="result">
        <p>The string was: {stringToXml(s)}</p>
        <p>The integer was: {intToXml(i)}</p>
        </div>,
        getNodeById("result"))
  }
  
  fun mainPage (_) {
    page 
      <html>
      <body>
        <h1>Example form, take 2</h1>
        <form l:onsubmit="{handleForm(s,stringToInt(i))}">
          A string: <input l:name="s" value="foo"/>
          An integer: <input l:name="i" value="42"/>
          <button type="submit">Submit!</button>
        </form>
        <div id="result" />
        </body>
      </html>
  }
  
  
  fun main () {
    addRoute("",mainPage);
    servePages()
  }
  
  main()`,
  `fun remove(item, items) {
    switch (items) {
       case []    -> []
       case x::xs -> if (item == x) xs
                     else x::remove(item, xs)
    }
  }
  
  
  fun todo(items) {
     <html>
      <body>
       <form l:onsubmit="{replaceDocument(todo(item::items))}">
         <input l:name="item"/>
         <button type="submit">Add item</button>
       </form>
       <table>
        {for (item <- items)
          <tr><td>{stringToXml(item)}</td>
              <td><form l:onsubmit="{replaceDocument(todo(remove(item,items)))}">
                   <button type="submit">Completed</button>
                  </form>
              </td>
          </tr>}
        </table>
       </body>
     </html>
  }
  
  fun mainPage(_) {
    page
     <#>{todo(["add items to todo list"])}</#>
  }
  
  fun main () {
   addRoute("",mainPage);
   servePages()
  }
  
  main()`,
  `fun request(s) {
    <html>
     <body>
      <h1>Please type a number</h1>
       <form l:onsubmit="{response(t)}" l:onkeyup="{replaceDocument(request(t))}">
        <input type="text" value="{s}" l:name="t"/>
        {
        if (s =~ /^[0-9]+/)
         <input type="submit"/>
        else
         <input type="submit" disabled="disabled"/>
        }
       </form>
      </body>
    </html>
  }
  
  fun response(s) client {
   var n = stringToInt(s);
  
   replaceDocument(
    <html>
     <body>
      <h1>Factorials up to {intToXml(n)}</h1>
      <table><tbody>{
       for ((i=i,f=f) <- lookupFactorials(n))
        <tr>
         <td>{intToXml(i)}</td>
         <td>{stringToXml(f)}</td>
        </tr>
      }</tbody></table>
     </body>
    </html>
   )
  }
  
  fun lookupFactorials(n) server {
   var db = database "links";
   var factorials = table "factorials" with (i : Int, f : String) from db;
  
   query {
     for (row <-- factorials)
      where (row.i <= n)
      orderby (row.i)
       [(i=row.i, f=row.f)]
   }
  }
  
  fun main() {
    addRoute("", fun (_) { 
      page
        <#>{request("")}</#>
    });
    servePages()
  }
  
  main()`,
  `var db = database "links";
  var items = table "todo" with (name : String) from db;
  
  fun showList() server {
   page
    <html>
     <body>
      <form l:action="{add(item)}" method="POST">
        <input l:name="item"/>
        <button type="submit">Add item</button>
      </form>
      <table>
       {for (item <- query {for (item <-- items) [item]})
          <tr><td>{stringToXml(item.name)}</td>
              <td><form l:action="{remove(item.name)}" method="POST">
                   <button type="submit">Done</button>
                  </form>
              </td>
          </tr>}
       </table>
      </body>
    </html>
  }
  
  fun add(name) server {
   insert items values [(name=name)];
   showList()
  }
  
  fun remove(name) server {
   delete (r <-- items) where (r.name == name);
   showList()
  }
  
  fun mainPage (_) {
    showList()
  }
  
  fun main() {
    addRoute("",mainPage);
    servePages()
  }
  
  main()`
]
