import { postProduct} from "../../../api";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { FieldArray, Formik } from "formik";
import validationSchema from "./validationSchema";
import { message } from "antd";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
function NewProduct() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),    
  });
  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_added" });

    const newValues={
      ...values,
      photos:JSON.stringify(values.photos),
    };
      newProductMutation.mutate(newValues,{
        onSuccess:()=>{
          message.success({
            content: "The product successfuly added",
            key: "product_added",
            duration: 2,
          });         

        }
      });    
  };
   return (
    <div>
      <Text m={5} fontSize="2xl">
        Add New Product
      </Text>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my="5" textAlign={"left"}>
                <form onSubmit={handleSubmit}>
                  <FormControl mt={"4"}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                    {touched.title && errors.title && (
                      <Text color={"red.500"}>{errors.title}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={"4"}>
                    <FormLabel>Description</FormLabel>
                    <Input
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                    {touched.description && errors.description && (
                      <Text color={"red.500"}>{errors.description}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={"4"}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                    {touched.price && errors.price && (
                      <Text color={"red.500"}>{errors.price}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={"4"}>
                    <FormLabel>Photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Input
                                  name={`photos.${index}`}
                                  value={photo}
                                  onChange={handleChange}
                                  disabled={isSubmitting}
                                  width="6xl"
                                />
                                <Button
                                  ml={4}
                                  colorScheme={"red"}
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          <Button
                            mt={5}
                            colorScheme="teal"
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add a Photo
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>

                  <Button
                    mt="4"
                    width={"full"}
                    type={"submit"}
                    isLoading={isSubmitting}
                    colorScheme={"whatsapp"}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default NewProduct;
