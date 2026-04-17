import gymModels from "../models/gymModels.js"


// create
export const addMember = async (req, res)=>{
    try{
        const  newMember = new gymModels(req.body);
        await newMember.save();

        res.status(201).json({
            status: true,
            message:"Gym member created",
            data: newMember
        })
    }catch(error){
      res.status(500).json({
        status: false,
        message: error.message
      })
    }
}


// read all

export const getAllMembers = async(req,res)=>{
    try {
        const members = await gymModels.find();

        res.status(200).json({
            status: true,
            message:"All member fetched",
            data: members
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

// Read Siingle

export const getSingleMember = async(req,res)=>{
    try {
        const id = req.query.id;
        const member = await gymModels.findById(id);

        if(!member){
               return res.status(404).json({
                status: false,
                message: "Gym member not found"
               })
        }

        res.status(200).json({
            status: true,
            message:"Single member fetched",
            data: member
        })
    } catch (error) {
          res.status(500).json({
      status: false,
      message: error.message
    });
    }
}


// Update

export const updateMember = async(req, res)=>{
    try {
        const id = req.query.id;
        const member = await gymModels.findById(id);

          if (!member) {
      return res.status(404).json({
        status: false,
        message: "Gym member not found"
      });
    }

    member.name = req.body.name ?? member.name;
    member.age = req.body.age ?? member.age;
     member.membership = req.body.membership ?? member.membership;
    member.fees = req.body.fees ?? member.fees;

    await member.save();
    res.status(200).json({
      status: true,
      message: "Gym member updated successfully",
      data: member
    });


    } catch (error) {
        res.status(500).json({
      status: false,
      message: error.message
    });
    }
}
 
// Delete
export const deleteMember = async(req, res)=>{
    try {
    const id = req.query.id;

    const deletedMember = await gymModels.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({
        status: false,
        message: "Gym member not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Gym member deleted successfully",
      data: deletedMember
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}