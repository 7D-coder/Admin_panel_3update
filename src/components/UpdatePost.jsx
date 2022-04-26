import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { updatePost , getPost } from "./api/post";
import PostForm from "./PostForm";
import defaultPost from "./PostForm";

function UpdatePost() {
    const [busy, setBusy] = useState(false);
    const [postInfo, setPostInfo] = useState({...defaultPost});
    const [notFound, setNotFound] = useState(false);
    const {slug} = useParams();

   const fetchPost = async() => {
        const {error, post} = await getPost(slug)

        if(error){ 
            setNotFound(true);    
            return console.log(`error`)
        };

        setPostInfo({...post, tags: post.tags?.join(', ')})
    }

    useEffect(() => {
        fetchPost()
    }, []) 

    const handleSubmit = async (data) => {
        setBusy(true);
        // create post is a backend metho 
        const {error, post} = await updatePost(postInfo.id, data);
        
        setBusy(true);
        
        if(error) return console.log("Create post error");

        setPostInfo({...post, tags: post.tags?.join(', ')});
    };

    if(notFound){
        return < notFound />;
    }
    
    return (
        <PostForm onSubmit={handleSubmit} initialPost={postInfo} busy={busy} postBtnTitle='Update'/>
    )
}

export default UpdatePost;