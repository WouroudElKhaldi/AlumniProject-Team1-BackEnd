import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required: false 
    }, 
    // categoryName:{
    //     type :String,
    //     required:true,
    // }
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
      },
},{
    timestamps : true
}
)

const Blog = mongoose.model("Blog", blogSchema)

export default Blog 