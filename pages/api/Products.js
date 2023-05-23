import Product from "@/models/Product";
import { initMongoose } from "@/lib/mongoose";

export async function findAllProduct() {
  return Product.find().exec();
}

export default async function handel(req, res) {
  await initMongoose();
  const { ids } = req.query;
  if (ids) {
    const idsArray = ids.split(",");
    console.log(idsArray);
    res.json(
      await Product.find({
        _id: { $in: idsArray },
      }).exec()
    );
  } else {
    res.json(await findAllProduct());
  }
}
