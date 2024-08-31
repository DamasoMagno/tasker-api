import { Router } from "express";
const categoryRoutes = Router();

import { CreateCategory } from "./create";
import { UpdateCategory } from "./update";
import { DeleteCategory } from "./delete";
import { GetCategory } from "./get";
import { ListCategories } from "./list";

const createCategory = new CreateCategory();
const updateCategory = new UpdateCategory();
const deleteCategory = new DeleteCategory();
const getCategory = new GetCategory();
const listCategories = new ListCategories();

categoryRoutes.post("/", createCategory.execute);
categoryRoutes.patch("/:categoryId", updateCategory.execute);
categoryRoutes.get("/", listCategories.execute);
categoryRoutes.delete("/:categoryId", deleteCategory.execute);
categoryRoutes.get("/:categoryId", getCategory.execute);

export { categoryRoutes };
