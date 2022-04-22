const Contact = require('../models/Contact');
const { contactValidator } = require('../utilities/validators');
const sendEmail = require('../utils/sendEmail');

const registerContact = async (req, res) => {
try {
    const validationResult = contactValidator.validate(req.body, { abortEarly: false })
    console.log(validationResult)
    if (validationResult.error) {
        return res.status(400).json(validationResult)
    }
    const { email } = req.body
    const existingContact = await Contact.findOne({ email })
    if (existingContact) {
        return res.status(401).json({
            error: 'An account with this email exists already'
        })
    }
    const contact= new Contact({
        ...req.body,
    })
   
    const savedContact = await contact.save()
    res.status(201).json({
        message: 'Contact saved successfully',
        contact: savedContact
    })
    
 
    await sendEmail(contact.email, `New Message from ${contact.firstName}` , `message:${contact.message}`);

    // res
    //     .status(200)
    //     .send({ message: "Alert Message sent to your email account" });
     

} catch (error) {
    console.log(error)
    
    
}


}
module.exports = {
    registerContact
}