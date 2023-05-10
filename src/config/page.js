import { refs } from "../engine/renderer";
import eventEmitter from "../eventEmitter";

export const pageInitialState = {
  formData: {},
  tableData: {
    dataSource: [],
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Message",
        dataIndex: "message",
        key: "message",
      },
    ],
  },
};

export const pageStateReducers = {
  ADD_FORM_DATA: {
    action: "ADD_FORM_DATA",
    modifier: (state, action) => {
      console.log("modifier triggerd properly");
      return {
        ...state,
        formData: action.payload,
      };
    },
  },
  ADD_TABLE_DATA: {
    action: "ADD_TABLE_DATA",
    modifier: (state, action) => {
      return {
        ...state,
        tableData: {
          dataSource: [...state.tableData.dataSource, action.payload],
          columns: [
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Message",
              dataIndex: "message",
              key: "message",
            },
          ],
        },
      };
    },
  },
};

export const pageJson = {
  type: "div",
  props: {},
  children: [
    {
      type: "Form",
      props: {
        name: "contact",
        layout: "vertical",
      },
      refKey: "formRef",
      stateKey: "formData",
      children: [
        {
          type: "div",
          props: { className: "form-header" },
          children: "Contact Form",
        },
        {
          type: "div",
          props: { className: "form-body" },
          children: [
            {
              type: "Form.Item",
              props: {
                label: "Name",
                name: "name",
                rules: [
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ],
              },
              children: [
                {
                  type: "Input",
                  props: {
                    placeholder: "Enter your name",
                  },
                },
              ],
            },
            {
              type: "Form.Item",
              props: {
                label: "Email",
                name: "email",
                rules: [
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ],
              },
              children: [
                {
                  type: "Input",
                  props: {
                    placeholder: "Enter your email",
                  },
                },
              ],
            },
            {
              type: "Form.Item",
              props: {
                label: "Password",
                name: "password",
                required: true,
                rules: [
                  {
                    pattern:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message: "Please enter a valid password",
                  },
                  {
                    validator: (rule, value, callback) => {
                      if (refs["formRef"]?.current) {
                        const confirmPassword =
                          refs["formRef"]?.current.getFieldValue(
                            "confirmPassword"
                          );
                        if (confirmPassword && value !== confirmPassword) {
                          callback("Passwords do not match");
                        } else {
                          callback();
                        }
                      }
                    },
                    message: "Passwords do not match",
                  },
                ],
              },
              children: [
                {
                  type: "Input.Password",
                  props: {
                    placeholder: "Enter your password",
                  },
                },
              ],
            },
            {
              type: "Form.Item",
              props: {
                label: "Confirm Password",
                name: "confirmpassword",
                required: true,
                rules: [
                  {
                    validator: (rule, value, callback) => {
                      if (refs["formRef"]?.current) {
                        const password =
                          refs["formRef"]?.current.getFieldValue("password");
                        if (password && value !== password) {
                          callback("Passwords do not match");
                        } else {
                          callback();
                        }
                      }
                    },
                    message: "Passwords do not match",
                  },
                ],
              },
              children: [
                {
                  type: "Input.Password",
                  props: {
                    placeholder: "Enter your confirm password",
                  },
                },
              ],
            },
            {
              type: "Form.Item",
              props: {
                label: "Message",
                name: "message",
                rules: [
                  {
                    required: true,
                    message: "Please enter your message",
                  },
                ],
              },
              children: [
                {
                  type: "Input.TextArea",
                  props: {
                    rows: 4,
                    placeholder: "Enter your message",
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
                    type: "primary",
                    htmlType: "submit",
                    onClick: () => {
                      console.log(refs["formRef"]);
                      if (refs["formRef"]?.current) {
                        console.log(refs["formRef"].current.getFieldsValue());
                        eventEmitter.emit("STATE_CHANGE", {
                          action: "ADD_TABLE_DATA",
                          payload: refs["formRef"].current.getFieldsValue(),
                        });
                      }
                    },
                  },
                  children: "Submit",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "Table",
      refKey: "tableRef",
      stateKey: "tableData",
      props: {
        dataSource: [],
        columns: [
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Message",
            dataIndex: "message",
            key: "message",
          },
        ],
      },
    },
  ],
};
