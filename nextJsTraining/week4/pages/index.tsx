"use client";
import {
  Flex,
  HStack,
  PinInput,
  PinInputField,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

type TLoginPin = {
  pin: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    control,
    reset,
    formState: { errors },
  } = useForm<TLoginPin>({ mode: "onChange" });

  const toast = useToast({ isClosable: true, duration: 2000 });

  const [typewriter, setTypewriter] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const text = "masukkan kode rahasia kamu";
  useEffect(() => {
    const interval = setInterval(() => {
      if (typewriterIndex >= text.length) {
        clearInterval(interval);
        return;
      }

      setTypewriter((prev) => prev + text[typewriterIndex]);
      setTypewriterIndex((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [typewriterIndex, text]);

  return (
    <>
      <Flex
        minH="100vh"
        alignItems="center"
        justify="center"
        fontFamily="monospace"
      >
        <VStack align="start" p={2}>
          <Text fontSize="2xl" fontWeight="bold">
            Hi Agents!
          </Text>
          <Text fontSize="md">
            {typewriter}
            <motion.span
              animate={{ opacity: [0, 1] }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              |
            </motion.span>
          </Text>
          <HStack>
            <Controller
              name="pin"
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 5,
                  message: "PIN length should be 5 digits",
                },
                maxLength: {
                  value: 5,
                  message: "PIN length should be 5 digits",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <PinInput
                  mask
                  value={value}
                  onChange={onChange}
                  variant="flushed"
                  onComplete={(v) => {
                    if (!!errors.pin && v === "35710") {
                      toast({
                        title: "Success",
                        colorScheme: "green",
                        description: "Login success",
                      });

                      router.push("/formulir-pendaftaran");

                      return;
                    }
                    toast({
                      title: "Oops",
                      description: "Tampaknya pin mu salah",
                      colorScheme: "red",
                    });
                  }}
                >
                  <PinInputField rounded="none" />
                  <PinInputField rounded="none" />
                  <PinInputField rounded="none" />
                  <PinInputField rounded="none" />
                  <PinInputField rounded="none" />
                </PinInput>
              )}
            />
          </HStack>
          {errors.pin && (
            <Text color="red" fontSize="sm">
              {errors.pin.message}
            </Text>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default LoginPage;
