import { Editor } from "@tinymce/tinymce-react";
const TxtEditor = () => {
  return (
    <>
      <Editor
        apiKey="kz9lwdukc4g18wi7o12awvtrthcdjghclcnlds8a161ybk4a"
        init={{
          plugins: "link image code",
          toolbar:
            "undo redo | bold italic | alignleft aligncenter alignright | code",
        }}
        onChange={(e) => console.log(e.target.getContent())}
      />
    </>
  );
};

export default TxtEditor;
