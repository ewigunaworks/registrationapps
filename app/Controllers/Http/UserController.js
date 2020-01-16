'use strict'

const User = use('App/Models/User');
const { validate, validateAll } = use('Validator')
const moment = require('moment');
class UserController {
	async index({request, response, view}){
	    return view.render('welcome')
	}

	async getLogin({request, response, view}) {
		return view.render('login')
	}

	async create({request, response, view}){
	    return view.render('create')
	}

	async store({request, response, view, session}){
	    let { mobile_number, firstname, lastname, year, month, day, gender, email } = request.only([ 'mobile_number', 'firstname', 'lastname', 'year', 'month', 'day', 'gender', 'email' ])

	    let formData = {
	    	mobile_number: mobile_number,
	    	firstname: firstname,
	    	lastname: lastname,
	    	email: email,
	    }

	    const rules = {
			mobile_number: 'required|unique:users,mobile_number',
			email: 'required|email|unique:users,email',
			firstname: 'required',
			lastname: 'required',
		}

		const messages = {
			'mobile_number.unique': 'Mobile number already exist',
			'mobile_number.required': 'Mobile number cannot be empty',
			'email.required': 'Email cannot be empty',
			'email.email': 'Please enter valid email',
			'email.unique': 'Email already exist',
			'firstname.required': 'First Name cannot be empty',
			'lastname.required': 'Last Name cannot be empty',
		}

		const validation = await validateAll(formData, rules, messages)
		if (validation.fails()) {
			session.withErrors(validation.messages()).flashExcept(['password'])
			return response.redirect('back')
		} else {
			let dates
			let formatedDate
			if(year == null || month == null || day == null) {
				dates = new Date()
				formatedDate = moment(dates).format('YYYY-MM-DD')
			} else {
				dates = new Date(year, month, day)
				formatedDate = moment(dates).format('YYYY-MM-DD')
			}

			let savedData = {
				mobile_number: mobile_number,
		    	firstname: firstname,
		    	lastname: lastname,
		    	email: email,
		    	password: mobile_number,
		    	gender: gender,
		    	date_of_birth: formatedDate,
		    	created_by: '1',
				updated_by: '1',
			}

			let saved = await User.create(savedData)

			if(saved) {
				session.flash({ notification: 'Successfully create new user!', status: 'success', data: true });
	    		return response.redirect('/')
			} else {
				session.flash({ notification: 'Failed create new user!', status: 'danger', data: false });
	    		return response.redirect('/')
			}
		}
	}

	async edit({request, response, view, params}){
	    const id = params.id;
	    const todo = await Todo.find(id);

	    return view.render('edit', { todo : todo})
	}

	async update({request, response, view, params, session}){
	    const id = params.id;
	    const todo = await Todo.find(id);
	    todo.title = request.input('title');
	    todo.description = request.input('description');
	    await todo.save();

	    session.flash({ notification: 'Successfully update!' });
	    response.redirect('/')
	}

	async delete({request, response, view, params, session}){
	    const id = params.id;
	    const todo = await Todo.find(id);
	    await todo.delete();

	    session.flash({ notification: 'Successfully delete!' });
	    response.redirect('/')
	}
}

module.exports = UserController
