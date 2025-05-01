
import { useState } from "react";
import { toast } from "sonner";
import { UserRole } from "@/lib/types/userTypes";
import { createUser } from "@/services/userService";
import { UserFormValues } from "../forms/userFormSchema";

interface UseUserFormSubmitProps {
  onSuccess: () => void;
}

export const useUserFormSubmit = ({ onSuccess }: UseUserFormSubmitProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: UserFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createUser({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role as UserRole
      });

      if (result.success) {
        toast.success(result.message);
        onSuccess();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to create user");
      console.error("Error creating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};
