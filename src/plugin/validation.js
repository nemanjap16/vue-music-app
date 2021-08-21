import {
  Field as VeeField, Form as VeeForm, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import {
  required, min, max, email, alpha_spaces as alphaSpaces, min_value as minValue,
  max_value as maxValue, confirmed,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('passwords_mismatch', confirmed);

    configure({
      validateOnInput: true,
      bails: false,
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphanumeric characters.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is to low.`,
          max_value: `The field ${ctx.field} is to high.`,
          passwords_mismatch: `The passwords don't match.`,
          tos: `You must accept Terms of Service`,
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return message;
      },
    });
  },
};
