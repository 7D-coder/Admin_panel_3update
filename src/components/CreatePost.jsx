import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import PostForm, {defaultPost} from './PostForm';
import  { createPost } from './api/post';

export default function CreatePost() {
    const [postInfo, setPostInfo] = useState({...defaultPost});
    const [busy, setBusy] = useState(false);
    const [resetAfterSubmit, setResetAfterSubmit] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setBusy(true);
        // create post is a backend method
       //{console.log(data)}
        const {error, post} = await createPost(data);
        
        setBusy(true);
        
        if(error) return console.log("Create post error");

        setResetAfterSubmit(true);
        navigate(`/update-post/${post.slug}`)
    };

    useEffect(() => {
        const result = localStorage.getItem('blogPost');

        if(!result) return

        const oldPost = JSON.parse(result);
        setPostInfo({...defaultPost, ...oldPost});
    }, [])

    return (
        <PostForm onSubmit= { () => handleSubmit(postInfo) } initialPost={postInfo} busy={busy} postBtnTitle="Post" resetAfterSubmit={resetAfterSubmit}/>
    )

    // return(
    //     <div>
    //         Create Post;
    //     </div>
    // )
}