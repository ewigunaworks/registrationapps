'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')
Route.get('login', 'UserController.getLogin')
Route.post('login', 'UserController.postLogin')

Route.group(() => {
	Route.get('home', 'HomeController.index')

	Route.get('error/404', 'ErrorController.index')
	
	Route.post('users/delete', 'UserController.delete')
	Route.resource('users', 'UserController')
})