import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch("https://backend-silk-kappa.vercel.app/posts");
            const data = await res.json();
            if (data) {
                refetch();
            }
            return data;
        }
    })

    return [posts, isLoading, refetch];
}

