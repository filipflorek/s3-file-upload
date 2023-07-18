import { ListItem, Spinner, Tooltip } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

export default function FileItem({ file }) {
  const [fileDetails, setFileDetails] = useState(file);

  const uploadStatusIcon = (status) => {
    switch (status) {
      case "error":
        return <WarningIcon color="red.500" marginRight="1rem" />;
      case "success":
        return <CheckCircleIcon color="green.500" marginRight="1rem" />;
      case "in progress":
        return (
          <Spinner
            size="sm"
            color="green.500"
            speed="0.8s"
            marginRight="1rem"
          />
        );
      default:
        return <></>;
    }
  };

  useEffect(() => {
    setFileDetails(file);
  }, [file]);

  return (
    <ListItem display="flex" alignItems="center">
      <Tooltip label={fileDetails.uploadMessage} fontSize="md">
        {uploadStatusIcon(fileDetails.uploadStatus)}
      </Tooltip>
      {fileDetails.file.name}
    </ListItem>
  );
}
