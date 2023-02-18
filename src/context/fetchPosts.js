import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
    const {data: posts=[], isLoading, refetch} = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/posts");
            const data = await res.json();
            if (data) {
                refetch();
            }
            return data;
        }
    })

    return [posts, isLoading, refetch];
}

