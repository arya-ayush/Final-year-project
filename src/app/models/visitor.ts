import {Notification} from "./notification";

export interface Visitor {
  name: string;
  phone: string;
  address: string;
  purpose: string;
  image: string;
  society: Society;
  notify: Notification[];
}

export interface Society {
  society_name : string;
  block : string;
  flat_num : number;
}
