"use client";
import {
  Flex,
  Text,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  RadioGroup,
  Radio,
  VStack,
  Select,
  HStack,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Code,
  Wrap,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

type TPendaftaran = {
  namaLengkap: string;
  nim: number;
  tanggalLahir: string;
  jenisKelamin: string;
  programStudi: string;
  email: string;
};

const FormulirPendaftaran = () => {
  // hooks
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TPendaftaran>({ mode: "onSubmit" });

  const toast = useToast({ isClosable: true, duration: 2 });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState<TPendaftaran | null>(null);

  // validation
  const validateAge = (value: string) => {
    const userAge = new Date(value).getFullYear();
    const now = new Date().getFullYear();

    if (now - userAge < 21) {
      return "Minimal 21 tahun";
    }

    return true;
  };

  const validateEmail = (value: string) => {
    if (!value.endsWith("@student.umn.ac.id")) {
      return "Harap gunakan email student";
    }

    return true;
  };

  // enums
  const programStudi = [
    "Akuntansi",
    "Arsitektur",
    "Desain Komunikasi Visual",
    "Film",
    "Informatika",
    "Jurnalistik",
    "Manajemen",
    "Perhotelan",
    "Sistem Informasi",
    "Strategic Communication",
    "Teknik Elektro",
    "Teknik Fisika",
    "Teknik Komputer",
  ];

  return (
    <>
      <Flex
        minH="100vh"
        alignItems="center"
        justify="center"
        fontFamily="monospace"
      >
        <form
          onSubmit={handleSubmit((data) => {
            setData(data);
            onOpen();
          })}
        >
          <Box my={4}>
            <FormControl isInvalid={!!errors.namaLengkap} my={4}>
              <FormLabel htmlFor="nama lengkap">Nama Lengkap</FormLabel>
              <Input
                id="namaLengkap"
                {...register("namaLengkap", {
                  required: "Nama Lengkap harus diisi",
                })}
              />
              <FormErrorMessage>
                {errors.namaLengkap && errors.namaLengkap.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.nim} my={4}>
              <FormLabel htmlFor="nama lengkap">NIM (tanpa 000000)</FormLabel>
              <HStack>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgColor="gray.300"
                  h="10"
                  w="24"
                  roundedLeft="md"
                  mr={-2}
                >
                  <Text fontSize={16}>000000</Text>
                </Box>
                <Input
                  id="nim"
                  type="number"
                  {...register("nim", {
                    required: "NIM harus diisi",
                    minLength: {
                      value: 5,
                      message: "NIM harus berupa 5",
                    },
                    maxLength: {
                      value: 5,
                      message: "NIM harus berupa 5",
                    },
                  })}
                  rounded="none"
                  roundedRight={"md"}
                />
              </HStack>
              <FormErrorMessage>
                {errors.nim && errors.nim.message}
              </FormErrorMessage>
            </FormControl>

            <HStack justify={"start"} align={"start"}>
              <FormControl isInvalid={!!errors.jenisKelamin}>
                <FormLabel htmlFor="jenis kelamin">Jenis Kelamin</FormLabel>
                <Controller
                  name="jenisKelamin"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Jenis kelamin harus dipilih",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup onChange={onChange} value={value}>
                      <VStack align={"start"}>
                        <Radio value="laki-laki">laki-laki</Radio>
                        <Radio value="perempuan">perempuan</Radio>
                      </VStack>
                    </RadioGroup>
                  )}
                />
                <FormErrorMessage>
                  {errors.jenisKelamin && errors.jenisKelamin.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.tanggalLahir} my={4}>
                <FormLabel htmlFor="tanggal lahir">Tanggal Lahir</FormLabel>
                <Input
                  type="date"
                  id="tanggalLahir"
                  {...register("tanggalLahir", {
                    required: "Tanggal lahir harus diisi",
                    validate: validateAge,
                  })}
                />
                <FormErrorMessage>
                  {errors.tanggalLahir && errors.tanggalLahir.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl isInvalid={!!errors.programStudi} my={4}>
              <FormLabel htmlFor="program studi">Program Studi</FormLabel>

              <Controller
                name="programStudi"
                control={control}
                defaultValue=""
                rules={{
                  required: "Program studi harus dipilih",
                }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Pilih Program Studi"
                    onChange={onChange}
                    value={value}
                  >
                    {programStudi.map((prodi) => (
                      <option value={prodi} key={prodi}>
                        {prodi}
                      </option>
                    ))}
                  </Select>
                )}
              />
              <FormErrorMessage>
                {errors.programStudi && errors.programStudi.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email} my={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email harus diisi",
                  validate: validateEmail,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email tidak valid",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Button type="submit">Submit</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontWeight={"bold"}>Pendaftaran Sukses</ModalHeader>
              <ModalBody>
                <Heading size={"sm"}>Nama Lengkap</Heading>
                <Text>{data?.namaLengkap}</Text>
                <Heading size={"sm"}>NIM</Heading>
                <Text>{data?.nim}</Text>
                <Heading size={"sm"}>Jenis Kelamin</Heading>
                <Text>{data?.jenisKelamin}</Text>
                <Heading size={"sm"}>Tanggal Lahir</Heading>
                <Text>{data?.tanggalLahir}</Text>
                <Heading size={"sm"}>Program Studi</Heading>
                <Text>{data?.programStudi}</Text>
                <Heading size={"sm"}>Email</Heading>
                <Text>{data?.email}</Text>
                <Heading size={"sm"}>Raw</Heading>
                <Wrap>
                  <Code>{JSON.stringify(data)}</Code>
                </Wrap>
              </ModalBody>

              <ModalFooter>
                <Button color="black" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </form>
      </Flex>
    </>
  );
};

export default FormulirPendaftaran;
