import React from "react";
import { Editor } from "@tinymce/tinymce-react"; //Importing the Editor component from the tinymce-react package
import { Controller } from "react-hook-form"; //Controller is a component from the react-hook-form package that allows us to integrate the editor with the form

function RTE({ name, control, label, defaultValue = "" }) {
  //RTE = Rich Text Editor --> control is a prop that is passed to the RTE component. It is used to control the form state
  return (

      <div className="w-full">
        {label && <label className="inline-block mb-1 pl-1">{label}</label>}\
        <Controller 
        name={name || "content"} 
        control={control} 
        render={({field: {onChange}}) => { 
            return (
                <Editor
                apiKey="2pf243pqb10e7r7iwm9l4qm08wj5zcwjraqroys34sjd5gmp"
                initialValue={defaultValue}//
                init={
                  //init is an object that contains the configuration options for the editor. it accepts an object with the configuration options for the editor
                  {
                    branding: false, //branding: false removes the tinymce branding
                    height: 500, //height: 500 sets the height of the editor to 500px
                    menubar: true,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ], //refer to the documentation for more information on the plugins option
                    toolbar: ["undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"], 
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }", //content_style is used to apply styles to the content of the editor
                  }
                }
                onEditorChange={onChange} //onEditorChange is a callback function that is called when the editor content changes. It takes the new content as an argument
              />);
        }}
        />
      </div>
  
  );
}

export default RTE;
