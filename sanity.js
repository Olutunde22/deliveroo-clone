import sanityClient from '@sanity/client'
import imageURLBuilder from '@sanity/image-url'

const client = sanityClient({
    projectId: 'productid',
    dataset: 'production',
    apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
    useCdn: true, // `false` if you want to ensure fresh data
})

const builder = imageURLBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client