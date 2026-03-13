import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Comment, Story, VolunteerApplication } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllStories() {
  const { actor, isFetching } = useActor();
  return useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllStories();
      return [...result].sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCommentsByStory(storyId: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Comment[]>({
    queryKey: ["comments", storyId?.toString()],
    queryFn: async () => {
      if (!actor || storyId === undefined) return [];
      const result = await actor.getCommentsByStory(storyId);
      return [...result].sort((a, b) => Number(a.timestamp - b.timestamp));
    },
    enabled: !!actor && !isFetching && storyId !== undefined,
  });
}

export function usePostStory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      authorName: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.postStory(data.title, data.content, data.authorName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
}

export function usePostComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      storyId: bigint;
      content: string;
      authorName: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.postComment(data.storyId, data.content, data.authorName);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.storyId.toString()],
      });
    },
  });
}

export function useDeleteStory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (storyId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteStory(storyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });
}

export function useDeleteComment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { commentId: bigint; storyId: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteComment(data.commentId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.storyId.toString()],
      });
    },
  });
}

export function useSubmitVolunteerApplication() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      areaOfExpertise: string;
      motivation: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitVolunteerApplication(
        data.name,
        data.email,
        data.phone,
        data.areaOfExpertise,
        data.motivation,
      );
    },
  });
}

export function useGetAllVolunteerApplications() {
  const { actor, isFetching } = useActor();
  return useQuery<VolunteerApplication[]>({
    queryKey: ["volunteer-applications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVolunteerApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["is-admin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
