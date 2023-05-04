import joi from "@hapi/joi";

export const schemaUserRegister = joi.object({
  name: joi.string().min(5).max(30).required().messages({
    "any.required": "Preencha o campo nome",
    "string.empty": "Preencha o campo nome",
    "string.min": "O campo nome precisa ter no mínimo 5 caracteres!",
    "string.max": "O campo nome precisa ter no máximo 30 caracteres!",
  }),
  username: joi.string().min(7).max(15).required().messages({
    "any.required": "Preencha o campo username",
    "string.empty": "Preencha o campo username",
    "string.min": "O campo username precisa ter no mínimo 6 caracteres!",
    "string.max": "O campo username precisa ter no máximo 15 caracteres!",
  }),
  cpf: joi
    .string()
    .pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
    .required()
    .messages({
      "any.required": "Preencha o campo cpf",
      "string.empty": "Preencha o campo cpf",
      "string.pattern.base": "CPF inválido",
    }),
  date_of_birth: joi
    .string()
    .pattern(/^(0?[1-9]|[1-2][0-9]|3[0-1])-(0?[1-9]|1[0-2])-\d{4}$/)
    .required()
    .messages({
      "any.required": "Preencha o campo data de nascimento",
      "string.empty": "Preencha o campo data de nascimento",
      "string.pattern.base": "Data de nascimento inválida",
    }),
  phone: joi
    .string()
    .pattern(/^\(\d{2}\) 9?\d{4}-\d{4}$/)
    .required()
    .messages({
      "any.required": "Preencha o campo telefone",
      "string.empty": "Preencha o campo telefone",
      "string.pattern.base": "Número de telefone inválido",
    }),
  password: joi.string().min(7).max(15).required().messages({
    "any.required": "Preencha o campo senha",
    "string.empty": "Preencha o campo senha",
    "string.min": "O campo senha precisa ter no mínimo 7 caracteres!",
    "string.max": "O campo senha precisa ter no máximo 15 caracteres!",
  }),
});

export const schemaUserLogin = joi.object({
  username: joi.string().required().messages({
    "any.required": "Por favor preencha o campo email!",
    "string.empty": "Por favor preencha o campo email!",
  }),
  password: joi.string().required().messages({
    "any.required": "Por favor preencha o campo senha!",
    "string.empty": "Por favor preencha o campo senha!",
  }),
});
