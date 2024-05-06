import axios from 'axios';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react'; // Import useToast here

export function useAddPost() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    async function addPost(post) {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/posts/postRouter', post);
            console.log(response.data); // Assuming your backend sends back a success message
            toast({
                title: "Post added successfully!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
        } catch (error) {
            console.error(error); // Log the error
            toast({
                title: "Failed to add post",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
        }
        setLoading(false);
    }

    return { addPost, isLoading };
}

export function usePosts(uid = null) {
    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get( `http://localhost:3000/post` );
                setPosts(response.data);
            } catch (error) {
                console.error(error); // Log the error
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    return { posts, isLoading, error };
}

export function useToggleLike({ id, isLiked, uid }) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    async function toggleLike() {
        setLoading(true);
        try {
            const response = await axios.patch(`http://localhost:3000/post/${id}`, { isLiked, uid });
            console.log(response.data); // Assuming your backend sends back a success message
        } catch (error) {
            console.error(error); // Log the error
            toast({
                title: "Failed to toggle like",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
        }
        setLoading(false);
    }

    return { toggleLike, isLoading };
}

export function useDeletePost(id) {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    async function deletePost() {
        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:3000/posts/${id}`);
            console.log(response.data); // Assuming your backend sends back a success message
            toast({
                title: "Post deleted!",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
        } catch (error) {
            console.error(error); // Log the error
            toast({
                title: "Failed to delete post",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
        }
        setLoading(false);
    }

    return { deletePost, isLoading };
}
