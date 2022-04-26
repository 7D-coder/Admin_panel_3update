import client from "./client";

export const getPosts = async (pageNo, limit) => {
    try{

        const {data} = await client(`/blogPost/posts?pageNo=${pageNo}&limit=${limit}`);
        //{console.log(data.title)}
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }

        return {error: error.message || error};  
    }
};

export const deletePost = async (postId) => {
    try{
        console.log(postId)
        const {data} = await client.delete(`/blogPost/${postId}`);
        //{console.log(data)}
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }

        return {error: error.message || error};  
    }
}

export const searchPost = async (query) => {
    try{
        const {data} = await client(`/blogPost/search?title=${query}`);
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }

        return {error: error.message || error};  
    }
}

export const uploadImage = async (formData) => {
    try{
        const {data} = await client.post(`blogPost/upload-image`, formData);
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }
        
        return {error: error.message || error};  
    }
}
// var  daa =  {
//     title:"kuiuguiib", 
//     content:"asfa",    
//     meta:"adfadf",
//     thumbnail : "",
//     author : "sfasf",
//     tags: ["sfadsf"],


// };

export const createPost = async (formData) => {
    console.log(formData)
    const {title,content , featured, tags, meta,author , thumbnail} = formData;
    const slug = title
            .toLowerCase()
            .replace(/[^a-zA-Z]/g, ' ')
            .split(' ')
            .filter(item => item.trim())
            .join('-');

         const newTags = tags
            .split(',')
            .map(item => item.trim())
            .splice(0, 4);
        /*var st = "[";
        for (var i = 0; i < newTags.length; i++)
         { //console.log([i]);
            st = st + newTags[i];
        
        }*/


        console.log(slug);
        console.log(`${tags}`)

    fetch("http://localhost:4848/api/blogPost/create", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        title: title, 
        content:content,    
        meta:meta,
        thumbnail : thumbnail,
        author : author,
        slug : slug,
        tags:  JSON.stringify(newTags)
        ,
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => console.log(json));


   // const myJSON = JSON.stringify(formData);
   // console.log(myJSON);
    // try{
    //     //const {data} = await client.post(`blogPost/create`, formData);
    //     //daa = data
    //     return JSON(daa)
        
    //     //return data;
    // }catch(error){
    //     const { response } = error;
        
    //     if(response?.data){
    //         return response.data;
    //     }
        
    //     return {error: error.message || error};  
    // }
}


export const getPost = async (slug) => {
    try{
        const {data} = await client(`blogPost/single/${slug}`);
        return data;
    }catch(error){
        const { response } = error;

        if(response?.data){
            return response.data;
        }

        return {error: error.message || error};  
    }
}

export const updatePost = async (postId, formData) => {
    /*const {title,content , featured, tags, meta,author , thumbnail } = formData;

    const newTags = tags
            .split(',')
            .map(item => item.trim())
            .splice(0, 4);
    console.log(postId)

    fetch("http://localhost:4848/api/blogPost/${postId}", {
     
        // Adding method type
        method: "PUT",
         
        // Adding body or contents to send
        body: JSON.stringify({
            title: title, 
            content:content,    
            meta:meta,
            thumbnail : thumbnail,
            author : author,
            
            tags:  JSON.stringify(newTags)
            ,
        }),

       /* body: JSON.stringify({
            title:"kuiuguiib12213e3", 
            content:"sfa",    
            meta:"dfadf",
            thumbnail : "",
            author : "efasf",
            slug : "1_xx213e123adfdsf",
            tags: `["sd"]`  ,
        }),
         
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
     
    // Converting to JSON
    .then(response => response.json())
     
    // Displaying results to console
    .then(json => console.log(json));*/
    

     try
    {
         //console.log("fromdatra hai",formData)
        const {data} = await client.put(`blogPost/${postId}`, formData);
       // console.log()
         return data;
     }catch(error){
         const { response } = error;

       if(response?.data){
           return response.data;
        }

        return {error: error.message || error};  
     }
}