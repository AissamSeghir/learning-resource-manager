import Resource from "../models/Resource.js";

export const addResource = async (req,res) => {
    try{
        const {title , description , url , type , tags } = req.body
        console.log(req.body);
        const newResource = new Resource(
            {
                title: title,
                description: description,
                url: url,
                type: type,
                tags: tags
              }
        )
        newResource.save()
        return res.json({ message: "add resource successfully" });
    }catch(err){

        console.log(err);
        res.status(500).json({ error: err.message });
        
    }

}

export const getResources = async (req, res) => {
    try {
      const resources = await Resource.find();
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch resources', error });
    }
  };