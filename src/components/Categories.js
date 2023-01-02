import { ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient from '../../sanity'

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState()

    const getCategories = async () => {
        try {
            const data = await sanityClient.fetch(`
            *[_type=="category"]{
                _id,
                name,
                image
            }
            `)
            setCategoriesData(data)
        }
        catch (err) {

        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
            }}
            horizontal
            showsVerticalScrollIndicator={false}
        >
            {categoriesData && categoriesData.map((category) => <CategoryCard key={category._id} imgUrl={category.image} title={category.title} />)}
        </ScrollView>
    )
}

export default Categories