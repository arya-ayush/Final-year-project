import {Notification} from "./notification";

export interface Visitor {
  name: string;
  phone: string;
  address: string;
  purpose: string;
  image: string;
  society_name : string;
  block : string;
  flat_num : number;
  notify: Notification[];
}
