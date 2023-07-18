import {
  Card,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import { useToast } from "@chakra-ui/react";

function Login() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const { user, signIn } = useContext(AuthContext);

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(username, password);
      navigate("/file");
    } catch (error) {
      toast({
        title: "An error occured while signing in",
        description: `${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (user) {
    return <Navigate to="/file" />;
  }

  return (
    <Card
      minW="30rem"
      minH="20rem"
      padding="5rem"
      margin="3rem"
      bg="rgba(105, 238, 194, 0.3)"
    >
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Input
              borderColor="teal"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputGroup size="md">
              <Input
                borderColor="teal"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button colorScheme="teal" variant="solid" type="submit">
              Log In
            </Button>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
}

export default Login;
