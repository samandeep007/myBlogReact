import React, { useCallback, useEffect } from "react";
import { Input, Select, Button, RTE } from "../index.js";
import appwriteService from "../../appwrite/config.js"; //service contains createPost and updatePost methods
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { handleSubmit, register, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    }); //watch is a function that watches the value of the input field

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); //useSelector accepts a function that takes the state as an argument and returns the part of the state that you want to access

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.fileUpload(data.image[0])
        : null; //Always do the file upload first
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/posts/${dbPost.$id}`); //navigate to the posts page
      }
    } else {
      const file = data.image[0]
        ? appwriteService.fileUpload(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        }); //appwriteService.createPost(data, id) is a function that creates a post in the database
        if (dbPost) {
          navigate(`/posts/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value)=>{
    if(value && typeof value === 'string'){
      return value.trim().toLowerCase().replace(/^[a-zA-z\d\s]+/g, '-').replace(/\s/g, '-'); //replace all spaces with a hyphen
    }
    return '';
  }, [])

  useEffect(()=>{
    const subscription = watch((value, {name})=>{
        if(name === 'title'){
            setValue('slug', slugTransform(value.title, {shouldValidate: true})) //setValue is a function that sets the value of the input field
        }
    }) //optimization to avoid re-rendering the component when the value of the input field changes
    return () => subscription.unsubscribe()

  }, [watch, slugTransform, setValue])


  return  <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
  <div className="w-2/3 px-2">
      <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
      />
      <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true }); //it is setting the value of the slug field to the value of the title field and transforming it
          }}
      />
      <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
  </div>
  <div className="w-1/3 px-2">
      <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
      />
      {post && (
          <div className="w-full mb-4">
              <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
              />
          </div>
      )}
      <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
      />
      <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
      </Button>
  </div>
</form>
}
