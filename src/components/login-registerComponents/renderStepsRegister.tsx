import {
    Field,
    Input,
    Stack,
  } from "@chakra-ui/react";





export const renderRegisterStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                name="email"
                value={userData.email}
                placeholder="Enter your email"
                onChange={handleInputChange}
              />
              <Field.HelperText>
                Comprobaremos si este email ya está registrado
              </Field.HelperText>
            </Field.Root>
          </Stack>
        );
      case 2:
        return (
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                name="password"
                value={userData.password}
                placeholder="Crear contraseña"
                onChange={handleInputChange}
              />
              <Field.HelperText>
                La contraseña debe tener al menos 6 caracteres
              </Field.HelperText>
            </Field.Root>
          </Stack>
        );
      case 3:
        return (
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Nombre</Field.Label>
              <Input
                type="text"
                name="name"
                value={userData.name}
                placeholder="Introduce tu nombre"
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Apellido</Field.Label>
              <Input
                type="text"
                name="lastName"
                value={userData.lastName}
                placeholder="Introduce tu apellido"
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Date of Birth</Field.Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={userData.dateOfBirth || ""}
                onChange={handleInputChange}
              />
            </Field.Root>
          </Stack>
        );
      case 4:
        return (
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Nombre del establecimiento</Field.Label>
              <Input
                type="text"
                name="storeName"
                value={userData.storeName}
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Número de telefono</Field.Label>
              <Input
                type="tel"
                name="storePhone"
                value={userData.storePhone || ""}
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Dirección de la tienda</Field.Label>
              <Input
                type="text"
                name="storeAddress"
                value={userData.storeAddress}
                onChange={handleInputChange}
              />
            </Field.Root>
          </Stack>
        );
      default:
        return null;
    }
  };
