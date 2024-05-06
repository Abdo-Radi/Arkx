import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Container,
  Divider,
  Grid,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as routerLink, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineRollback, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ROOT } from "../../lib/routes";
import Navbar from "./Navbar";

export default function CurrentPost() {
  const { postId } = useParams();
  const [currentPost, setCurrentPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/post/${postId}`);
        setCurrentPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching current post:", error);
        setIsLoading(false);
      }
    };

    fetchCurrentPost();
  }, [postId]);

  
  return (
    <>
      <Navbar />
      <motion.div layout>
        <Container maxW={"7xl"} p="12">
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              colorScheme="#319594"
              as={routerLink}
              to={ROOT}
              size="lg"
              icon={<AiOutlineRollback />}
              isRound
              variant="ghost"
            />
          </motion.button>
          {!isLoading ? (
            <>
              <Heading as="h2">{currentPost.title}</Heading>
              
              <Divider marginTop="5" />
              <Grid
                templateColumns="repeat(auto-fill, minmax(100%, 1fr))"
                gap={6}
                marginTop="5"
              >
                <GridItem>
                  <Box w="100%">
                    <Box borderRadius="lg" overflow="hidden">
                      <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                        <Image
                          transform="scale(1.0)"
                          src={currentPost.image}
                          alt="blog image here"
                          width="100%"
                          height={"60vh"}
                          objectFit="cover"
                          transition="0.3s ease-in-out"
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                        />
                      </Link>
                    </Box>
                    <Text as="p" fontSize="md" marginTop="2">
                      {currentPost.content}
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </>
          ) : (
            <Box>Loading...</Box>
          )}
        </Container>
      </motion.div>
    </>
  );
}
