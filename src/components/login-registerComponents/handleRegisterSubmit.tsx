import { useNavigate } from "react-router-dom";
import { RegisterFormData } from "./registerSchema";
import { UseFormReturn } from "react-hook-form";

type HandleRegisterSubmitProps = {
  formMethods: UseFormReturn<RegisterFormData>;
  registerMutation: any;
  setIsRegistering: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
}
export const useRegisterSubmit = ({
  formMethods,
  registerMutation,
  setIsRegistering,
  setErrorMessage,
}: HandleRegisterSubmitProps) => {
  const navigate = useNavigate();
  
  const handleRegisterSubmit = async () => {
    try {
      setIsRegistering(true);
      const formData = formMethods.getValues();
      
      const formattedData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
        storePhone: formData.storePhone ? Number(formData.storePhone) : undefined,
      };
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      //TODO: DESCOMENTAR UNA VEZ TENGAMOS EL BACKEND
      // await registerMutation.mutateAsync(formattedData);
      
      console.log("Registration successful!");
      setIsRegistering(false);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration error:", error);
      setIsRegistering(false);
    }
  };

  return { handleRegisterSubmit };
};
   