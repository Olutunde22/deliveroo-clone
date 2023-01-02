import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'dish',
    title: 'Menu dish',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Dish',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'short_description',
            title: 'Short description',
            type: 'string',
            validation: (Rule) => Rule.max(200)
        }),
        defineField({
            name: 'price',
            title: 'price',
            type: 'number',
        }),
        defineField({
            name: 'image',
            title: 'image',
            type: 'image',
        }),
    ],
})
