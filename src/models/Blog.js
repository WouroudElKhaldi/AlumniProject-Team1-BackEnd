import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    author:{
        type:String,
        required:true,
        validate:{
            validator:(value)=>{
                return value.length >=3;
            },
            message:"Author name must be at least 3 characters."
        }
    },
    title:{
        type:String,
        required:true,
        validate:{
            validator:(value)=>{
                return value.length >=5;
            },
            message:"Title must be at least 5 characters."
        }
        
    },
    content:{
        type:String,
        required:true,
        validate:{
            validator:(value)=>{
                return value.length >=20;
            },
            message:"Content must be at least 20 characters."
        }
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
        required:false
      },
},{
    timestamps : true
}
)

const Blog = mongoose.model("Blog", blogSchema)

export default Blog 