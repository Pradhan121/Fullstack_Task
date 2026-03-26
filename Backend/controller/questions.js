const questionData = require('../models/questions')

exports.createQuestionData = async(req,res)=>{
    try{
            const question = req.body
            const questionDataList = await questionData.create(question)
    
            res.status(201).json({
                status: 'Success',
                message: 'question data created',
                data: questionDataList
            })
        }
        catch(err){
             res.status(400).json({
                status: 'Fail',
                message: err.message
            })
        }
}
    
    exports.viewQuestionData = async(req,res)=>{
        try{
            const viewQuestion = await questionData.find().populate(['loginuser', 'languageList', 'topicList'])
    
            res.status(201).json({
                status: 'Success',
                message: 'question data fetched',
                data: viewQuestion
            })
        }
        catch(err){
             res.status(400).json({
                status: 'Fail',
                message: err.message
            })
        }
}
    
    exports.updateQuestionData = async(req,res)=>{
        try{
    
         const editId = req.params.id
            const updateQue = await questionData.findByIdAndUpdate(editId, req.body, {new: true})
    
            res.status(200).json({
                status: 'Success',
                message: 'Data updated successful',
                data: updateQue
            })
        }
        catch(error){
            res.status(400).json({
                status: 'Fail',
                message: error.message
           })
        }
}
    
    exports.deleteQuestionData = async(req,res)=>{
        try{
            const deleteId = req.params.id
            const deleteQue = await questionData.findByIdAndDelete(deleteId)
    
            res.status(200).json({
                status: 'Success',
                message: 'Data deleted successful',
                data: deleteQue
            })
        }
        catch(error){
            res.status(400).json({
                status: 'Fail',
                message: error.message
           })
        }
}