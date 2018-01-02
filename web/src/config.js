import Vue from 'vue';
import {
  Dialog,
  Button,
  Form,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Collapse,
  CollapseItem,
  Pagination,
  Badge,
  Table,
  TableColumn,
  Row,
  Col,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Input,
  Select,
  Option,
  FormItem,
  Switch,
  Cascader,
  RadioGroup,
  RadioButton,
  DatePicker,
  Message,
  Tag,
  Rate,
  Notification,
  MessageBox,
  Tooltip
} from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

export default () => {
  Vue.use(Dialog);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Pagination);
  Vue.use(Badge);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Menu);
  Vue.use(MenuItem);
  Vue.use(Submenu);
  Vue.use(MenuItemGroup);
  Vue.use(Input);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(FormItem);
  Vue.use(Switch);
  Vue.use(Cascader);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(DatePicker);
  Vue.use(Tag);
  Vue.use(Rate);
  Vue.use(Tooltip);

  Vue.prototype.$message = Message;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$alert = MessageBox.alert;
};
