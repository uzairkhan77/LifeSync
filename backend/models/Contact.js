import mongoose from "mongoose";
/**
 * @swagger
 * components:
 *  schemas:
 *    Contact:
 *      type: object
 *      required:
 *       - name 
 *       - email
 *      properties:
 *        userId:
 *          type: string
 *          description: Logged-in User ID 
 *        name:
 *          type: string  
 *          description: Name of a Contact
 *        email:
 *          type: string
 *          unique: true
 *          description: Email of a Contact
 *        phone:
 *          type: string
 *          description: Phone of a Contact
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Creation time of a Contact
 *        isFavourite:
 *          type: boolean
 *          default: false
 *          description: Is Contact favourite?
 *      example:
 *          name: uzair
 *          email: uzair'@'gmail.com
 *          phone: 01231212131
 *           

 */
const contactSchema = new mongoose.Schema(
  {
  userId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isFavourite:{
    type:Boolean,
    default: false,
  }
});

export default mongoose.model("Contact", contactSchema);
