import {Router} from "express";
import {getBlogsController} from "./controllers/getBlogsController";
import {createBlogController} from "./controllers/createBlogController";
import {findBlogController} from "./controllers/findBlogController";
import {putBlogController} from "./controllers/putBlogController";
import {delBlogController} from "./controllers/delBlogController";
import {blogsInputValidations} from "./blogsInputValidations";
import {adminAuthentication} from "../../global-middiewares/adminAuthentication";



export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsController)
blogsRouter.post('/', adminAuthentication, blogsInputValidations(), createBlogController)
blogsRouter.get('/:blogId', findBlogController)
blogsRouter.put('/:blogId', adminAuthentication, blogsInputValidations(), putBlogController)
blogsRouter.delete('/:blogId', adminAuthentication, delBlogController)



