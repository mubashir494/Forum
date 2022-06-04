import  express  from "express";
import { register,login,getUserDetails,updateUser} from "../contoller/user.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.post('/register',register)
router.post('/',login);
router.post('/get',authenticate,getUserDetails)
router.put('/update',authenticate,updateUser)

export default router;