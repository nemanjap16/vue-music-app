<template>
  <div>
    <!-- Registration Form -->
      <div class="text-white text-center p-5 mb-4"
          v-if="reg_show_alert" :class="reg_alert_variant">
            {{ reg_alert_msg }}
          </div>
          <vee-form :validation-schema="schema"
           @submit="register" :initial-values="userData">
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <vee-field name="name" type="text" autocomplete="off"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name" />
                <ErrorMessage class="text-red-600" name="name" />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field name="email" type="email" autocomplete="off"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
                <ErrorMessage class="text-red-600" name="email" />
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <vee-field type="number" name="age" autocomplete="off"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded" />
                  <ErrorMessage class="text-red-600" name="age" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field  name="password" :bails="false" v-slot="{ field, errors }">
                  <input type="password" v-bind="field" autocomplete="off" placeholder="Password"
                    class="block w-full py-1.5 px-3
                    text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded" />
                    <div class="text-red-600" name="password" v-for="error in errors" :key="error">
                      <p>{{ error }}</p>
                    </div>
              </vee-field>
                <!-- <ErrorMessage class="text-red-600" name="password"> -->
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <vee-field type="password" name="confirm_password" autocomplete="off"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password" />
                <ErrorMessage class="text-red-600" name="confirm_password" />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <vee-field as="select" name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
              </vee-field>
              <ErrorMessage class="text-red-600" name="country" />
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <vee-field type="checkbox" name="tos" value="1"
              class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
              <label class="inline-block">Accept terms of service</label>
              <div><ErrorMessage class="text-red-600" name="tos" /></div>
            </div>
            <button type="submit" :disabled="reg_in_submission"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
        </vee-form>
  </div>
</template>

<script>

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:2|max:36|alpha_spaces',
        email: 'required|min:3|max:50|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:6|max:50',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    async register(data) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';

      try {
        await this.$store.dispatch('registerUser', data);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        // this.reg_alert_msg = 'An unexpected error occured. Please try again.';
        this.reg_alert_msg = `${error.message}`;
        console.log(error);
        return;
      }

      // when submission was successful
      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Your account has been successfully created.';

      window.location.reload();
    },
  },
};
</script>
