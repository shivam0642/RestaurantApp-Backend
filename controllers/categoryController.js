const categoryModel = require("../models/categoryModel");

//CREATE CATEGORY
const createCategoryController = async (req,resp) =>{
    try {
       const {title,imageurl} = req.body 
       //Validation
       if(!title){
        return resp.status(500).send({
            succes:false,
            message :'Please provide category title',
        })
       }

       const newCategory = new categoryModel({title,imageurl})
       await newCategory.save()
       resp.status(201).send({
        success:true,
        message: 'Category created successfully',
        newCategory
       })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:'Error in Create category API'
        })
    }
}

//GET CATEGORY CONTROLLER
const getCategoryController = async (req,resp) => {
    try {
        const categories = await categoryModel.find()
        if(!categories)
        {
            return resp.status(404).send({
                success:false,
                message:'No categories found'
            })
        }

        resp.status(200).send({
            success:true,
            totalCat: categories.length,
            categories
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:'Error in Get category API'
        })
    }
}

const updateCategoryController = async (req,resp) => {
    try {
        const {id} = req.params;
        const {title , imageurl} = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imageurl},{new:true})
        if(!updatedCategory)
        {
            return resp.status(500).send({
                success:false,
                message:'Category not found'
            })
        }

        resp.status(200).send({
            succes:true,
            message:'Category updated successfully',
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
             success:false,
             message:'Error in Update category API',
             error:error.message
        })
    }
}

//DELETE ROUTE
const deleteCategoryController = async (req,resp) => {
    try {
        const {id} = req.params;
        if(!id)
        {
            return resp.status(500).send({
                success:false,
                message:'Please provide category id'
            })
        }
        const category = await categoryModel.findById(id)
        if(!category)
        {
            return resp.status(500).send({
                success:false,
                message:'No category found with this id'
            })
        }
        await categoryModel.findByIdAndDelete(id)
        resp.status(200).send({
            success:true,
            message:'Category deleted successfully'
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:'Error in Delete category API'
        })
    }
}

module.exports = {createCategoryController,getCategoryController, updateCategoryController,deleteCategoryController}
