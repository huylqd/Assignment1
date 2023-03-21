import Product from '../model/products'
import joi from 'joi'
import dotenv from 'dotenv'


dotenv.config()

const productSchema = joi.object({
    name: joi.string().required('Khong duoc de trong'),
    price: joi.number().required('Khong duoc de trong')
})

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.json({
                message: "Khong co san pham nao"
            })
        }
        else {
            return res.json({
                message: "Lay san pham thanh cong",
                data: products
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        if (!products) {
            return res.json({
                message: "Khong co san pham nao"
            })
        }
        else {
            return res.json({
                message: "Lay san pham thanh cong",
                data: products
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const products = await Product.create(req.body)
        if (!products) {
            return res.json({
                message: "Khong them san pham nao"
            })
        }
        else {
            return res.json({
                message: "Them san pham thanh cong",
                data: products
            })
        }
    // try {
    //     const product = new Product(req.body);
    //     const validationResult = product.validateSync();

    //     if (validationResult) {
    //         return res.status(400).json({
    //             message: validationResult.message
    //         });
    //     }

    //     const newProduct = await product.save();

    //     return res.json({
    //         message: "Thêm sản phẩm thành công",
    //         data: newProduct
    //     });

    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const update = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const products = await Product.updateOne({ _id: req.params.id }, req.body)
        if (!products) {
            return res.json({
                message: "Cap nhat san pham that bai"
            })
        }
        else {
            return res.json({
                message: "Cap nhat san pham thanh cong",
                data: products
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const remove = async(req, res) => {
    try {
        await Product.deleteOne({_id: req.params.id})
        res.json({
            message: "Xoa san pham thanh cong"
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}