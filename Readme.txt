login api and take request from body and do the verification of the data and send response with jwt token 
check request should have jwt token in header if its not present will send error in the response
and then check the verification of the jwt token and if verification fails send respective error with status codes 




check the responses and http status of all api as per the format shared in the project like Successful Response structure and Error Response structure
check all apis and their validations 
change the naming convention of all code to camelCase
doubt of fname validation and be more specific about what to exactly validate in all api's
clear the code in proper format and make it clean 
remove all unnecessary comments ask whether to keep the explaining ones or not 
tags wali problem resolve karni hai in delete api 
check if deleted date and published date getting properly printed or not
give right names to variable 





const deleteBlogs = async (req, res) => {
    try {
        let keyArr = Object.keys(req.query)
        let somethingBad = false;
        for (let i = 0; i < keyArr.length; i++) {
            if (!(keyArr[i] == "authorId" || keyArr[i] == "category" || keyArr[i] == "tags" || keyArr[i] == "subcategory" || keyArr[i] == "isPublished"))
                somethingBad = true;
        }
        if (somethingBad) {
            return res.status(400).send({ status: false, msg: "invalid input" })
        }
        req.query.isDeleted = false;
        let date = new Date()
        const data = await blogsModel.updateMany(req.query, { $set: { isDeleted: true, deletedAt: date } })
        if (data.matchedCount == 0)
            return res.status(404).send({ status: false, msg: "blog not found" })
        res.status(200).send({ status: true, data: "finally deleted Successfull " + data.matchedCount + " documents" })
    }
    catch (err) {
        res.send({ msg: err.message })
    }
}