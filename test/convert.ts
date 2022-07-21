import Transpiler from "../src/Transpiler";

const transpiler = new Transpiler()
const test = (input: string) => {
    console.log({
        input: input,
        result: transpiler.convert(input)
    })
}

// variables
test('My first name is {{ first_name }}. My last name is {{ last_name }}.')

// basic conditionals
test('{% if user.is_authenticated %}Hello, {{ user.username }}.{% else %} not authenticated {% endif %}')

// comments
test('{# this won\'t be rendered #}')
test(`{% comment "Optional note" %} this won\'t be rendered {% endcomment %}`)

// iterator
test('{% for o in some_list %}{% endfor %}')