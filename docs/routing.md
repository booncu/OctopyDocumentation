---
id: routing
title: Routing
sidebar_label: Routing
---

## Basic Routing

The most basic Octopy routes accept a URI and a `Closure`, providing a very simple and expressive method of defining routes:

```php
$this->get('foo', function () {
    return 'Hello World';
});
```

#### The Default Route Files

All Octopy routes are defined in your route files, which are located in the `app/Route` directory. These files are automatically loaded by the framework. The `app/Route/Web.php` file defines routes that are for your web interface. These routes are assigned the middleware, which provides features like session state and CSRF protection. The routes in `app/Route/Api.php` are stateless and are assigned the `api` middleware group.

For most applications, you will begin by defining routes in your `app/Route/Web.php` file. The routes defined in `app/Route/Web.php` may be accessed by entering the defined route's URL in your browser. For example, you may access the following route by navigating to `http://your-app.test/user` in your browser:

```php
$this->get('user', 'UserController@index');
```

Routes defined in the `app/Route/Api.php` file are nested within a route group by the `RouteServiceProvider`. Within this group, the `api` URI prefix is automatically applied so you do not need to manually apply it to every route in the file. You may modify the prefix and other route group options by modifying your `RouteServiceProvider` class.

#### Available Router Methods

The router allows you to register routes that respond to any HTTP verb:

```php
$this->get($uri, $callback);
$this->post($uri, $callback);
```

Sometimes you may need to register a route that responds to multiple HTTP verbs. You may even register a route that responds to all HTTP verbs using the `any` method:

```php
$this->any('foo', function () {
    //
});
```

#### CSRF Protection

Any HTML forms pointing to `POST` routes that are defined in the `Web` routes file should include a CSRF token field. Otherwise, the request will be rejected. You can read more about CSRF protection in the [CSRF documentation](/docs/csrfprotection):

```html
<form method="POST" action="/profile">
    @csrf
    ...
</form>
```

## Route Parameters

### Required Parameters

Sometimes you will need to capture segments of the URI within your route. For example, you may need to capture a user's ID from the URL. You may do so by defining route parameters:

```php
$this->get('user/:id', function ($id) {
    return 'User ' . $id;
});
```

You may define as many route parameters as required by your route:

```php
$this->get('posts/:post/comments/:comment', function ($postId, $commentId) {
    //
});
```

Route parameters are always always starts with `:` and should consist of alphabetic characters, and may not contain a `-` character. Instead of using the `-` character, use an underscore (`_`). Route parameters are injected into route callbacks / controllers based on their order - the names of the callback / controller arguments do not matter.

### Optional Parameters

Occasionally you may need to specify a route parameter, but make the presence of that route parameter optional. You may do so by placing a `?` mark after the parameter name. Make sure to give the route's corresponding variable a default value:

```php
$this->get('user/:name?', function ($name = null) {
    return $name;
});

$this->get('user/:name?', function ($name = 'John Doe') {
    return $name;
});

$this->get('user/:name?', function ($name) {
    return $name;
})->parameter(['name' => 'John Doe']);
```

## Named Routes

Named routes allow the convenient generation of URLs or redirects for specific routes. You may specify a name for a route by chaining the `name` method onto the route definition:

```php
$this->get('user/profile', function () {
    //
})->name('profile');
```

You may also specify route names for controller actions:

```php
$this->get('user/profile', 'UserProfileController@show')->name('profile');
```

#### Generating URLs To Named Routes

Once you have assigned a name to a given route, you may use the route's name when generating URLs or redirects via the global `route` function:

```php
// Generating URLs...
$url = route('profile');

// Generating Redirects...
$this->get('settings', function (Octopy\HTTP\Response $response) {
    return $response->redirect()->route('profile');
});
```

If the named route defines parameters, you may pass the parameters as the second argument to the `route` function. The given parameters will automatically be inserted into the URL in their correct positions:

```php
// Single Parameter...
$this->get('user/:id/profile', function ($id) {
    //
})->name('profile');

$url = route('profile', ['id' => 1]);
```
## Route Groups

Route groups allow you to share route attributes, such as middleware or namespaces, across a large number of routes without needing to define those attributes on each individual route. Shared attributes are specified in an array format as the first parameter to the `$this->group` method.

Nested groups attempt to intelligently "merge" attributes with their parent group. Middleware and `where` conditions are merged while names, namespaces, and prefixes are appended. Namespace delimiters and slashes in URI prefixes are automatically added where appropriate.

### Middleware

To assign middleware to all routes within a group, you may use the `middleware` method before defining the group. Middleware are executed in the order they are listed in the array:

```php
$this->middleware(['first', 'second'])->group(function () {
    $this->get('/', function () {
        // Uses first & second Middleware
    });

    $this->get('user/profile', function () {
        // Uses first, second & third Middleware
    })->middleware('third');
});
```

### Namespaces

Another common use-case for route groups is assigning the same PHP namespace to a group of controllers using the `namespace` method:

```php
$this->namespace('Admin', function () {
    // Controllers Within The "App\HTTP\Controller\Admin" Namespace
});
```

Remember, by default, the `RouteServiceProvider` includes your route files within a namespace group, allowing you to register controller routes without specifying the full `App\HTTP\Controller` namespace prefix. So, you only need to specify the portion of the namespace that comes after the base `App\HTTP\Controller` namespace.

### Route Prefixes

The `prefix` method may be used to prefix each route in the group with a given URI. For example, you may want to prefix all route URIs within the group with `admin`:

```php
$this->prefix('admin', function () {
    $this->get('users', function () {
        // Matches The "/admin/users" URL
    });
});
```

## Route Binding

Octopy automatically resolves any class defined in routes or controller actions whose type-hinted variable names match a route segment name. For example:

```php
$this->post('api/users', function (Octopy\HTTP\Request $request) {
    return $request->email;
});
```