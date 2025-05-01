
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { userFormSchema, UserFormValues } from "./forms/userFormSchema";
import { PersonalInfoFields } from "./forms/PersonalInfoFields";
import { RoleSelector } from "./forms/RoleSelector";
import { DialogFooterActions } from "./forms/DialogFooterActions";
import { useUserFormSubmit } from "./hooks/useUserFormSubmit";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserCreated: () => void;
}

export function AddUserDialog({ open, onOpenChange, onUserCreated }: AddUserDialogProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "buyer"
    },
  });

  const { handleSubmit, isSubmitting } = useUserFormSubmit({
    onSuccess: () => {
      form.reset();
      onUserCreated();
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account with specified role.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <PersonalInfoFields />
            <RoleSelector />
            <DialogFooterActions 
              onClose={() => onOpenChange(false)}
              isSubmitting={isSubmitting}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
