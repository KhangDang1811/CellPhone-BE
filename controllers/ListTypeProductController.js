import expressAsyncHandler from 'express-async-handler'
import cloudinary from 'cloudinary'
import { ListTypeProductModel } from '../models/ListTypeProductModel.js'

export const getAllTypeProduct = expressAsyncHandler(async (req, res) => {
    //console.log('get all type')
    const allType = await ListTypeProductModel.find({})
    //console.log(allType)
    res.send(allType)
})

//ceate new type product
export const NewTypeProduct = expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const newTypeProduct = new ListTypeProductModel({
        name: req.body.name,
        image: req.body.image
    })
    const result = await newTypeProduct.save()
    res.send(result)
})

export const createNewTypeProduct = expressAsyncHandler(async (req, res) => {
    console.log('create type product',req.body)
    // const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "dev_setups",
    //   });
    // console.log(result)
    // const newType = new ListTypeProductModel({
    //     name: req.body.name,
    //     img: req.body.img,
    //    // img: result.secure_url,
    //    // cloudinary_id: result.public_id,
    // }) 

    // await newType.save()
    // res.send(newType)
    const product = new ListTypeProductModel(req.body);
    try{
        const newTypeProduct = await product.save();
        res.status(200).json(newTypeProduct);
    }
    catch(err){
        console.log(err);
    }
})

export const deleteTypeProduct = expressAsyncHandler(async (req, res) => {
    const typeProduct = await ListTypeProductModel.findById({_id: req.params.id})

   // await cloudinary.uploader.destroy(typeProduct.cloudinary_id)

    if(typeProduct){
        await typeProduct.remove()
        res.send({msg: 'deleted type product'})
    }else{
        res.send({msg: 'product not found'})
    }

})