import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const parseSizes = (value) => {
    if (Array.isArray(value)) {
        return value.map((size) => String(size).trim()).filter(Boolean)
    }

    if (typeof value !== 'string' || !value.trim()) {
        return []
    }

    try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed)) {
            return parsed.map((size) => String(size).trim()).filter(Boolean)
        }
    } catch {
        // Accept form values such as [*M*], [M], or S,M.
    }

    return value
        .replace(/[\[\]*]/g, '')
        .split(/[;,\s]+/)
        .map((size) => size.trim())
        .filter(Boolean)
}

// function for add product
const addProduct = async (req, res) => {
    try {
        
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const files = req.files || {}
        const image1 = files.image1 && files.image1[0]
        const image2 = files.image2 && files.image2[0]
        const image3 = files.image3 && files.image3[0]
        const image4 = files.image4 && files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)


        const parsedSizes = parseSizes(sizes)
        if (parsedSizes.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one product size is required' })
        }

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

       const productData = {
           name,
           description,
           category,
           price: Number(price),
           subCategory,
           bestseller: bestseller === "true" ? true : false,
           sizes: parsedSizes,
           image: imagesUrl,
           date: Date.now()
       }

       console.log(productData);

       const product = new productModel(productData);
       await product.save()

        res.status(201).json({ success: true, message: "Product added", product })
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

//Function for list product:
const listProduct = async (req,res) => {
  try {
    
    const products = await productModel.find({}).sort({ date: -1 });
    res.json({ success: true, products })

  } catch (error) {
     console.log(error)
        res.status(500).json({ success: false, message: error.message })
  }
    
}

//Function form removing the product
const removeProduct = async (req,res) => {
    try {
        
       await productModel.findByIdAndDelete(req.body.id)
       res.json({success:true,message:"product Removed"})

    } catch (error) {
         console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
    

}

//function for singleproduct info:
const singleproduct = async (req,res) => {
    try {
        const { productId } = req.body

        if (!productId) {
            return res.status(400).json({ success: false, message: 'productId is required' })
        }

        const product = await productModel.findById(productId)

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }

        res.json({ success: true, product })

    } catch (error) {
         console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
    
}



export {listProduct, addProduct, removeProduct, singleproduct}