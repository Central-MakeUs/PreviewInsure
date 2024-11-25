import {
  UserInfoResponse,
  InsueItem,
  PostFavoritRequest,
  PostFavoritResponse,
  FavoritItem,
  DeleteFavoritRequest,
  PatchInsueRequest,
} from './account.d';
import { accountKeys } from './account.keys';

// 회원 탈퇴
import { useStore } from '@stores/useStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@utils/axios';

export async function deleteAccount() {
  const { accessToken } = useStore.getState();
  const response = await axiosInstance.delete('/account', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('회원 탈퇴');
  return response.data;
}

// 회원 정보 GET
async function getAccountInfo() {
  const { accessToken } = useStore.getState();
  const response = await axiosInstance.get<APIResponse<UserInfoResponse>>('/account', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

export const useAccountInfoQuery = () => {
  // const queryClient = useQueryClient();
  const query = useQuery<UserInfoResponse>({
    queryKey: ['account', 'info'],
    queryFn: () => getAccountInfo(),
    // staleTime: 10 * 1000, // 10초
    // gcTime: 30 * 1000, // 30초
    // enabled: false,
    //   initialData: () => {
    //     const cachedHealth = queryClient.getQueryData<HealthTestResponse>(['health']);

    //     return cachedHealth;
    //   },
  });

  return { accountQuery: query };
};

// =================================================
// 내가 가입한 보험 정보 GET
async function getInsueList() {
  const { accessToken } = useStore.getState();
  const response = await axiosInstance.get<APIResponse<InsueItem[]>>('/account/insurances', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

export const useInsueListQuery = () => {
  // const queryClient = useQueryClient();
  const query = useQuery<InsueItem[]>({
    queryKey: accountKeys.insurance(),
    queryFn: () => getInsueList(),
    staleTime: 30 * 1000, // 30초
    gcTime: 3 * 60 * 1000, // 3분
    // enabled: false,
    //   initialData: () => {
    //     const cachedHealth = queryClient.getQueryData<HealthTestResponse>(['health']);

    //     return cachedHealth;
    //   },
  });

  return { insurancesQuery: query };
};

// 가입한 보험 수정 PATCH
async function patchInsueCompany(data: PatchInsueRequest): Promise<PostFavoritResponse> {
  const { accessToken } = useStore.getState();
  const response = await axiosInstance.patch<PostFavoritResponse>('/account/insurance', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export function useInsueComponayPatchMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PatchInsueRequest) => patchInsueCompany(data),
    onSuccess: (newData, data) => {
      //새로 Get요청
      queryClient.invalidateQueries({ queryKey: accountKeys.insurance() });
    },
    onError: (e: any) => {
      console.log(e);
    },
  });

  return { insueCompanyPatchMutation: mutation };
}

// =====================================================
// 관심보험 GET
async function getFavoritList() {
  const { accessToken } = useStore.getState();
  const response = await axiosInstance.get<APIResponse<FavoritItem[]>>('/account/favorite', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

export const useFavoritQuery = () => {
  const queryClient = useQueryClient();
  const query = useQuery<FavoritItem[]>({
    queryKey: accountKeys.favorit(),
    queryFn: () => getFavoritList(),
    staleTime: 2 * 60 * 1000, // 2분
    gcTime: 5 * 60 * 1000, // 5분
    // initialData: () => {
    //   const cachedHealth = queryClient.getQueryData<FavoritItem[]>(accountKeys.favorit());
    //   return cachedHealth;
    // },
  });

  return { favoritQuery: query };
};

// 관심보험 등록 POST
// 인슈 맵에서 사용
async function postFavoritInsue(data: PostFavoritRequest): Promise<PostFavoritResponse> {
  const { accessToken } = useStore.getState();
  const response = await axiosInstance.post<PostFavoritResponse>('/account/favorite', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export function useFavoritMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutation에는 querykey를 작성하지 않는다.
    mutationFn: (data: PostFavoritRequest) => postFavoritInsue(data),
    onSuccess: (newData, data) => {
      // ['health', 'detail']인 캐시 업데이트
      // queryClient.setQueryData(healthKeys.detail(), newData);
      // 연관된 GET요청을 update
      // GET요청을 다시 보내면 POST요청 후에 GET요청이 무조건 발생. 따라서 불필요한 GET 대신 메모리상의 쿼리에 데이터를 업데이트.
      // queryClient.setQueryData(healthKeys.all, () => {
      //   isHealthCheck: false;
      // });
      const item: FavoritItem = {
        favoriteInsuranceId: 0,
        insuranceType: data.insuranceType,
      };
      queryClient.setQueryData(accountKeys.favorit(), (oldData: any) => {
        return [...oldData, item];
      });

      //새로 Get요청
      queryClient.invalidateQueries({ queryKey: accountKeys.favorit() });
    },
    onError: () => {},
  });

  return { favoritMutation: mutation };
}

// 관심보험 삭제
// 인슈 맵에서 사용
async function deleteFavoritInsue(data: DeleteFavoritRequest): Promise<PostFavoritResponse> {
  const { accessToken } = useStore.getState();
  const response = await axiosInstance.delete('/account/favorite', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: data,
  });
  return response.data;
}

export function useDeleteFavoritMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutation에는 querykey를 작성하지 않는다.
    mutationFn: (data: DeleteFavoritRequest) => deleteFavoritInsue(data),
    onSuccess: (newData, data) => {
      const id = data.favoriteInsuranceId;
      queryClient.setQueryData(accountKeys.favorit(), (oldData: FavoritItem[] | undefined) => {
        if (!oldData) return [];

        return oldData.filter((item) => item.favoriteInsuranceId !== id);
      });
    },
    onError: () => {},
  });

  return { deletefavoritMutation: mutation };
}
