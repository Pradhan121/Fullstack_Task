const languageList = require('../models/language')

exports.createLanguage = async(req,res)=>{
    try{
        const language = req.body
        const languageData = await languageList.create(language)

        res.status(201).json({
            status: 'Success',
            message: 'Language data created',
            data: languageData
        })
    }
    catch(err){
         res.status(400).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.viewLanguage = async(req,res)=>{
    try{
        const viewLanguage = await languageList.find().populate('loginUser')

        res.status(201).json({
            status: 'Success',
            message: 'Language data fetched',
            data: viewLanguage
        })
    }
    catch(err){
         res.status(400).json({
            status: 'Fail',
            message: err.message
        })
    }
}

exports.updateLanguage = async(req,res)=>{
    try{

     const editId = req.params.id
        const updateLng = await languageList.findByIdAndUpdate(editId, req.body, {new: true})

        res.status(200).json({
            status: 'Success',
            message: 'Data updated successful',
            data: updateLng
        })
    }
    catch(error){
        res.status(400).json({
            status: 'Fail',
            message: error.message
       })
    }
}

exports.deleteLanguage = async(req,res)=>{
    try{
        const deleteId = req.params.id
        const deleteLng = await languageList.findByIdAndDelete(deleteId)

        res.status(200).json({
            status: 'Success',
            message: 'Data deleted successful',
            data: deleteLng 
        })
    }
    catch(error){
        res.status(400).json({
            status: 'Fail',
            message: error.message
       })
    }
}