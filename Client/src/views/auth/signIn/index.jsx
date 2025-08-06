import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  chakra,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/Black White Modern Elegant Simple Creative Studio Logo-2.png";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import { postApi } from "services/api";
import { loginSchema } from "schema";
import { toast } from "react-toastify";

const MotionBox = motion(chakra.div);
const MotionCheckbox = motion(Checkbox);
const MotionButton = motion(Button);

const bgAnimation = {
  animate: {
    scale: [1, 1.02, 1],
    y: [0, -3, 0],
    transition: {
      duration: 25,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

function SignIn() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = useColorModeValue("gray.500", "gray.400");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const formBg = useColorModeValue("whiteAlpha.900", "gray.800");
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkBox, setCheckBox] = React.useState(true);

  const [show, setShow] = React.useState(false);
  const showPass = () => setShow(!show);

  const initialValues = { username: "", password: "" };
  const navigate = useNavigate();

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: () => login(),
  });

  const login = async () => {
    try {
      setIsLoading(true);
      const response = await postApi("api/user/login", values, checkBox);
      if (response && response.status === 200) {
        navigate("/admin");
        toast.success("Login Successfully!");
        resetForm();
      } else {
        toast.error(response.response?.data?.error || "Login failed");
      }
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <DefaultAuth>
      <Flex
        minH="100vh"
        flexDirection={{ base: "column", md: "row" }}
        bg={useColorModeValue("gray.50", "gray.900")}
      >
        {isDesktop && (
          <MotionBox
            flexBasis="40%"
            position="relative"
            overflow="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            variants={bgAnimation}
            bgGradient="linear(to-b, brand.400, brand.500)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="10"
          >
            <Image
              src={illustration}
              alt="Login Illustration"
              maxW="100%"
              maxH="90vh"
              userSelect="none"
              draggable={false}
              filter="drop-shadow(0 4px 12px rgba(0,0,0,0.25))"
            />
          </MotionBox>
        )}

        <Flex
          flexBasis={isDesktop ? "60%" : "100%"}
          align="center"
          justify="center"
          px={{ base: "6", md: "12" }}
          py={{ base: "12", md: "24" }}
          bg={formBg}
          boxShadow={{ base: "none", md: "lg" }}
          position="relative"
          zIndex={10}
        >
          <Box
            maxW="420px"
            w="full"
            borderRadius="lg"
            p={{ base: 6, md: 10 }}
            bg={formBg}
            boxShadow="xl"
          >
            <Heading
              as="h1"
              size="2xl"
              mb="4"
              fontWeight="bold"
              color={textColor}
            >
              Welcome Back
            </Heading>
            <Text
              mb="8"
              fontSize="lg"
              fontWeight="medium"
              color={textColorSecondary}
            >
              Please enter your email and password to sign in.
            </Text>

            <form onSubmit={handleSubmit} noValidate>
              <FormControl
                isInvalid={errors.username && touched.username}
                mb="6"
              >
                <FormLabel fontWeight="semibold" color={textColor}>
                  Email <Text as="span" color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  type="email"
                  name="username"
                  placeholder="you@example.com"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="lg"
                  fontSize="md"
                  borderColor={
                    errors.username && touched.username ? "red.400" : "gray.300"
                  }
                  _focus={{
                    borderColor: "brand.500",
                    boxShadow: "0 0 5px 2px rgba(72, 187, 120, 0.6)",
                  }}
                  autoComplete="username"
                />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.password && touched.password}
                mb="6"
              >
                <FormLabel fontWeight="semibold" color={textColor}>
                  Password <Text as="span" color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="lg"
                    fontSize="md"
                    borderColor={
                      errors.password && touched.password ? "red.400" : "gray.300"
                    }
                    _focus={{
                      borderColor: "brand.500",
                      boxShadow: "0 0 5px 2px rgba(72, 187, 120, 0.6)",
                    }}
                    autoComplete="current-password"
                  />
                  <InputRightElement>
                    <Icon
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      cursor="pointer"
                      color={textColorSecondary}
                      onClick={showPass}
                      boxSize={5}
                      _hover={{ color: "brand.500" }}
                      transition="color 0.2s"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Flex justify="space-between" align="center" mb="6">
                <MotionCheckbox
                  isChecked={checkBox}
                  onChange={(e) => setCheckBox(e.target.checked)}
                  colorScheme="brandScheme"
                  me="2"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 8px rgba(72,187,120,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Text fontSize="sm" userSelect="none" cursor="pointer">
                    Keep me logged in
                  </Text>
                </MotionCheckbox>
              </Flex>

              <MotionButton
                type="submit"
                w="full"
                h="50px"
                fontSize="md"
                fontWeight="bold"
                colorScheme="brandScheme"
                isLoading={isLoading}
                loadingText="Signing in..."
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 6px 12px rgba(72,187,120,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Sign In
              </MotionButton>
            </form>
          </Box>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;

