const {ProductService, ProductInfoService, ProductVariantsService} = require("../services");


//------------------------------- import --------------------------------------

async function create(req, res) {
  try {
    const {...data, info, variants} = req.body;
    const product = await ProductService.create(data)
    await Promise.all([
      ProductInfoService.create(product._id, info),
      ProductVariantsService.create(product._id, variants),
    ]);
    return res.status(200).json({message: "Create Product Successfully"})
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
}

async function update(req, res) {
  try {
    const {_id} = req.params;
    const product = await ProductService.get(_id);
    if (!product) return new Error("Product not found")
    const {...data, info, variants} = req.body;
    // const updateProduct = await ProductService.update(_id, data)
    // const updateProductInfo = info?._id ? await ProductInfoService.update(info._id, info) : await ProductInfoService.create(_id, info)
    //
    // for (const variant of variants) {
    //   if (variant?._id) await ProductVariantsService.update(variant._id, variant)
    //   else await ProductVariantsService.create(_id, variant)
    // }
    //
    const updates = [
      data && ProductService.update(_id, data),
      info?._id ? ProductInfoService.update(info._id, info) : ProductInfoService.create(_id, info),
      ...variants.map((variant) =>
        variant._id ? ProductVariantsService.update(variant._id, variant) : ProductVariantsService.create(_id, variant)
      ),
    ].filter(Boolean);
    await Promise.all(updates);
    
    return res.status(200).json({message: "Update Product Successfully"})
  } catch (error) {
    return res.status(400).json({success: false, message: error.message});
  }
}

async function deleteItem(req, res) {
  const {_id} = req.params;
  const result = await ProductService.delete(_id);
  return res.status(200).json(result);
}

//------------------------------- export --------------------------------------


module.exports = {
  create,
  update,
  deleteItem
}