
import { useMutationQuery } from "@/hooks/useMutationQuery";
import { TLoginArg, TLoginRes, TRegisterArg, TRegisterRes } from "@/models/auth";
import { getBaseUrl } from "@/utils/req";

export const useSignIn = () => {
  return useMutationQuery<TLoginRes, TLoginArg>({
    mutationParams: {
      url: getBaseUrl("/auth/sign-in"),
      method: "POST",
    },
  });
};

export const useSignUp = () => {
    return useMutationQuery<TRegisterRes, TRegisterArg>({
      mutationParams: {
        url: getBaseUrl("/auth/sign-up"),
        method: "POST",
      },
    });
  };
  