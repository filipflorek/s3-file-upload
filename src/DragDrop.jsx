import { Button, Card, Stack, Center, List } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { useToast } from "@chakra-ui/react";
import { uploadImage } from "./s3Uploader";
import { v4 as uuidv4 } from "uuid";
import FileItem from "./FileItem";

export default function DragDrop() {
  const { user, signOut } = useContext(AuthContext);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const toast = useToast();

  const handleClick = () => {
    signOut();
  };

  const handleFileDrop = async (event) => {
    event.preventDefault();
    const items = event.dataTransfer.items;
    const files = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry();
      if (item) {
        await traverseFilesTreeAndFilterImages(item, files);
      }
    }

    const filesWithDetails = files.map((file) => {
      return {
        id: uuidv4(),
        file: file,
        uploadStatus: "ready",
        uploadMessage: "Image ready for upload",
      };
    });

    setDroppedFiles((previousFiles) => [...previousFiles, ...filesWithDetails]);
  };

  const uploadFiles = async () => {
    const filesInProgress = droppedFiles
      .filter((fileDetails) => fileDetails.uploadStatus !== "success")
      .map((fileDetails) => ({
        ...fileDetails,
        uploadStatus: "in progress",
      }));

    setDroppedFiles(filesInProgress);

    const uploadedFiles = await Promise.all(
      filesInProgress.map(async (fileDetails) => {
        try {
          await uploadImage(fileDetails.file);
          return {
            ...fileDetails,
            uploadStatus: "success",
            uploadMessage: "Image uploaded successfully",
          };
        } catch (error) {
          return {
            ...fileDetails,
            uploadStatus: "error",
            uploadMessage: error.message,
          };
        }
      })
    );

    setDroppedFiles(uploadedFiles);
  };

  const clearList = () => {
    setDroppedFiles(
      droppedFiles.filter(
        (fileDetails) => fileDetails.uploadStatus !== "success"
      )
    );
  };

  const traverseFilesTreeAndFilterImages = async (item, files) => {
    if (item.isFile) {
      return new Promise((resolve) => {
        item.file((file) => {
          if (file.type.startsWith("image/")) {
            files.push(file);
          }
          resolve();
        });
      });
    } else if (item.isDirectory) {
      const directoryReader = item.createReader();
      const entries = await new Promise((resolve) => {
        directoryReader.readEntries((entries) => {
          resolve(entries);
        });
      });

      for (let i = 0; i < entries.length; i++) {
        await traverseFilesTreeAndFilterImages(entries[i], files);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Card
      minW="30rem"
      minH="20rem"
      padding="5rem"
      margin="3rem"
      bg="rgba(105, 238, 194, 0.3)"
    >
      <Stack spacing={3}>
        <Center
          padding="3rem"
          width="100%"
          minHeight="10rem"
          borderStyle="dashed solid"
          borderWidth="2px"
          borderColor="teal"
          borderRadius="lg"
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
        >
          Drag & drop files you wish to upload, {user.username}!
        </Center>
        <List spacing={3}>
          {droppedFiles.map((file) => {
            return <FileItem key={file.id} file={file} />;
          })}
        </List>
        <Button width="100%" colorScheme="teal" onClick={uploadFiles}>
          Upload files
        </Button>
        <Button width="100%" colorScheme="teal" onClick={clearList}>
          Clear successfully uploaded files
        </Button>
        <Button width="100%" colorScheme="teal" onClick={handleClick}>
          Sign out
        </Button>
      </Stack>
    </Card>
  );
}
