import { cartApi } from "@repo/packages/services/api/cart.api";
import { useAuthStore } from "../auth/use-auth.store";
import { useNotify } from "@repo/component/ui/notification/Notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import REPO_CONSTANT from "@repo/packages/ultis/contants";

const useCartStore = () => {
    const { user } = useAuthStore();
    const notify = useNotify();
    const queryClient = useQueryClient();
    const cartQuery = cartApi.queries.readQuery(user?.userId!);

    const editMutation = useMutation({
        mutationFn: cartApi.apis.edit,
        onSuccess: () => {
            notify?.success({ message: "Cập nhật thành công!" });
            queryClient.invalidateQueries({ queryKey: [REPO_CONSTANT.QUERY_KEYS.cart.base] });
        },
        onError: () => {
            notify?.error({ message: "Cập nhật thất bại!" });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: cartApi.apis._delete,
        onSuccess: () => {
            notify?.success({ message: "Xóa sản phẩm thành công!" });
            queryClient.invalidateQueries({ queryKey: [REPO_CONSTANT.QUERY_KEYS.cart.base] });
        },
        onError: () => {
            notify?.error({ message: "Xóa sản phẩm thất bại!" });
        }
    });

    return {
        cartItems: cartQuery.data ?? [],
        isLoading: cartQuery.isLoading,
        editCartItem: editMutation.mutate,
        deleteCartItem: deleteMutation.mutate,
    };
}

export default useCartStore;