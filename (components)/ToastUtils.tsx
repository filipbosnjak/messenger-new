import React from "react";
import { ToastAction } from "@/components/ui/toast";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type RegisterSuccessProps = {
  email: string;
  password: string;
};

export const SuccessfulRegistrationToast = (
  router: AppRouterInstance,
  data: RegisterSuccessProps,
) => {
  toast({
    title: "User registration successful!",
    description: "Yaay! You have successfully registered.",
    action: (
      <ToastAction
        onClick={() => {
          signIn("credentials", {
            callbackUrl: "/",
            email: data.email,
            password: data.password,
          }).then((r) => {});
          router.push("/");
        }}
        altText="Home"
      >
        Home
      </ToastAction>
    ),
  });
};

export const MessageSentSuccessfulyToast = () => {
  toast({
    title: "Message sent successfully!",
    description: "",
    action: <ToastAction altText="Home">OK</ToastAction>,
  });
};

export const SomethingWentWrongToast = (message: String) => {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: `There was a problem with your request: ${message}`,
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
};
