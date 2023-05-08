import { refs } from "../renderer";

  export const formJson = {
    type: "Form",
    props: {
      name: 'contact',
      onFinish: () => console.log('Form submitted'),
      layout: 'vertical',
    },
    refKey: "formRef",
    children: [
      {
        type: 'div',
        props: { className: 'form-header' },
        children: 'Contact Form',
      },
      {
        type: 'div',
        props: { className: 'form-body' },
        children: [
          {
            type: "Form.Item",
            props: {
              label: 'Name',
              name: 'name',
              rules: [
                {
                  required: true,
                  message: 'Please enter your name',
                },
              ],
            },
            children: [
              {
                type: "Input",
                props: {
                  placeholder: 'Enter your name',
                },
              },
            ],
          },
          {
            type: "Form.Item",
            props: {
              label: 'Email',
              name: 'email',
              rules: [
                {
                  required: true,
                  message: 'Please enter your email',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email',
                },
              ],
            },
            children: [
              {
                type: "Input",
                props: {
                  placeholder: 'Enter your email',
                },
              },
            ],
          },
          {
            type: "Form.Item",
            props: {
              label: 'Password',
              name: 'password',
              rules: [
                {
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message: 'Please enter a valid password',
                },
                {
                  validator: (rule, value, callback) => {
                    if(refs['formRef']?.current) {
                      const confirmPassword = refs['formRef']?.current.getFieldValue('confirmPassword');
                      if (confirmPassword && value !== confirmPassword) {
                        callback('Passwords do not match');
                      } else {
                        callback();
                      }
                    }
                 
                  },
                  message: 'Passwords do not match',
                },
              ],
            },
            children: [
              {
                type: "Input.Password",
                props: {
                  placeholder: 'Enter your password',
                },
              },
            ],
          },
          {
            type: "Form.Item",
            props: {
              label: 'Confirm Password',
              name: 'confirmpassword',
              required: true,
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if(refs['formRef']?.current) {
                      const password = refs['formRef']?.current.getFieldValue('password');
                      if (password && value !== password) {
                        callback('Passwords do not match');
                      } else {
                        callback();
                      }
                    }
                   
                  },
                  message: 'Passwords do not match',
                },
              ],
            },
            children: [
              {
                type: "Input.Password",
                props: {
                  placeholder: 'Enter your confirm password',
                },
              },
            ],
          },
          {
            type: "Form.Item",
            props: {
              label: 'Message',
              name: 'message',
              rules: [
                {
                  required: true,
                  message: 'Please enter your message',
                },
              ],
            },
            children: [
              {
                type: "Input.TextArea",
                props: {
                  rows: 4,
                  placeholder: 'Enter your message',
                },
              },
            ],
          },
          {
            type: "Form.Item",
            children: [
              {
                type: "Button",
                props: {
                  type: 'primary',
                  htmlType: 'submit',
                },
                children: 'Submit',
              },
            ],
          },
        ],
      },
    ],
  };