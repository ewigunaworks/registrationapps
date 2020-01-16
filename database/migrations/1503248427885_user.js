'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('mobile_number', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('firstname', 255).nullable()
      table.string('lastname', 255).nullable()
      table.string('gender')
      table.date('date_of_birth')

      table.integer('created_by', 10).defaultTo(1)
      table.integer('updated_by', 10).defaultTo(1)
      
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
