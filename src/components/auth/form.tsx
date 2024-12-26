/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Paper,
  TextInput,
  PasswordInput,
  Title,
  Text,
  Space,
  Anchor,
  Box,
  Center,
  InputError,
} from "@mantine/core";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn, useSignUp } from "@/query/auth";
import { useAuth } from "@/lib/auth/auth.hooks";
import { setCookieSession } from "@/lib/auth/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
const LoginForm = () => {
  const schema = z.object({
    phoneNumber: z.string().min(10, "Phone number least 10 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  type FormValues = z.infer<typeof schema>;
  const { mutateAsync, isPending } = useSignIn();
  const router = useRouter().push;
  const { setSession } = useAuth();
  const callbackUrl = useSearchParams().get("callback");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await mutateAsync(data)
      .then(async (data) => {
        const session = {
          account: data.currentUser,
          user: data.currentUser,
          token: {
            accessToken: data.accessToken,
          },
        };
        await setCookieSession(session);
        await setSession(session);
        if (callbackUrl) {
          router(callbackUrl);
        } else {
          router("/");
        }
      })
      .catch((error: any) => {
        const message = error?.message;
        setError("root", {
          message: message ?? "Invalid Credentials",
          type: "validate",
        });
      });
  };

  return (
    <Box className="flex-1">
      <Center>
        <InputError>{errors.root?.message}</InputError>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Phone number"
          placeholder="Enter your phone number"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
          className="mt-4"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
          className="mt-4"
        />
        <Button fullWidth type="submit" className="mt-6 " loading={isPending}>
          Login
        </Button>
      </form>
      <Space h="md" />
      <Text size="xs" className="text-center">
        Forgot your password?{" "}
        <Anchor
          component={Link}
          href={"/auth/forgot-password"}
          className=" cursor-pointer hover:underline"
        >
          Reset here
        </Anchor>
      </Text>
      <Text size="xs" className="text-center mt-2">
        Don&apos;t have an account?{" "}
        <Anchor
          component={Link}
          href={"/auth/register"}
          className=" cursor-pointer hover:underline"
        >
          Register
        </Anchor>
      </Text>
    </Box>
  );
};

const RegisterForm = () => {
  const schema = z.object({
    firstName: z.string().min(2, "Name must be at least 2 characters long"),
    lastName: z.string().min(2, "Name must be at least 2 characters long"),
    phoneNumber: z.string().min(10, "Phone number least 10 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  type FormValues = z.infer<typeof schema>;
  const { mutateAsync, isPending } = useSignUp();

  const router = useRouter().push;
  const { setSession } = useAuth();
  const callbackUrl = useSearchParams().get("callback");
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    await mutateAsync(data)
      .then(async (data) => {
        const session = {
          account: data.newUser,
          user: data.newUser,
          token: {
            accessToken: data.accessToken,
          },
        };
        await setCookieSession(session);
        await setSession(session);
        if (callbackUrl) {
          router(callbackUrl);
        } else {
          router("/");
        }
      })
      .catch((error: any) => {
        const message = error?.message;
        setError("root", {
          message: message ?? "Invalid Credentials",
          type: "validate",
        });
        if (message === "Phone number already taken") {
          setError("phoneNumber", {
            message: "Already taken",
            type: "validate",
          });
          setFocus("phoneNumber");
        }
        if (message.includes("password")) {
          setError("password", {
            message: "Invalid Password",
            type: "validate",
          });
          setFocus("password");
        }
      });
  };

  return (
    <Box className="flex-1">
      <Center>
        <InputError>{errors.root?.message}</InputError>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          placeholder="Enter your first name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter your last name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <TextInput
          label="Phone number"
          placeholder="Enter your phone number"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
          className="mt-4"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
          className="mt-4"
        />
        <Button fullWidth type="submit" className="mt-6 " loading={isPending}>
          Register
        </Button>
      </form>
      <Space h="md" />
      <Text size="xs" className="text-center">
        Already have an account?
        <Anchor
          component={Link}
          href={"/auth/login"}
          className=" cursor-pointer hover:underline"
        >
          Login
        </Anchor>
      </Text>
    </Box>
  );
};

const ForgotPasswordForm = () => {
  const schema = z.object({
    phoneNumber: z.string().min(10, "Phone number least 10 characters"),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Forgot Password Data:", data);
  };

  return (
    <Box className="flex-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Phone number"
          placeholder="Enter your phone number"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
          className="mt-4"
        />
        <Button fullWidth type="submit" className="mt-6 ">
          Reset Password
        </Button>
      </form>
      <Space h="md" />
      <Text size="xs" className="text-center">
        Remember your password?{" "}
        <Anchor
          component={Link}
          href={"/auth/login"}
          className=" cursor-pointer hover:underline"
        >
          Login
        </Anchor>
      </Text>
    </Box>
  );
};

const AuthForms = ({
  type,
  tittle,
  description,
}: {
  type: "login" | "register" | "forgot-password";
  tittle?: string;
  description?: string;
}) => {
  const renderForm = () => {
    switch (type) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      case "forgot-password":
        return <ForgotPasswordForm />;
      default:
        return null;
    }
  };

  return (
    <Paper
      shadow="sm"
      className=" rounded-lg  p-6 pb-8  max-w-md mx-auto mt-10 bg-[var(--card)] flex-1"
    >
      <Title order={3} className="text-center block mb-1">
        {tittle}
      </Title>
      <Text className="text-center mb-4" fz={13} c="dimmed">
        {description}
      </Text>
      {renderForm()}
    </Paper>
  );
};

export default AuthForms;
