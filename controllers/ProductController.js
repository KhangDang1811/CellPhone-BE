import {ProductModel} from '../models/ProductModel.js'
import expressAsyncHandler from 'express-async-handler'
import { PinComment } from '../untils/until.js'
import cloudinary from 'cloudinary'
import {data} from '../data.js'

export const getAllProduct = expressAsyncHandler(async (req, res) => {
    //await ProductModel.remove()

    // const product = await ProductModel.insertMany(data.products)
    // ProductModel.find()
    //     .then(product => res.send(product))
    //     .catch(err => console.log(err))

    const products = await ProductModel.find({})
    //const products = await data.find({})
    res.send(products)
})

export const findProductById = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById({_id: req.params.id})
    if(product){
        res.send(product)
    }else{
        res.send({message: 'product not found'})
    }
})

export const filterProductByType =  expressAsyncHandler(async (req, res) => {
    // ProductModel.find({type: req.params.type})
    //     .then(product => res.send(product))
    //     .catch(err => console.log(err))

    const filterProductByType = await ProductModel.find({type: req.params.type}).limit(5)
    res.send(filterProductByType)
})

export const filterProductByRandomField = expressAsyncHandler(async (req, res) => {
    
    const products2 = await ProductModel.find(req.body)
   
    const products1 = await ProductModel.find(
        req.body.type &&  req.body.color && req.body.ram ? {type: req.body.type,color: req.body.color,ram: req.body.ram} :
        req.body.type &&  req.body.color ? {type: req.body.type,color: req.body.color} :
        req.body.type &&  req.body.ram ? {type: req.body.type,ram: req.body.ram} :
        req.body.screen &&  req.body.ram ? {screen: req.body.screen,ram: req.body.ram} :
        req.body.type ? {type: req.body.type}  :
        req.body.color ? {color: req.body.color} : 
        req.body.ram ? {ram: req.body.ram} :
        req.body.screen ? {screen: req.body.screen} :
        {} 
    )

    const products = products1.filter(product => {
        let flag = false
        for(let i = 0; i < product.tskt.length; i++){
            if(product.tskt[i].value.includes(req.body.value)){
                flag = true
                break
            }
            if(product.tskt[i].value.includes(req.body.sensor)){
                flag = true
                break
            }
            if(product.tskt[i].value.includes(req.body.camera)){
                flag = true
                break
            }
            if(product.tskt[i].value.includes(req.body.system)){
                flag = true
                break
            }
            if(product.tskt[i].value.includes(req.body.hz)){
                flag = true
                break
            }
            if(product.tskt[i].value.includes(req.body.memory)){
                flag = true
                break
            }
        }
        return flag
    })

    if(products){
        res.send(products.length > 0 ? products : products2)
    }
    else{
        res.send({message: 'product not found'})
    }
})
export const AddProduct = expressAsyncHandler(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    folder: "dev_setups",
  });
  //console.log(result);
  const product = new ProductModel({
    name: req.body.name,
    price: req.body.price,
    salePrice: req.body.salePrice,
    amount: req.body.amount,
    type: req.body.type,
    image: result.secure_url,
    image:req.body.image,
    cloudinary_id: result.public_id,
    rating: 0,

    os: req.body.os,
    ram: req.body.ram,
    battery: req.body.battery,
    rom: req.body.rom,
    camera: req.body.camera,
    special: req.body.special,
    design: req.body.design,
    screen: req.body.screen,
  });
    // const product = new ProductModel(req.body);
    // try{
    //     const newProduct = await product.save();
    //     res.status(200).json(newProduct);
    // }
    // catch(err){
    //     console.log(err);
    // }
  const newProduct = await product.save();

  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newProduct });
  } else {
    res.send("error add product");
  }
 
});

export const UpdateProduct = expressAsyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
    if (product) {
        await product.updateOne({$set:req.body});
        res.send(product);
    } else {
        res.send({ message: "product not found" });
    }
//   await cloudinary.uploader.destroy(product.cloudinary_id);

//   let result;
//   if (req.file) {
//     result = await cloudinary.uploader.upload(req.file.path);
//     console.log(result);
//   }

//   if (product) {
//     product.name = req.body.name;
//     product.amount = req.body.amount;
//     product.price = req.body.price;
//     product.salePrice = req.body.salePrice;
//     product.type = req.body.type;
//     product.image = req.body.image;
//     product.image = result?.secure_url || product.image;
//     product.rating = 0;
//     product.cloulinary_id = result?.public_id || product.cloudinary_id;

//     product.os = req.body.os;
//     product.ram = req.body.ram;
//     product.battery = req.body.battery;
//     product.rom = req.body.rom;
//     product.camera = req.body.camera;
//     product.special = req.body.special;
//     product.design = req.body.design;
//     product.screen = req.body.screen;

//     const updateProduct = await product.updateOne({$set: req.body});
//     if (updateProduct) {
//       res.send("update success");
//     }
//   }else{
//     res.send("update fail");
//   }


});

export const DeleteProduct = expressAsyncHandler(async (req, res) => {
    const deleteProduct = await ProductModel.findById(req.params.id)

    await cloudinary.uploader.destroy(deleteProduct.cloudinary_id);

    if(deleteProduct){
        await deleteProduct.remove()
        res.send({message: 'product deleted'})
    } else{
        console.log('error delete product')
        res.send('error in deletetion')
    }
})
//, $options: '$i'
export const SearchProduct = expressAsyncHandler(async (req, res) => {
    const name = req.query.name
    const product = await ProductModel.find({name: {$regex: name, $options: '$i'}})
    
    product.length > 0 ? res.send(product) : res.send({message: ' khong tim thay sp'})
})

export const paginationProduct = expressAsyncHandler(async (req, res) => {
   
    var perPage = 4
    var page = req.params.page || 1
    ProductModel
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            ProductModel.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                res.send({
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})

export const RateProduct = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    if(product){
        const existsUser = product.reviews.find(x => x.name === req.body.name)
        console.log(existsUser)
        if(existsUser){
            res.send({message: 'ban da danh gia san pham nay'})
        }else{
            product.reviews.push(req.body)
            const updateProduct = await product.save()
            res.send(updateProduct)
        }
        
    }else{
        res.status(400).send({message: 'product not found'})
    }

})

export const CommentProduct = expressAsyncHandler(async (req, res) => {
   // console.log(req.body)
    const product = await ProductModel.findById(req.params.id)
    if(product){
        product.comments.push(req.body)
        const updateCommentProduct = await product.save()
        res.send(updateCommentProduct)
    }else{
        res.status(400).send({message: 'product not found'})
    }

})

export const PinCommentProduct = expressAsyncHandler(async (req, res) => {
   // console.log(req.body, req.params.id)
    const product = await ProductModel.findById(req.params.id)
    if(product){
        const indexComment = product.comments.findIndex(item => item._id == req.body.idComment)
        product.comments[indexComment] = req.body
        PinComment(product.comments, indexComment, 0)

        await product.save()
        res.send(product)
    }else{
        res.status(400).send({message: 'product not found'})
    }
})

export const BlogProduct = expressAsyncHandler(async (req, res) => {
    //console.log(req.body.blogContent)
    const product = await ProductModel.findById({_id: req.params.id})
    
    if(product){
        product.blog = req.body.blogContent
        await product.save()
        res.send(product)
    }else{
        res.send({message: 'product not found'})
    }
})

export const RepCommentProduct = expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    if(product){
        const indexComment = product.comments.findIndex(item => item._id == req.body.idComment)
        product.comments[indexComment].replies.push(req.body)

        await product.save()
        res.send(product)
    }else{
        res.status(400).send({message: 'product not found'})
    }

})

export const ChangeLikesComment = expressAsyncHandler(async (req, res) => {
    //find id comment than push body like
    const product = await ProductModel.findById(req.params.id)
    if(product){
        const indexComment = product.comments.findIndex(item => item._id == req.body.idComment)
        product.comments[indexComment].likes.push(req.body)
        await product.save()
        res.send(product)
    }
    else{
        console.log('can not like comment')
    }
})

//Update The amount of the product is equal to the available amount minus the order amount 
export const UpdateAmountProduct = expressAsyncHandler(async (req, res) => {
    try {
        const ArrayId = req.body
        for(let i = 0; i < ArrayId.length; i++){
                   
           const product = await ProductModel.findById(ArrayId[i].id)  
               product.amount = product.amount - ArrayId[i].qty
               await product.save()   
       } 
      res.status(200).send({message: 'success'})
    } catch (error) {
           res.status(400).send({message: 'product not found'})
    }
})

export const UpdateAmountProductDel = expressAsyncHandler(async (req, res) => {
    try {
        const ArrayId = req.body
        for(let i = 0; i < ArrayId.length; i++){    
           const product = await ProductModel.findById(ArrayId[i].id)  
           product.amount = parseInt(product.amount) + parseInt(ArrayId[i].qty)
           await product.save()   
       } 
       res.status(200).send({message: 'success'})
    } catch (error) {
           res.status(400).send({message: 'product not found'})
    }

})