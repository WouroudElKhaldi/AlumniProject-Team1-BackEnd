import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import fs from "fs"


//add blog
export const addBlog = async (req, res) => {
  try {
    const { 
      author, 
      title, 
      content, 
      category 
    } = req.body;
    const image = req.file.path;

    if(!author || !title || !content ){
      return res.json({
        error: "Please provide all required data"
      })
    }

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }
      const blog = new Blog({
        author,
        title,
        content,
        image,
        category: category,
      });
      const newBlog = await blog.save();
      return res.status(200).json({
        message : `Blog ${newBlog.title} is added successfuly`,
        data : newBlog
      });
    } catch (error) {
      return res.status(500).json({
         message: error.message 
        });
    }
  } ;
  
//get the blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    if(!blogs){
      return res.json({
        error : "No blogs found"
      })
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get blog by id

export const getBlogById = async (req, res) => {
  const  id  = req.body.id;
  try {
        // Validation for he type of the blog id
        if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({
            error: "News not found"
          })
        }

    const blog = await Blog.findById(id);
    if (blog) {
      return res.status(200).json(blog);
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//delete blog by id
export const deleteBlog = async (req, res) => {
  const id = req.body.id;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        error: "Blogs not found"
      })
    }
    const blogg = await Blog.findById(id);
    if(!blogg){
      return res.status(404).json({
        error: "Blogs not found"
      })
    }

    fs.unlink(blogg.image , (err) => {
      if (err){
        return res.status(500).json({
          error :`error deleting image: ${err}`
        })
      }
    })

    const deletedBlogs = await Blog.findByIdAndRemove(id)
    if (!deletedBlogs) {
      return res.status(404).json({
        error: "Blog is not found",
      });
    }
    return res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Blog post not found or could not be deleted" });
  }
};

//update the blog by id 
export const updateBlog = async (req, res) => {
  const  id  = req.body.id;
  // const { author, title, content, category } = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({
      error: "Blogs not found"
    })
  }

  const blogfirst = await Blog.findById(id)
  fs.unlink(blogfirst.image , (err)=> {
    if(err){
      return res.status(500).json({
        error: `error updating the photo`
      })
    }
  })
    try {
      const updatedData = req.body;
      const image = req.file.path ;
      updatedData.image = image
      // Find the existing blog post by ID
      const updatedBlog = await Blog.findByIdAndUpdate(
        { _id: id },
        updatedData,
        { new: true }
      );


      return res.status(200).json({ message: 'Blog updated successfully', data: updatedBlog });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

//filter by category
 
export const getBlogsByCategory= async (req,res)=>{
  const categoryName = req.body.categoryName;
  try{
    const category = await Category.findOne({name: categoryName})
    console.log(category)
    if (!category){
      return res.status(404).json({
        message:"category not found"
      })
    }
    const blogs= await Blog.find({ category: category._id});
    res.status(201).json(blogs);
  }catch(error){
     res.status(500).json({error:error.message})
  } 
}