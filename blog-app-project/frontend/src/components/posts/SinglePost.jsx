import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Avatar,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { AiTwotoneHeart, AiOutlineHeart, AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { Link as routerLink } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

const SinglePost = ({ post, onEdit }) => {
  const [user, setUser] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to store error
  useEffect(() => {
    // Function to fetch user data
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${post.uid}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error.message); // Set error state if request fails
      }
    };

    fetchUser(); // Call the fetchUser function
  }, [post.uid]); // Fetch user data when post.uid changes

  // Simulated authentication check
  const authLoading = false; // Set to false assuming authentication is already done

  const { id, likes = [] } = post; // Ensure likes is initialized as an empty array
  const isLiked = likes.includes(user?.id);

  const toggleLike = async () => {
    // Implement toggleLike functionality here
    // Example: Send a request to the backend to toggle like status
    console.log("Toggling like...");
  };

  return (
    <>
      <Box w="100%" key={post.title}>
        <Box borderRadius="lg" overflow="hidden">
          <Link
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Image
              transform="scale(1.0)"
              src={post.image}
              alt="some text"
              width="100%"
              objectFit="cover"
              height={"400px"}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Link>
        </Box>
        <Heading fontSize="xl" marginTop="2">
          <Link
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            as={routerLink}
            to={`/posts/${post._id}`}
          >
            {post.title}
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2">
          {post.content ? post.content.substring(0, 150) : ''}
        </Text>
        <Box mt={"10px"}>
          <Flex align={"center"}>
            <Avatar name={user?.username} size={"sm"} />
            <Text casing={"capitalize"}>
              <span style={{ paddingLeft: "10px" }}>
                {post.date ? formatDistanceToNow(new Date(post.date)) + ' ago' : ''}
              </span>
            </Text>
            <IconButton
              colorScheme="red"
              onClick={toggleLike}
              isLoading={authLoading}
              size="md"
              icon={isLiked ? <AiTwotoneHeart /> : <AiOutlineHeart />}
              isRound
              variant="ghost"
            />
            <Text> {likes.length}</Text>
            {user && (
              <>
                <IconButton
                  colorScheme="red"
                  size="lg"
                  icon={<AiFillDelete />}
                  isRound
                  onClick={deletePost}
                  isLoading={deleteLoading}
                  variant="ghost"
                />
                <IconButton
                  colorScheme="blue"
                  size="lg"
                  icon={<AiOutlineEdit />}
                  isRound
                  onClick={() => onEdit(post._id)}
                  variant="ghost"
                />
              </>
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default SinglePost;
