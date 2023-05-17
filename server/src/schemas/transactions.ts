import joi from "@hapi/joi";

export const schemaDeposit = joi.object({
  value: joi.number().positive().greater(0).required().messages({
    "any.required": "Por favor, informe o valor do deposito!",
    "number.base": "Por favor digite um valor válido!",
    "number.greater": "Por favor digite um valor válido!",
  }),
});

export const schemaToWithdraw = joi.object({
  value: joi.number().positive().greater(0).required().messages({
    "any.required": "Por favor, informe o valor do deposito!",
    "number.base": "Por favor digite um valor válido!",
    "number.greater": "Por favor digite um valor válido!",
  }),

  password: joi.string().required().messages({
    "any.required": "A senha é obrigatória!",
    "string.empty": "A senha é obrigatória!",
  }),
});

export const schemaTransfer = joi.object({
  destination_account_number: joi.number().required().messages({
    "any.required": "Por favor, informe o número da conta de destino!",
    "number.base": "Por favor digite um número válido!",
  }),
  value: joi.number().positive().greater(0).required().messages({
    "any.required": "Por favor, informe o valor a ser transferido!",
    "number.base": "Por favor digite um valor válido!",
    "number.greater": "Por favor digite um valor válido!",
  }),
  password: joi.string().required().messages({
    "any.required": "A senha é obrigatória!",
    "string.empty": "A senha é obrigatória!",
  }),
});
