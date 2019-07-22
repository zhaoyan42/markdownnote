在绑定input对象的时候，最好用ng-value，而不是ng-model或者value={{xxx}}，后两者在hidden类型的时候会导致客户端验证通不过（据说后台也会接收不到？）参考：
http://stackoverflow.com/questions/18446359/angularjs-does-not-send-hidden-field-value

----------
For a specific use case I have to submit a single form the "old way". Means, I use a form with action="". The response is streamed, so I am not reloading the page. I am completely aware that a typical AngularJS app would not submit a form that way, but so far I have no other choice.

That said, i tried to populate some hidden fields from Angular:

    <input type="hidden" name="someData" ng-model="data" /> {{data}}
Please note, the correct value in data is shown.

The form looks like a standard form:

    <form id="aaa" name="aaa" action="/reports/aaa.html" method="post">
    ...
    <input type="submit" value="Export" />
    </form>
If i hit submit, no value is sent to the server. If I change the input field to type "text" it works as expected. My assumption is the hidden field is not really populated, while the text field actually is shown due two-way-binding.

Any ideas how I can submit a hidden field populated by AngularJS?


----------
You cannot use double binding with hidden field. The solution is to use brackets :

    <input type="hidden" name="someData" value="{{data}}" /> {{data}}
EDIT : See this thread on github : https://github.com/angular/angular.js/pull/2574

EDIT:

Since Angular 1.2, you can use 'ng-value' directive to bind an expression to the value attribute of input. This directive should be used with input radio or checkbox but works well with hidden input.

Here is the solution using ng-value:

    <input type="hidden" name="someData" ng-value="data" />