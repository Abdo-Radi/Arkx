import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Link,
  Text,
  Stack,
  Button,
  IconButton,
  useToast,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SinglePost from "../posts/SinglePost";
import { useForm } from "react-hook-form";

export default function PostList() {
  const { handleSubmit, register } = useForm();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const toast = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/post");
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [isDeleted]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/post/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      toast({
        title: "Post Deleted",
        status: "success",
        isClosable: true,
      });
      setIsDeleted(!isDeleted);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error Deleting Post",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleEdit = (postId) => {
    const foundPost = posts.find((post) => post._id === postId);
    setCurrentPost(foundPost);
    setIsEditing(true);
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleEditPost = async (editedData) => {
    try {
      if (!currentPost || !currentPost._id) {
        throw new Error("No current post or post ID found.");
      }

      const response = await axios.put(
        `http://localhost:3000/post/${currentPost._id}`,
        editedData
      );
      setPosts(posts.map((post) => (post._id === currentPost._id ? response.data : post)));
      setIsEditing(false);
      setCurrentPost(null);
      setIsEditModalOpen(false); // Close the edit modal
      toast({
        title: "Post Updated",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error editing post:", error);
      toast({
        title: "Error Updating Post",
        status: "error",
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Box pos="absolute" top="50%" left="50%">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>
      <Divider marginTop="5" />
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 2fr))" gap={6} marginTop="5">
        {posts.map((post) => (
          <GridItem key={post._id}>
            <motion.div layout>
              <SinglePost post={post} />
              <Box marginTop="2">
                <IconButton
                  colorScheme="red"
                  icon={<AiOutlineDelete />}
                  aria-label="Delete"
                  onClick={() => handleDelete(post._id)}
                  marginRight="2"
                />
                <IconButton
                  colorScheme="blue"
                  icon={<AiOutlineEdit />}
                  aria-label="Edit"
                  onClick={() => handleEdit(post._id)}
                />
              </Box>
            </motion.div>
          </GridItem>
        ))}
      </Grid>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleEditPost)}>
              <FormControl id="title">
                <FormLabel>Blog Title</FormLabel>
                <Input
                  type="text"
                  defaultValue={currentPost?.title}
                  {...register("title", { required: true, maxLength: 120 })}
                />
                <FormHelperText>Eg: The Art of Effective Communication</FormHelperText>
              </FormControl>
              <FormControl id="image">
                <FormLabel> Image URL</FormLabel>
                <Input
                  type="url"
                  defaultValue={currentPost?.image}
                  {...register("image", { required: true })}
                />
                <FormHelperText>
                  <Link
                    onClick={() => {
                      navigator.clipboard.writeText("https://picsum.photos/200/300/");
                      toast({
                        title: "URL Copied",
                        status: "success",
                        isClosable: true,
                        position: "top",
                        duration: 2000,
                      });
                    }}
                  >
                    Eg: https://picsum.photos/200/300/
                  </Link>
                  <div>
                    <Text as="mark">Copy image link by click</Text>
                  </div>
                </FormHelperText>
              </FormControl>
              <FormControl id="content">
                <FormLabel> Description</FormLabel>
                <Textarea
                  defaultValue={currentPost?.content}
                  placeholder='I know writing can be tough, Just type "blah blah blah" to test things out!'
                  {...register("content", { required: true })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  mt={"10px"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isLoading}
                  loadingText={"Loading..."}
                >
                  Update Post
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
