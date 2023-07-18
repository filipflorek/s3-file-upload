import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";
import { useContext } from "react";

export default function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("login");
  };

  const { user } = useContext(AuthContext);
  return (
    <Card
      minW="30rem"
      minH="20rem"
      padding="5rem"
      margin="3rem"
      bg="rgba(105, 238, 194, 0.3)"
    >
      <Stack spacing={3}>
        <CardHeader>
          <Heading size="md">Welcome to MIS file upload tool!</Heading>
        </CardHeader>
        <CardBody>
          <Button
            width="100%"
            colorScheme="teal"
            variant="solid"
            onClick={handleClick}
          >
            {user ? "Upload Files" : "Log In"}
          </Button>
        </CardBody>
      </Stack>
    </Card>
  );
}
