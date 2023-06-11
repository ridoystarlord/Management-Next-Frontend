import axios from 'axios';

import { MemberForm } from 'components/CreateMemberModal';
import { API_URL } from 'environment';

export interface MemberListResponse {
  success: boolean;
  message: string;
  result: User[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type GetInput = {
  page?: string;
  size?: string;
  token?: string;
};

export const getAllMemberList = ({ page, size, token }: GetInput) => {
  const finalPage = page ? page : '1';
  const finalSize = size ? size : '10';

  const params = new URLSearchParams({
    page: finalPage,
    size: finalSize,
  }).toString();
  return {
    api() {
      return axios
        .get<MemberListResponse>(`${API_URL}/user/list?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      const page = finalPage ? finalPage : '0';
      const size = finalSize ? finalSize : '10';
      return ['getAllMemberList', page, size];
    },
  };
};

export const AddNewMember = ({ token }: { token: string }) => {
  return {
    api(input: MemberForm) {
      return axios
        .post(`${API_URL}/user/add-member`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ['AddNewMember'];
    },
  };
};
