const languageList = require('../models/language')

const userAuth = require('../models/auth');

exports.createLanguage = async (req, res) => {
  try {
    const user = await userAuth.findOne({ username: req.body.userName });

    const data = {
      name: req.body.name,
      loginUser: user._id   // 👈 auto set
    };

    const languageData = await languageList.create(data);

    res.status(201).json({
      status: 'Success',
      data: languageData
    });

  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err.message
    });
  }
};

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