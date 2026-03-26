const topicList = require('../models/topic')

exports.createTopic = async(req,res)=>{
    try{
            const topic = req.body
            const topicData = await topicList.create(topic)
    
            res.status(201).json({
                status: 'Success',
                message: 'Topic data created',
                data: topicData
            })
        }
        catch(err){
             res.status(400).json({
                status: 'Fail',
                message: err.message
            })
        }
}
    
    exports.viewTopicData = async(req,res)=>{
        try{
            const viewTopic = await topicList.find().populate(['loginuser','languageList'])
    
            res.status(201).json({
                status: 'Success',
                message: 'Topic data fetched',
                data: viewTopic
            })
        }
        catch(err){
             res.status(400).json({
                status: 'Fail',
                message: err.message
            })
        }
}
    
    exports.updateTopicData = async(req,res)=>{
        try{
    
         const editId = req.params.id
            const updateTopic = await topicList.findByIdAndUpdate(editId, req.body, {new: true})
    
            res.status(200).json({
                status: 'Success',
                message: 'Data updated successful',
                data: updateTopic
            })
        }
        catch(error){
            res.status(400).json({
                status: 'Fail',
                message: error.message
           })
        }
}
    
    exports.deleteTopicData = async(req,res)=>{
        try{
            const deleteId = req.params.id
            const deleteTopic = await topicList.findByIdAndDelete(deleteId)
    
            res.status(200).json({
                status: 'Success',
                message: 'Data deleted successful',
                data: deleteTopic
            })
        }
        catch(error){
            res.status(400).json({
                status: 'Fail',
                message: error.message
           })
        }
}