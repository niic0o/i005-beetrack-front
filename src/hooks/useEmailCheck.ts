import { useState } from "react";

export const useEmailCheck = (emailCheckMutation: any) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  
  const checkEmailExists = async (email: string, setErrorMessage: (msg: string) => void) => {
    if (!email) return false;
    
    setIsCheckingEmail(true);
    setErrorMessage("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const existingEmails = ['test@example.com', 'admin@example.com'];
      const exists = existingEmails.includes(email);
      
      if (exists) {
        setErrorMessage("Email already exists");
        setIsCheckingEmail(false);
        return false;
      }
      
      setIsCheckingEmail(false);
      return true;
    } catch (error) {
      setErrorMessage("Error comprobando el email. Por favor intentolo de nuevo");
      setIsCheckingEmail(false);
      return false;
    }

    // TODO: DESCOMENTAR UNA VEZ TENGAMOS EL BACKEND
    // try {
    //   const exists = await emailCheckMutation.mutateAsync(email);
    //   if (exists) {
    //     setErrorMessage("Email already exists");
    //     setIsCheckingEmail(false);
    //     return false;
    //   }
    //   setIsCheckingEmail(false);
    //   return true;
    // } catch (error) {
    //   setErrorMessage("Error comprobando el email. Por favor intentolo de nuevo");
    //   setIsCheckingEmail(false);
    //   return false;
    // }
  };

  return { isCheckingEmail, checkEmailExists };
};