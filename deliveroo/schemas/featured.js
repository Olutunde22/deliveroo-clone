import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'featured',
    title: 'Featured Category',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Featured',
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
            name: 'restaurant',
            title: 'Restaurants',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'restaurant' }] }]
          }),
    ],
})
